const {Router} = require('express');
const users = require('./users');
const forms = require('./forms');
const comments = require('./comments');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const router = Router();


//Routing
router.use(cors({origin: 'http://localhost:3000', credentials: true}));
//router.options("*", cors());
router.use(cookieParser());
router.use('/users', users);
router.use('/forms', forms);
router.use('/comments', comments);


module.exports = router;
