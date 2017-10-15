/**
 * Created by rakhmatullahyoga on 09/07/17.
 */

'use strict';

module.exports = function (TOOLS, APP, CONSTANTS, MODULES) {
    console.time('Loading express routers');
    let async = MODULES.ASYNC;
    let fs = MODULES.FS;
    let http = MODULES.HTTP;
    let interfaces = TOOLS.INTERFACES.EXPRESS;
    let log = TOOLS.LOG;
    let multer = TOOLS.MULTER;
    let _ = MODULES.UNDERSCORE;

    // Initialize endpoints generator
    let endpointLoader = {
        /**
         * Generate Express endpoints from files recursively through directories
         * @param basePath Path of endpoints
         * @param subPath Subdirectory of base path
         */
        recursiveGenerator: function generate (basePath, subPath) {
            let currentPath = basePath + (subPath ? '/' + subPath : '');
            fs.readdirSync(currentPath).forEach(function (file) {
                if (fs.statSync(currentPath + '/' + file).isDirectory()) {
                    // recursion invocation
                    generate(basePath, (subPath ? subPath + '/' : '') + file);
                } else {
                    // recursion base
                    if ((file.indexOf('.') !== 0) && (file.slice(-3) === '.js')) {
                        let apiConfig = require(currentPath + '/' + file);
                        endpointLoader.generateEndpoint(apiConfig, (subPath ? subPath + '/' : '') + file.replace('.js', ''));
                    } else { // invalid endpoint file type
                        log.warn(`file '${currentPath + '/' + file}' is not supported for express router`);
                    }
                }
            });
        },

        /**
         * Decompose a single endpoint from endpoint configs file
         * @param routes List of endpoint config
         * @param routeParent First url endpoint string
         */
        generateEndpoint: function (routes, routeParent) {
            let self = this;
            routes.forEach(function (routeConfig) {
                let urlPath, lastEndpoint;
                let httpMethod = routeConfig.method.toLowerCase();

                routeParent = routeParent.toLowerCase();
                lastEndpoint = routeConfig.endpoint;
                if (routeParent === 'index') {
                    urlPath = lastEndpoint;
                } else {
                    urlPath = '/' + routeParent + lastEndpoint;
                }
                self.endpointHandler(httpMethod, urlPath, routeConfig);
            });
        },

        /**
         * Define complete handlers for an endpoint
         * @param httpMethod Appropriate http method for a specific endpoint
         * @param urlPath Url full path for the endpoint
         * @param routeConfig Endpoint configuration
         */
        endpointHandler: function (httpMethod, urlPath, routeConfig) {
            let self = this;
            // check if there exist one or more controller/handler for an endpoint
            if (routeConfig && routeConfig.handlers && routeConfig.handlers.length > 0) {
                let fileHandler = routeConfig.fileField ? multer[routeConfig.fileObjArray](routeConfig.fileField) : multer.none();
                APP[httpMethod](urlPath, fileHandler, function (req, res) {
                    let controllerMethods = [];
                    // define multiple controller/handler for an endpoint
                    routeConfig.handlers.forEach(function (controllerStr) {
                        controllerMethods.push(function (previousData, callback) {
                            // handle first function for async.waterfall, where callback is the first argument
                            if (!callback) {
                                callback = previousData;
                                previousData = {};
                            }
                            self.execController(controllerStr, previousData, req, res, callback);
                        });
                    });
                    // treat controllers with waterfall flow
                    async.waterfall(controllerMethods, function (err, data) {
                        // return error response immediately whenever error arg on callback function exists
                        if (err) {
                            let code = err.code ? (_.isNumber(err.code) ? err.code : 500) : 500;
                            log.error(err);
                            return res.status(code).json({
                                code: code,
                                status: http.STATUS_CODES[code],
                                message: err.message ? err.message : 'Internal server error',
                                data: {}
                            });
                        } else {
                            let code = data && data.code ? (_.isNumber(data.code) ? data.code : 200) : 200;
                            res.status(code).json({
                                code: code,
                                status: http.STATUS_CODES[code],
                                message: data && data.message ? data.message : '',
                                data: _.omit(data, ['code', 'message'])
                            });
                        }
                    });
                });
            } else {
                log.warn('Can\'t find any controller for url path: ' + urlPath);
            }
        },

        /**
         * Generate a controller with callback for data transition among other controllers
         * @param controllerStr Controller name
         * @param previousData Data passed by the previous executed controller
         * @param req Request object (express)
         * @param res Response object (express)
         * @param next Callback function for transition to the next controller
         */
        execController: function (controllerStr, previousData, req, res, next) {
            let callController = this.getController(controllerStr);
            if(!callController) {
                throw new Error('Controller ' + controllerStr + ' not found');
            } else {
                callController(previousData, req, res, function (err, data, clear) {
                    if (err) {
                        next(err);
                    } else {
                        let newData = clear ? data : _.extend(previousData, data);
                        next(null, newData);
                    }
                });
            }
        },

        /**
         * Get controller/handler function from interface list
         * @param controllerStr Controller/handler name
         * @returns controller/handler function
         */
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
