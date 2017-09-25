/**
 * Created by rakhmatullahyoga on 22/09/17.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
let server;

describe('Express endpoints', function () {
    before('Starting up application', function () {
        chai.use(chaiHttp);
        // mute logger
        console.time = function () { };
        console.timeEnd = function () { };
        console.info = function () { };

        server = require('../../index');
    });

    describe('GET /', function () {
        it('should return success response', function (done) {
            chai.request(server).get('/').end(function (err, response) {
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

    describe('POST /', function () {
        it('should return failure response', function (done) {
            chai.request(server).post('/').end(function (err, response) {
                should.exist(err);
                should.exist(response);
                err.status.should.equal(404);
                response.statusCode.should.equal(404);
                done();
            });
        });
    });

    after('remove mongoose model', function (done) {
        server.close();
        done();
    });
});
