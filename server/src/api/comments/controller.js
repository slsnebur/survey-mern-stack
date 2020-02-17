const {Comment} = require('./model');
const {User} = require('../users/model');

// GET

// Returns comment by id
const getComment = async ({ params }, res, next) => {
    const id = {comment_id: params.id};
    console.log(id);
    try {
        const comment = await Comment.findOne(id);
        if(comment) {

            return res.status(200).json({
                comment: comment.view()
            });

        }
        return res.status(404).json({error: 'Comment not found'});
    } catch (e) {
        return next(e);
    }
};


// PUT

const updateComment = async (req, res, next) => {
    const id = req.params.id;
    const {text} = req.body;

    try {
       const comment = await Comment.findOne({comment_id: id});
       if(comment) {
            comment.text = text + '\n\n Last edit on: ' + new Date();
            await comment.save();
           return res.status(200).json({
               message: "Comment successfully updated",
               comment: comment.view()
           });
       }
       else {
           return res.status(404).json({error: "Comment not found"});
       }

    } catch (e) {
        return next(e);
    }
};

// DELETE

const deleteComment = async (req, res, next) => {
    const id = {comment_id: req.params.id};
    try {
        const comment = await Comment.findOne(id);
        if(comment){
            comment.remove();
            return res.status(202).json({message: 'Removed'});
        }
        return res.status(404).json({error: "Comment not found"});

    } catch (e) {
        next(e)
    }
};

module.exports = {
    getComment,
    updateComment,
    deleteComment
};