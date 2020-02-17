const config = {
    env: 'test',
    port: 3002,
    ip: '127.0.0.1',
    apiRoot: '/api',
    mongo: {
        host: 'mongodb://localhost/qform-app-db-test',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            debug: false
        }
    },
    jwtExpiration: "365d"
};

module.exports = config;
