/**
 * Created by rakhmatullahyoga on 10/07/17.
 */

'use strict';

let path = require('path');

module.exports = {
    // Application's directories
    PATH: {
        APPLICATION_MODULES: path.join(__dirname, '/modules'),
        APPLICATION_TOOLS: path.join(__dirname, '/tools'),
        CONTROLLERS_PATH: path.join(__dirname, '/../application/controllers'),
        CLASS_LOADER: path.join(__dirname, '/../system/classloader'),
        EXPRESS_INTERFACES_PATH: path.join(__dirname, '/../protocols/express/interfaces'),
        EXPRESS_SERVER: path.join(__dirname, '/../system/express/server'),
        LOG_DEFAULT_PATH: path.join(__dirname, '/../../../logs.log'),
        LOG_EXCEPTIONS_PATH: path.join(__dirname, '/../../../exceptions.log'),
        MODELS_LOADER: path.join(__dirname, '/../database/sequelize/models/index'),
        PUBLIC_FILE_PATH: path.join(__dirname, '/../../../public'),
        REDIS_CLIENT: path.join(__dirname, '/../database/redis/index'),
        ROUTERS_LOADER: path.join(__dirname, '/../system/express/router'),
        ROUTERS_PATH: path.join(__dirname, '/../protocols/express/routers'),
        SCHEMA_LOADER: path.join(__dirname, '/../database/mongoose/index'),
        SERVICES_PATH: path.join(__dirname, '/../application/services')
    },
    // Application's constant variables
    VARIABLE: {}
};
