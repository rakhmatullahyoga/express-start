/**
 * Created by rakhmatullahyoga on 17/08/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES, FILE_PATH) {
    let fs          = MODULES.FS;
    let path        = MODULES.PATH;
    let log         = TOOLS.LOG;
    let classes     = {};

    function readRecursive(dirPath) {
        fs.readdirSync(dirPath).forEach(function (file) {
            let currentPath = dirPath + '/' + file;
            if(fs.statSync(currentPath).isDirectory()) {
                readRecursive(currentPath);
            } else {
                if((file.indexOf('.') !== 0) && (file.slice(-3) === '.js')) {
                    let className = file.replace(/\.js$/, '');
                    classes[className] = require(path.join(dirPath, className))(TOOLS, MODULES);
                } else {
                    log.warn(`file '${currentPath +'/'+ file}' is not supported for basic application class`);
                }
            }
        });
    }

    readRecursive(FILE_PATH);
    return classes;
};