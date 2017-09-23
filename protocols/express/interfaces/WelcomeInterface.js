/**
 * Created by rakhmatullahyoga on 17/08/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    let welcomeController = TOOLS.CONTROLLERS.WelcomeController;
    return {
        /**
         * Says hello
         * @param previousData Data from previous handler, must contains:
         * {
         *    *nothing*
         * }
         * @param req Request object (express)
         * @param res Response object (express)
         * @param next Callback function for next handler
         */
        welcome: function(previousData, req, res, next) {
            welcomeController.welcome(null, function (err, result) {
                next(err, result);
            });
        }
    };
};