/**
 * Created by rakhmatullahyoga on 05/07/17.
 */

'use strict';

// Define express app variable, for testing purpose
let app;

console.time('Total application preparation time');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.info("Starting app...");

// LOAD APPLICATION'S CONSTANTS
console.time('Loading app constants');
let CONSTANTS = require(__dirname+'/configs/constants');
console.timeEnd('Loading app constants');

// DEFINE ALL MODULES
console.time('Loading app modules');
let MODULES = require(CONSTANTS.PATH.APPLICATION_MODULES);
console.timeEnd('Loading app modules');

// INITIALIZE TOOLS, LIBRARIES AND WHOLE APPLICATION
function initiateTools(callback) {
    require(CONSTANTS.PATH.APPLICATION_TOOLS)(MODULES, CONSTANTS, callback);
}

// STARTING APPLICATION SERVER (Express, RPC, etc)
function initiateAppServers(err, tools) {
    if(err) {
        throw err;
    } else {
        module.exports = require(CONSTANTS.PATH.EXPRESS_SERVER)(tools, MODULES, CONSTANTS);
    }
}

// DOING ASYNC.waterfall BECAUSE SEVERAL PROCESS NEEDS BLOCKING PROCESSING
MODULES.ASYNC.waterfall([initiateTools], initiateAppServers);