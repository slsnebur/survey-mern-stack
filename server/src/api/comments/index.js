const { Router } = require('express');
const token = require('../../middlewares/token');
const groupAuthorizeComment = require('../../middlewares/groupAuthorizeComment');
const {
    getComment,
    updateComment,
    deleteComment
} = require('./controller');
const router = Router();

router.get('/:id', getComment);

router.put('/:id', token, groupAuthorizeComment, updateComment);

router.delete('/:id', token, groupAuthorizeComment, deleteComment);

module.exports = router;
