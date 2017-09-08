/**
 * Created by rakhmatullahyoga on 05/07/17.
 */

'use strict';

console.time('Total application preparation time');

require('dotenv').config();

console.log("Starting app...");

// LOAD APPLICATION'S CONSTANTS
console.time('Loading app constants');
let CONSTANTS = require(__dirname+'/configs/constants');
console.timeEnd('Loading app constants');

// DEFINE ALL MODULES
console.time('Loading app modules');
let MODULES = require(CONSTANTS.PATH.APPLICATION_MODULES);
console.timeEnd('Loading app modules');

// DOING ASYNC.waterfall because this process needs blocking process
MODULES.ASYNC.waterfall([
    function (callback) {
        // INITIALIZE TOOLS, LIBRARIES AND WHOLE APPLICATION
        require(CONSTANTS.PATH.APPLICATION_TOOLS)(MODULES, CONSTANTS, callback);
    }
], function (err, result) {
    if(err) {
        throw err;
    } else {
        // STARTING EXPRESS SERVER
        require(CONSTANTS.PATH.EXPRESS_SERVER)(result, MODULES);
    }
});