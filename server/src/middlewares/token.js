const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    try {
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: config.jwtExpiration});

        req.user = {user_id: decoded.user_id};
        res.user_id = req.user;
        next();
    } catch (e) {
        console.error('Invalid token');
        res.status(401).end();
    }
};
