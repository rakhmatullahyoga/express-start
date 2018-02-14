'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    return {
        /**
         * Get welcome message
         * @param callback {Function} Callback function
         */
        welcome: function (callback) {
            callback(null, {message: 'Welcome!'});
        }
    };
};
