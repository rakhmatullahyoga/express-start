/**
 * Created by rakhmatullahyoga on 10/07/17.
 */

'use strict';

module.exports = {
    // Application's directories
    PATH: {
        APPLICATION_MODULES:        __dirname+'/modules',
        APPLICATION_TOOLS:          __dirname+'/tools',
        CONTROLLERS_PATH:           __dirname+'/../application/controllers',
        CLASS_LOADER:               __dirname+'/../system/classloader',
        EXPRESS_INTERFACES_PATH:    __dirname+'/../protocols/express/interfaces',
        EXPRESS_SERVER:             __dirname+'/../system/express/server',
        LOG_DEFAULT_PATH:           __dirname+'/../logs/logs.log',
        LOG_EXCEPTIONS_PATH:        __dirname+'/../logs/exceptions.log',
        MODELS_LOADER:              __dirname+'/../database/sequelize/models/index',
        PUBLIC_FILE_PATH:           'public',
        REDIS_CLIENT:               __dirname+'/../database/redis/index',
        ROUTERS_LOADER:             __dirname+'/../system/express/router',
        ROUTERS_PATH:               __dirname+'/../protocols/express/routers',
        SCHEMA_LOADER:              __dirname+'/../database/mongoose/index',
        SERVICES_PATH:              __dirname+'/../application/services'
    },
    // Application's constant variables
    VARIABLE: {}
};