const config = {
    env: "development",
    port: 3001,
    ip: '127.0.0.1',
    apiRoot: '/api',
    mongo: {
        host: 'mongodb://localhost/qform-app-db',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            debug: true
        }
    },
    jwtExpiration: "30d"
};

module.exports = config;
