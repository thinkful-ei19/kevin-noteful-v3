'use strict';

exports.PORT = process.env.PORT || 8080;
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/noteful-app';
exports.TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://dev:dev@ds031203.mlab.com:31203/noteful-app-testing';