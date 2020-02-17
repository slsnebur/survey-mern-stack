const { env, port, ip, apiRoot } = require('./config');
const express = require('./services/express');
const mongoose = require('./services/mongoose');
const api = require('./api');

require('dotenv').config();


const app = express(apiRoot, api);
app.listen(port, ip, () => {
    console.log(`Express server listening on http://${ip}:${port}, in ${env} mode`);
});


module.exports = app;
