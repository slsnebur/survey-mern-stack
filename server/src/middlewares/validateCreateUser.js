const Joi = require('joi');
const config = require("../config");

const schema = Joi.object().keys({
    email: Joi.string().email().min(3).max(256).required(),
    password: Joi.string().min(4).max(512).required(),
    username: Joi.string().min(4).max(128).required()
});

module.exports = (req, res, next) => {
    try {
        const data = req.body;

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