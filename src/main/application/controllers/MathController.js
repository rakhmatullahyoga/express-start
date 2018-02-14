'use strict';

module.exports = function (TOOLS, MODULES, CONTANTS) {
    const MathService = TOOLS.SERVICES['MathService'];

    return {
        /**
         * Get addition result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        addition: function (a, b, callback) {
            MathService.addition(a, b, callback);
        },

        /**
         * Get subtraction result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        subtraction: function (a, b, callback) {
            MathService.subtraction(a, b, callback);
        },

        /**
         * Get multiplication result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        multiply: function (a, b, callback) {
            MathService.multiply(a, b, callback);
        },

        /**
         * Get division result of two integers
         * @param a {Number} First integer
         * @param b {Number} Second integer
         * @param callback {Function} Callback function
         */
        division: function (a, b, callback) {
            if (b !== 0) {
                MathService.division(a, b, callback);
            } else {
                let denominatorError = new Error('Denominator (b) cannot be zero!');
                denominatorError.code = 400;
                callback(denominatorError, null);
            }
        }
    };
};
