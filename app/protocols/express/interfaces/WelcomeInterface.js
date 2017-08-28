/**
 * Created by rakhmatullahyoga on 17/08/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES) {
    let welcomeController = TOOLS.CONTROLLERS.WelcomeController;
    return {
        welcome: function(previousData, req, res, next) {
            welcomeController.welcome(null, next);
        }
    };
};