const chai = require('chai');
let mathController;
let should = chai.should();

describe('Service: MathController', function () {
    before('load helpers', function (done) {
        mathController = global.controllers['MathController'];
        done();
    });

    describe('#addition()', function () {
        it('should return addition result', function (done) {
            mathController.addition(1, 1, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.be.an('object');
                result.result.should.be.a('number');
                result.result.should.equal(2);
                done();
            });
        });
    });

    describe('#subtraction()', function () {
        it('should return subtraction result', function (done) {
            mathController.subtraction(1, 1, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.be.an('object');
                result.result.should.be.a('number');
                result.result.should.equal(0);
                done();
            });
        });
    });

    describe('#multiply()', function () {
        it('should return multiplication result', function (done) {
            mathController.multiply(1, 1, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.be.an('object');
                result.result.should.be.a('number');
                result.result.should.equal(1);
                done();
            });
        });
    });

    describe('#division()', function () {
        it('should return division result', function (done) {
            mathController.division(6, 2, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.be.an('object');
                result.result.should.be.a('number');
                result.result.should.equal(3);
                done();
            });
        });
    });

    describe('#division()', function () {
        it('should return division error', function (done) {
            mathController.division(6, 0, function (err, result) {
                should.not.exist(result);
                should.exist(err);
                err.should.be.an('error');
                err.code.should.equal(400);
                done();
            });
        });
    });
});
