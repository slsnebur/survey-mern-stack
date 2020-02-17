const Joi = require('joi');
const config = require("../config");

const schema = Joi.object().keys({
    email: Joi.string().email().min(3).max(256).required(),
    password: Joi.string().min(4).max(512).required(),
});

module.exports = (req, res, next) => {
    try {
        if(!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({
                message: "Missing authorization header"
            });
        }

        const base64credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');

        const data = {email, password};

        Joi.validate(data, schema, (err, value) => {
            if(err) {
                res.status(422).json({message: err.details[0].message})
            }
            else {
                next();
            }
        });

    } catch (e) {
        res.status(500).json({message: "Error in validation middleware"});
    }
};