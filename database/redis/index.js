/**
 * Created by rakhmatullahyoga on 07/09/17.
 */

'use strict';

module.exports = function (MODULES) {
    let redisClient = MODULES.REDIS.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
    redisClient.on('connect', function () {
        redisClient.set('api_id', 'profile-0.1.0');
    });
    return redisClient;
};