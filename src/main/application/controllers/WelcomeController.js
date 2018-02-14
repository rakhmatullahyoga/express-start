'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    let welcomeService = TOOLS.SERVICES['WelcomeService'];

    return {
        /**
         * Get welcome message
         * @param callback {Function} Callback function
         */
        welcome: function (callback) {
            welcomeService.welcome(callback);
        }
    };
};
