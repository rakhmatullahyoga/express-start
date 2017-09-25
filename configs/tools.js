/**
 * Created by rakhmatullahyoga on 06/07/17.
 */

'use strict';

module.exports = function (MODULES, CONSTANTS, callback) {
    function loadToolsAndDatabase (callback) {
        console.time('Loading app tools and database');
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
        let storage = MODULES.MULTER.diskStorage({
            destination: './public/',
            filename: function (req, file, cb) {
                MODULES.CRYPTO.pseudoRandomBytes(16, function (err, raw) {
                    cb(err, err ? undefined : raw.toString('hex') + MODULES.PATH.extname(file.originalname));
                });
            }
        });
        TOOLS.MULTER = MODULES.MULTER({storage: storage});

        // Initialize models (Sequelize)
        TOOLS.MODELS = require(CONSTANTS.PATH.MODELS_LOADER)(MODULES);

        // Initialize mongoose (Mongoose)
        TOOLS.SCHEMA = require(CONSTANTS.PATH.SCHEMA_LOADER)(MODULES);

        // Initialize Redis database
        TOOLS.REDIS_CLIENT = require(CONSTANTS.PATH.REDIS_CLIENT)(MODULES);

        console.timeEnd('Loading app tools and database');

        callback(null, TOOLS);
    }

    function loadApplicationLayer (tools, callback) {
        console.time('Loading services, controllers and interfaces');
        // Initialize services
        tools.SERVICES = require(CONSTANTS.PATH.CLASS_LOADER)(tools, MODULES, CONSTANTS, CONSTANTS.PATH.SERVICES_PATH);

        // Initialize interfaces
        tools.CONTROLLERS = require(CONSTANTS.PATH.CLASS_LOADER)(tools, MODULES, CONSTANTS, CONSTANTS.PATH.CONTROLLERS_PATH);

        // Initialize interfaces
        tools.INTERFACES = {};

        console.timeEnd('Loading services, controllers and interfaces');
        callback(null, tools);
    }

    MODULES.ASYNC.waterfall([
        loadToolsAndDatabase,
        loadApplicationLayer
    ], function (err, result) {
        if (err) {
            throw err;
        } else {
            callback(null, result);
        }
    });
};
