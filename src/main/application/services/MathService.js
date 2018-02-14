'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    return {
        /**
         * Get addition result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        addition: function (a, b, callback) {
            callback(null, {result: a + b});
        },

        /**
         * Get subtraction result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        subtraction: function (a, b, callback) {
            callback(null, {result: a - b});
        },

        /**
         * Get multiplication result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        multiply: function (a, b, callback) {
            callback(null, {result: a * b});
        },

        /**
         * Get division result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        division: function (a, b, callback) {
            callback(null, {result: a / b});
        }
    };
};
