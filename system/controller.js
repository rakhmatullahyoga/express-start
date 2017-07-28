/**
 * Created by rakhmatullahyoga on 07/07/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    let fs          = MODULES.FS;
    let path        = MODULES.PATH;
    let controllers = {};

    fs.readdirSync(CONSTANTS.PATH.CONTROLLERS_PATH).filter(function (file) {
        let controllerName = file.replace(/\.js$/, '');
        controllers[controllerName] = require(path.join(CONSTANTS.PATH.CONTROLLERS_PATH, controllerName))(TOOLS, MODULES);
    });
    return controllers;
};