/**
 * Created by rakhmatullahyoga on 28/07/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    return {
        /**
         * Get return data for testing
         * @param params Any JSON Object
         * @param callback Callback function
         */
        hello: function (params, callback) {
            callback(null, params);
        }
    };
};