/**
 * Created by rakhmatullahyoga on 10/07/17.
 */

'use strict';

module.exports = {
    // Application's directories
    PATH: {
        APPLICATION_MODULES:        __dirname+'/modules',
        APPLICATION_TOOLS:          __dirname+'/../tools',
        APPLICATION_SERVER:         __dirname+'/../server',
        CONTROLLERS_LOADER:         __dirname+'/../../system/controller',
        CONTROLLERS_PATH:           __dirname+'/../controllers',
        LOG_DEFAULT_PATH:           __dirname+'/../../logs/logs.log',
        LOG_EXCEPTIONS_PATH:        __dirname+'/../../logs/exceptions.log',
        MODELS_LOADER:              __dirname+'/../../database/models/index',
        MODELS_PATH:                __dirname+'/../../database/models',
        ROUTERS_LOADER:             __dirname+'/../../system/router',
        ROUTERS_PATH:               __dirname+'/../routers',
        SERVICES_LOADER:            __dirname+'/../../system/service',
        SERVICES_PATH:              __dirname+'/../services'
    },
    // Application's constant variables
    VARIABLE: {}
};