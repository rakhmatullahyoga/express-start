/**
 * Created by rakhmatullahyoga on 07/09/17.
 */

'use strict';

module.exports = function (MODULES) {
    return MODULES.REDIS.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
};
