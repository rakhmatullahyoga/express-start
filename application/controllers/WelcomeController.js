/**
 * Created by rakhmatullahyoga on 11/07/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES) {
    let welcomeService = TOOLS.SERVICES.WelcomeService;
    return {
        welcome: function(previousData, req, res, next) {
            welcomeService.hello(function (err, result) {
                if(err)
                    next(err, null);
                else
                    next(null, {message: result});
            });
        }
    };
};