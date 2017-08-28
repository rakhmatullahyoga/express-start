/**
 * Created by rakhmatullahyoga on 06/07/17.
 */

'use strict';

module.exports = function (MODULES, CONSTANTS) {
    console.time('Loading app tools, models, services, and interfaces');
    // Define parameter for initialization
    let TOOLS = {};

    // Initialize application logger
    let logOpts = {
        transports: [
            new (MODULES.WINSTON.transports.Console)({colorize: true}),
            new (MODULES.WINSTON.transports.File)({
                filename: CONSTANTS.PATH.LOG_DEFAULT_PATH,
                handleExceptions: true,
                colorize: true
            })
        ],
        exceptionHandlers: [
            new (MODULES.WINSTON.transports.Console)({colorize: true}),
            new (MODULES.WINSTON.transports.File)({
                filename: CONSTANTS.PATH.LOG_EXCEPTIONS_PATH,
                handleExceptions: true,
                colorize: true
            })
        ]
    };
    TOOLS.LOG = new (MODULES.WINSTON.Logger)(logOpts);

    // Initialize multipart/form-data handler
    TOOLS.MULTER = MODULES.MULTER();

    // Initialize models
    TOOLS.MODELS = require(CONSTANTS.PATH.MODELS_LOADER)(MODULES);

    // Initialize services
    TOOLS.SERVICES = require(CONSTANTS.PATH.CLASS_LOADER)(TOOLS, MODULES, CONSTANTS.PATH.SERVICES_PATH);

    // Initialize interfaces
    TOOLS.CONTROLLERS = require(CONSTANTS.PATH.CLASS_LOADER)(TOOLS, MODULES, CONSTANTS.PATH.CONTROLLERS_PATH);

    // Initialize interfaces
    TOOLS.INTERFACES = {};

    // Packaging constants and modules
    TOOLS.CONSTANTS = CONSTANTS;
    TOOLS.MODULES = MODULES;

    console.timeEnd('Loading app tools, models, services, and interfaces');
    return TOOLS;
};