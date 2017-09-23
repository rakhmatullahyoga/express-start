/**
 * Created by rakhmatullahyoga on 22/09/17.
 */


const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
let server;
chai.use(chaiHttp);

describe('Express endpoints', function () {
    before('Starting up application', function () {
        // mute logger
        console.time = function () { };
        console.timeEnd = function () { };
        console.info = function () { };

        server = require('../../index');
    });

    describe('GET /', function () {
        it('should return success response', function (done) {
            chai.request(server).get('/').end(function (err, response) {
                response.should.have.status(200);
                response.should.be.an('object');
                done();
            })
        });
    });

    describe('POST /', function () {
        it('should return failure response', function (done) {
            chai.request(server).post('/').end(function (err, response) {
                response.should.have.status(404);
                response.should.be.an('object');
                done();
            })
        });
    });

    after('remove mongoose model', function () {
        server.close();
    });
});