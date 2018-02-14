const chai = require('chai');
let mathService;
let should = chai.should();

describe('Service: MathService', function () {
    before('load helpers', function (done) {
        mathService = global.services['MathService'];
        done();
    });

    describe('#addition()', function () {
        it('should return addition result', function (done) {
            mathService.addition(1, 1, function (err, result) {
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
            mathService.subtraction(1, 1, function (err, result) {
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
            mathService.multiply(1, 1, function (err, result) {
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
            mathService.division(6, 2, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.be.an('object');
                result.result.should.be.a('number');
                result.result.should.equal(3);
                done();
            });
        });
    });
});
