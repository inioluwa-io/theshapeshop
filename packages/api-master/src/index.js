require('@babel/register');
require('@babel/polyfill');
const server = require('./server').localCors;

module.exports = server;
