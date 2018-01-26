describe('Initiate application', function () {
    it('Setup controllers, services and express server as global variables', function (done) {
        if (process.env.NODE_ENV === 'development') {
            require('dotenv').config();
        }
        // mute logger
        console.time = function () { };
        console.timeEnd = function () { };
        console.info = function () { };

        global.constants = require('../main/configs/constants');
        global.modules = require('../main/configs/modules');
        require('../main/configs/tools')(global.modules, global.constants, function (err, tools) {
            if (err) {
                done(err);
            } else {
                global.controllers = tools.CONTROLLERS;
                global.services = tools.SERVICES;
                require(global.constants.PATH.EXPRESS_SERVER)(tools, global.modules, global.constants, process.env.TEST_PORT).then(function (server) {
                    global.express_server = server;
                    done();
                });
            }
        });
    });
});
