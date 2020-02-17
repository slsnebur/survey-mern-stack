const Joi = require('joi');
const config = require("../config");

const schema = Joi.object().keys({
    answer: Joi.number().integer().min(0).max(100)
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