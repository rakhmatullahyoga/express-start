/**
 * Created by rakhmatullahyoga on 06/07/17.
 */

'use strict';

module.exports = function (MODULES, CONSTANTS) {
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
    TOOLS.SERVICES = require(CONSTANTS.PATH.SERVICES_LOADER)(TOOLS, MODULES, CONSTANTS);

    // Initialize controllers
    TOOLS.CONTROLLERS = require(CONSTANTS.PATH.CONTROLLERS_LOADER)(TOOLS, MODULES, CONSTANTS);

    // Packaging constants and modules
    TOOLS.CONSTANTS = CONSTANTS;
    TOOLS.MODULES = MODULES;

    return TOOLS;
};