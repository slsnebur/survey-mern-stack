//"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"

const env = process.env.NODE_ENV || 'development';

if(env === "development") module.exports = require('./config/development.config');
if(env === "production") module.exports = require('./config/production.config');
if(env === "test") module.exports = require('./config/test.config');

