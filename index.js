/**
 * Created by rakhmatullahyoga on 05/07/17.
 */

'use strict';

require('dotenv').config();

console.log("Starting app...");

// LOAD APPLICATION'S CONSTANTS
let CONSTANTS = require(__dirname+'/application/configs/constants');

// DEFINE ALL MODULES
let MODULES = require(CONSTANTS.PATH.APPLICATION_MODULES);

// INITIALIZE TOOLS AND LIBRARIES
let TOOLS = require(CONSTANTS.PATH.APPLICATION_TOOLS)(MODULES, CONSTANTS);

// STARTING APPLICATION SERVER
require(CONSTANTS.PATH.APPLICATION_SERVER)(TOOLS);