const express = require('express');

const expressConfig = (apiRoot, api) => {
    const app = express();
    app.use(express.json());
    app.use(apiRoot, api);

    // 404 Error handler
    app.use((req, res, next) =>  res.status(404).send({error: 'Routing not found'}));

    // 400 Error handler
    app.use((err, req, res, next) =>  {
        console.error(err.message);
        if(err.name === 'CastError')
            return res.status(400).end();
        if(err.name === 'ValidationError')
            return res.status(400).json({error: err.message});
        return res.status(500).end();
    });

    app.use(express.static('../public'));

    return app;
};

module.exports = expressConfig;