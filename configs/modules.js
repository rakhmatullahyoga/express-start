/**
 * Created by rakhmatullahyoga on 05/07/17.
 */

'use strict';

module.exports = {
    ASYNC:              require('async'),
    BODY_PARSER:        require('body-parser'),
    CORS:               require('cors'),
    EXPRESS:            require('express'),
    EXPRESS_LOGGER:     require('express-request-logger'),
    FS:                 require('fs'),
    HTTP:               require('http'),
    METHOD_OVERRIDE: 	require('method-override'),
    MONGOOSE: 			require('mongoose'),
    MONGOOSE_DELETE: 	require('mongoose-delete'),
    MONGOOSE_UNIQUE: 	require('mongoose-unique-validator'),
    MULTER: 			require('multer'),
    PATH:               require('path'),
    REDIS:              require('redis'),
    SEQUELIZE:          require('sequelize'),
    UNDERSCORE:         require('underscore'),
    WINSTON:            require('winston')
};