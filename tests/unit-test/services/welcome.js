/**
 * Created by rakhmatullahyoga on 21/09/17.
 */

const chai = require('chai');
let welcomeService;
let should = chai.should();

describe('Service: WelcomeService', function () {
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
                welcomeService = tools.SERVICES.WelcomeService;
                done();
            }
        });
    });

    describe('#welcome()', function () {
        it('should return a welcome message', function (done) {
            welcomeService.welcome(null, function (err, result) {
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
