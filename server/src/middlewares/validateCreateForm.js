const Joi = require('joi');
const config = require("../config");

const schema = Joi.object().keys({
    name: Joi.string().min(3).max(256).required(),
    pages: Joi.array().items(Joi.object({
        question_id: Joi.number().integer().min(0),
        question: Joi.string().min(1),
        answers: Joi.array().items(Joi.object({
            answer: Joi.string(),
            count: Joi.number().integer().min(0)
        }))

    }))
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