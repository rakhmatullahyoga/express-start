/**
 * Created by rakhmatullahyoga on 11/07/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    let welcomeService = TOOLS.SERVICES.WelcomeService;
    return {
        /**
         * Get message as a data for response
         * @param param An object that should contains:
         * {
         *     message: string
         * }
         * @param callback Callback function
         */
        welcome: function(param, callback) {
            welcomeService.hello({message: "Hello world!"}, callback);
        }
    };
};