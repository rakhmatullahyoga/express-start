/**
 * Created by rakhmatullahyoga on 09/07/17.
 */

'use strict';

module.exports = function (TOOLS, APP, CONSTANTS, MODULES) {
    console.time('Loading express routers');
    let async 		= MODULES.ASYNC;
    let interfaces  = TOOLS.INTERFACES.EXPRESS;
    let fs 			= MODULES.FS;
    let http        = MODULES.HTTP;
    let path        = MODULES.PATH;
    let log 	    = TOOLS.LOG;
    let _ 			= MODULES.UNDERSCORE;

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
                            let code = 500;
                            log.error(err);
                            return res.status(code).json({
                                code: code,
                                status: http.STATUS_CODES[code],
                                message: "Internal server error.",
                                data: {}
                            });
                        } else {
                            let code = data.code ? (_.isNumber(data.code) ? data.code : 200) : 200;
                            res.status(code).json({
                                code: code,
                                status: http.STATUS_CODES[code],
                                message: data.message ? data.message : "",
                                data: _.omit(data, ['code', 'message'])
                            });
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

    endpointLoader.recursiveGenerator(CONSTANTS.PATH.ROUTERS_PATH);
    console.timeEnd('Loading express routers');
};