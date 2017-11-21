'use strict';
require('dotenv').config();

module.exports = {
    'development': {
        'url': process.env.MYSQL_URL
    }
};
