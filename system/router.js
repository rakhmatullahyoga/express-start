/**
 * Created by rakhmatullahyoga on 09/07/17.
 */

'use strict';

module.exports = function (TOOLS, APP) {
    let async 		= TOOLS.MODULES.ASYNC;
    let controllers = TOOLS.CONTROLLERS;
    let fs 			= TOOLS.MODULES.FS;
    let http        = TOOLS.MODULES.HTTP;
    let log 	    = TOOLS.LOG;
    let _ 			= TOOLS.MODULES.UNDERSCORE;

    // Initialize routes generator
    let loader = {
        generateEndpoint: function (routes, routeParent) {
            let self = this;
            routes.forEach(function (routeConfig) {
                let urlPath, lastEndpoint;
                let method = routeConfig.method.toLowerCase();

                routeParent 	= routeParent.toLowerCase();
                lastEndpoint  	= routeConfig.endpoint;
                if (routeParent === 'index') {
                    urlPath = lastEndpoint;
                } else {
                    urlPath = '/' + routeParent + lastEndpoint;
                }
                self.endpointHandler(method, urlPath, routeConfig);
            });
        },

        endpointHandler: function (method, urlPath, routeConfig) {
            let self = this;
            if (routeConfig && routeConfig.controllers && routeConfig.controllers.length > 0) {
                APP[method](urlPath, function(req, res){
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
                return controllers[controllerFileName][controllerFuncName];
            } catch (e) {
                console.dir(e);
            }
        }
    };

    fs.readdirSync(TOOLS.CONSTANTS.PATH.ROUTERS_PATH).filter(function(file) {
        let tempPath = TOOLS.CONSTANTS.PATH.ROUTERS_PATH + '/' + file;
        return (file.indexOf('.') !== 0) && (!fs.statSync(tempPath).isDirectory()) && (file.slice(-3) === '.js');
    }).forEach(function(file) {
        let controllerPath = TOOLS.CONSTANTS.PATH.ROUTERS_PATH + '/' + file;
        let apiConfig = require(controllerPath);
        loader.generateEndpoint(apiConfig, file.replace('.js', ''));
    });
};