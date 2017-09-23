/**
 * Created by rakhmatullahyoga on 21/09/17.
 */

const chai = require('chai');
let welcomeService;
let should = chai.should();

describe('Service: WelcomeService', function () {
    before('load helpers', function () {
        // suppress console logging and timer
        console.time = function () { };
        console.timeEnd = function () { };

        let mongoose = require('mongoose');
        mongoose.connection.models = {};

        let constants = require('../../../configs/constants');
        let modules = require('../../../configs/modules');
        require('../../../configs/tools')(modules, constants, function (err, tools) {
            welcomeService = require('../../../application/services/WelcomeService')(tools, modules, constants);
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