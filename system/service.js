/**
 * Created by rakhmatullahyoga on 07/07/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    let fs          = MODULES.FS;
    let path        = MODULES.PATH;
    let services = {};

    fs.readdirSync(CONSTANTS.PATH.SERVICES_PATH).filter(function (file) {
        let serviceName = file.replace(/\.js$/, '');
        services[serviceName] = require(path.join(CONSTANTS.PATH.SERVICES_PATH, serviceName))(TOOLS, MODULES);
    });
    return services;
};