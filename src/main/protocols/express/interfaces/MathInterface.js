'use strict';

module.exports = function (TOOLS, MODULES, CONTANTS) {
    const MathController = TOOLS.CONTROLLERS['MathController'];

    return {
        /**
         * Get addition result of two integers
         * @param previousData {Object} Data from previous handler
         * @param req {Object} Request object (express)
         * @param res {Object} Response object (express)
         * @param next {Function} Callback function for next handler
         */
        addition: function (previousData, req, res, next) {
            let a = parseInt(req.query.a);
            let b = parseInt(req.query.b);
            MathController.addition(a, b, next);
        },

        /**
         * Get subtraction result of two integers
         * @param previousData {Object} Data from previous handler
         * @param req {Object} Request object (express)
         * @param res {Object} Response object (express)
         * @param next {Function} Callback function for next handler
         */
        subtraction: function (previousData, req, res, next) {
            let a = parseInt(req.query.a);
            let b = parseInt(req.query.b);
            MathController.subtraction(a, b, next);
        },

        /**
         * Get multiplication result of two integers
         * @param previousData {Object} Data from previous handler
         * @param req {Object} Request object (express)
         * @param res {Object} Response object (express)
         * @param next {Function} Callback function for next handler
         */
        multiply: function (previousData, req, res, next) {
            let a = parseInt(req.query.a);
            let b = parseInt(req.query.b);
            MathController.multiply(a, b, next);
        },

        /**
         * Get division result of two integers
         * @param previousData {Object} Data from previous handler
         * @param req {Object} Request object (express)
         * @param res {Object} Response object (express)
         * @param next {Function} Callback function for next handler
         */
        division: function (previousData, req, res, next) {
            let a = parseInt(req.query.a);
            let b = parseInt(req.query.b);
            MathController.division(a, b, next);
        }
    };
};
