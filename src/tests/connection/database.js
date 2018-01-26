/**
 * Created by rakhmatullahyoga on 22/09/17.
 */

let Sequelize = require('sequelize');
let mongoose = require('mongoose');
let redis = require('redis');

describe('Database connectivity', function () {
    before('load environments', function () {
        if (process.env.NODE_ENV === 'development') {
            require('dotenv').config();
        }
    });

    describe('Sequelize ORM', function () {
        it('should connect to sequelize and database server', function (done) {
            let sequelize = new Sequelize(process.env.MYSQL_URL, {logging: false});
            sequelize.authenticate().then(function () {
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    describe('Mongoose schema', function () {
        it('should connect to mongoose and mongodb server', function (done) {
            mongoose.connect(process.env.MONGO_URL, {useMongoClient: true}, done);
        });
    });

    describe('Redis in-memory data', function () {
        it('should connect to redis server', function (done) {
            let redisClient = redis.createClient(process.env.REDIS_URL);
            redisClient.on('connect', function () {
                done();
            });
            redisClient.on('error', function () {
                done(new Error('cannot connect to redis'));
            });
        });
    });
});
