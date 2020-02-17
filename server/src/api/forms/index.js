const { Router } = require('express');
const token = require('../../middlewares/token');
const groupAuthorizeForm = require('../../middlewares/groupAuthorizeForm');
const {
    getForms,
    getForm,
    getCommentsFromForm,
    getUserFromForm,
    getSummaryFromForm,
    getQRForm,
    getPagesFromForm,
    getPageFromForm,
    addForm,
    addComment,
    addPages,
    updateForm,
    updatePage,
    deleteForm,
    deleteAllCommentsFromForm,
    deletePagesFromForm,
    deletePageFromForm,
    answerQuestion
} = require('./controller');
const router = Router();
const validateCreateform = require('../../middlewares/validateCreateForm');
const validateSubmitAnswer = require('../../middlewares/validateSubmitAnswer');

router.get('/', getForms);
router.get('/:id', getForm);
router.get('/:id/comments', getCommentsFromForm);
router.get('/:id/users', getUserFromForm);
router.get('/:id/summary', getSummaryFromForm);
router.get('/:id/qr', getQRForm);
router.get('/:id/pages', getPagesFromForm);
router.get('/:id/pages/:pid', getPageFromForm);

router.post('/', token, validateCreateform, addForm);
router.post('/:id/comments', token, addComment);
router.post('/:id/pages', groupAuthorizeForm, token, addPages);
router.post('/:id/pages/:pid',validateSubmitAnswer, token, answerQuestion);

router.put('/:id', token, groupAuthorizeForm, updateForm);
router.put('/:id/pages/:pid', token, groupAuthorizeForm, updatePage);

router.delete('/:id', token, groupAuthorizeForm, deleteForm);
router.delete('/:id/comments', token, groupAuthorizeForm, deleteAllCommentsFromForm);
router.delete('/:id/pages', token, groupAuthorizeForm, deletePagesFromForm);
router.delete('/:id/pages/:pid', token, groupAuthorizeForm, deletePageFromForm);



module.exports = router;
