/**
 * Created by rakhmatullahyoga on 09/07/17.
 */

'use strict';

module.exports = function (TOOLS, APP) {
    console.time('Loading express routers');
    let async 		= TOOLS.MODULES.ASYNC;
    let interfaces  = TOOLS.INTERFACES.EXPRESS;
    let fs 			= TOOLS.MODULES.FS;
    let http        = TOOLS.MODULES.HTTP;
    let path        = TOOLS.MODULES.PATH;
    let log 	    = TOOLS.LOG;
    let _ 			= TOOLS.MODULES.UNDERSCORE;

    // Initialize endpoints generator
    let endpointLoader = {
        recursiveGenerator: function generate(basePath, subPath) {
            let currentPath = basePath + (subPath ? '/' + subPath : '');

            fs.readdirSync(currentPath).forEach(function (file) {
                if(fs.statSync(currentPath + '/' + file).isDirectory()) {
                    generate(basePath, (subPath ? subPath + '/' : '') + file);
                } else {
                    if((file.indexOf('.') !== 0) && (file.slice(-3) === '.js')) {
                        let apiConfig = require(currentPath + '/' + file);
                        endpointLoader.generateEndpoint(apiConfig, (subPath ? subPath + '/' : '') + file.replace('.js', ''));
                    } else {
                        log.warn(`file '${currentPath +'/'+ file}' is not supported for express router`);
                    }
                }
            })
        },

        generateEndpoint: function (routes, routeParent) {
            let self = this;
            routes.forEach(function (routeConfig) {
                let urlPath, lastEndpoint;
                let httpMethod = routeConfig.method.toLowerCase();

                routeParent 	= routeParent.toLowerCase();
                lastEndpoint  	= routeConfig.endpoint;
                if (routeParent === 'index') {
                    urlPath = lastEndpoint;
                } else {
                    urlPath = '/' + routeParent + lastEndpoint;
                }
                self.endpointHandler(httpMethod, urlPath, routeConfig);
            });
        },

        endpointHandler: function (httpMethod, urlPath, routeConfig) {
            let self = this;
            if (routeConfig && routeConfig.controllers && routeConfig.controllers.length > 0) {
                APP[httpMethod](urlPath, function(req, res) {
                    let controllerMethods = [];
                    routeConfig.controllers.forEach(function(controllerStr){
                        controllerMethods.push(function (previousData, cb){
                            if (!cb) {
                                cb = previousData;
                                previousData = {};
                            }
                            self.execController(controllerStr, previousData, req, res, cb);
                        });
                    });
                    async.waterfall(controllerMethods, function (err, data){
                        if (err) {
                            let code = err.code ? (_.isNumber(err.code) ? err.code : 500) : 500;
                            return res.status(code).json({ status: http.STATUS_CODES[code], data: _.omit(err, 'code') });
                        } else {
                            let code = data.code ? (_.isNumber(data.code) ? data.code : 200) : 200;
                            res.status(code).json({ status: http.STATUS_CODES[code], data: _.omit(data, 'code') });
                        }
                    });
                });
            } else {
                log.warn("Can't find any controller for url path: " + urlPath);
            }
        },

        execController: function (controllerStr, previousData, req, res, next) {
            let callController = this.getController(controllerStr);
            callController(previousData, req, res, function (err, data){
                if (err) { return next(err); }
                next(null, _.extend(previousData, data));
            });
        },

        getController: function (controllerStr) {
            try {
                let controllerFileName = controllerStr.split('.')[0];
                let controllerFuncName = controllerStr.split('.')[1];
                return interfaces[controllerFileName][controllerFuncName];
            } catch (e) {
                console.dir(e);
            }
        }
    };

    endpointLoader.recursiveGenerator(TOOLS.CONSTANTS.PATH.ROUTERS_PATH);
    console.timeEnd('Loading express routers');
};