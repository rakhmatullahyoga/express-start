/**
 * Created by rakhmatullahyoga on 05/07/17.
 */

'use strict';

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

// INITIALIZE TOOLS AND LIBRARIES
let TOOLS = require(CONSTANTS.PATH.APPLICATION_TOOLS)(MODULES, CONSTANTS);

// STARTING EXPRESS SERVER
require(CONSTANTS.PATH.EXPRESS_SERVER)(TOOLS);