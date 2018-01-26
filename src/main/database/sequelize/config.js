'use strict';
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

module.exports = {
    'development': {
        'url': process.env.MYSQL_URL
    }
};
