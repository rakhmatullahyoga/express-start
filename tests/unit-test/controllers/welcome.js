/**
 * Created by rakhmatullahyoga on 22/09/17.
 */

const chai = require('chai');
let welcomeController;
let should = chai.should();

describe('Controller: WelcomeController', function () {
    before('load helpers', function (done) {
        // suppress console logging and timer
        console.time = function () { };
        console.timeEnd = function () { };

        let constants = require('../../../configs/constants');
        let modules = require('../../../configs/modules');
        require('../../../configs/tools')(modules, constants, function (err, tools) {
            if (err) {
                done(err);
            } else {
                welcomeController = tools.CONTROLLERS.WelcomeController;
                done();
            }
        });
    });

    describe('#welcome()', function () {
        it('should return a welcome message', function (done) {
            welcomeController.welcome(null, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.be.an('object');
                result.message.should.be.a('string');
                result.message.should.equal('Welcome!');
                done();
            });
        });
    });
});
