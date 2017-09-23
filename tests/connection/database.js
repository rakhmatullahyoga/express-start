/**
 * Created by rakhmatullahyoga on 22/09/17.
 */

const chai = require('chai');
let should = chai.should();
let Sequelize = require('sequelize');
let mongoose = require('mongoose');
let redis = require('redis');

describe('Database connectivity', function () {
    before('load environments', function () {
        require('dotenv').load();
    });

    describe('Sequelize ORM', function () {
        it('should connect to sequelize and database server', function (done) {
            let sequelize = new Sequelize(process.env.DB_CONNECTION + '://' + process.env.DB_USERNAME + ':'
                + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT
                + '/' + process.env.DB_DATABASE);
            sequelize.authenticate().then(function () {
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    describe('Mongoose schema', function () {
        it('should connect to mongoose and mongodb server', function (done) {
            if(process.env.MONGO_USER && process.env.MONGO_PASS) {
                mongoose.connect('mongodb://' + process.env.MONGO_USER + ':'
                    + process.env.MONGO_PASS + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT
                    + '/' + process.env.MONGO_DATABASE, {useMongoClient: true}, done);
            } else {
                mongoose.connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT
                    + '/' + process.env.MONGO_DATABASE, {useMongoClient: true}, done);
            }
        });
    });

    describe('Redis in-memory data', function () {
        it('should connect to redis server', function (done) {
            let redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
            redisClient.on('connect', function () {
                done();
            });
            redisClient.on('error', function () {
                done(new Error('cannot connect to redis'));
            });
        });
    });
});