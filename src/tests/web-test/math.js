/**
 * Created by rakhmatullahyoga on 22/09/17.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Express endpoints', function () {
    describe('GET /math/add', function () {
        it('should return success response', function (done) {
            chai.request(global.express_server).get('/math/add').query({a: 1, b: 1}).end(function (err, response) {
                if (err) {
                    done(err);
                } else {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                }
            });
        });
    });

    describe('GET /math/subtract', function () {
        it('should return success response', function (done) {
            chai.request(global.express_server).get('/math/subtract').query({a: 1, b: 1}).end(function (err, response) {
                if (err) {
                    done(err);
                } else {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                }
            });
        });
    });

    describe('GET /math/multiply', function () {
        it('should return success response', function (done) {
            chai.request(global.express_server).get('/math/multiply').query({a: 1, b: 2}).end(function (err, response) {
                if (err) {
                    done(err);
                } else {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                }
            });
        });
    });

    describe('GET /math/divide', function () {
        it('should return success response', function (done) {
            chai.request(global.express_server).get('/math/divide').query({a: 6, b: 2}).end(function (err, response) {
                if (err) {
                    done(err);
                } else {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                }
            });
        });
    });

    describe('GET /math/divide', function () {
        it('should return failure response', function (done) {
            chai.request(global.express_server).get('/math/divide').query({a: 1, b: 0}).end(function (err, response) {
                if (err) {
                    should.exist(err);
                }
                should.exist(response);
                err.status.should.equal(400);
                response.statusCode.should.equal(400);
                done();
            });
        });
    });
});
