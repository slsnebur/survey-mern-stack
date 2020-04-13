const { Router } = require('express');
const password = require('../../middlewares/password');
const token = require('../../middlewares/token');
const groupAuthorize = require('../../middlewares/groupAuthorize');
const validateCreateUser = require('../../middlewares/validateCreateUser');
const validateLogin = require('../../middlewares/validateLogin');

const {
    getUsers,
    getUser,
    getUserComments,
    createUser,
    updateUser,
    destroyUser,
    destroyUserComments,
    loginUser,
    showMe,
    logout
} = require('./controller');
const router = Router();

router.get('/', getUsers);
router.get('/me', token, showMe);
router.get('/:id', getUser);
router.get('/:id/comments', getUserComments);

router.post('/', validateCreateUser,  createUser);
router.post('/login', validateLogin, password, loginUser);
router.post('/logout', logout);

router.put('/:id', token, groupAuthorize, updateUser);

router.delete('/:id', token, groupAuthorize, destroyUser);
router.delete('/:id/comments', token, groupAuthorize, destroyUserComments);


module.exports = router;
