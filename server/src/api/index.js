const {Router} = require('express');
const users = require('./users');
const forms = require('./forms');
const comments = require('./comments');
const cors = require('cors');

const router = Router();


//Routing
router.use(cors());
router.options("*", cors());
router.use('/users', users);
router.use('/forms', forms);
router.use('/comments', comments);


module.exports = router;
