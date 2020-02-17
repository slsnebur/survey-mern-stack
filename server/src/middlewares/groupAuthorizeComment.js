const {User} = require('../api/users/model');
const {Comment} = require('../api/comments/model');


module.exports = (req, res, next) => {
    const c_id = req.params.id;
    let tokenid = req.user.user_id;

    try {
        // Checking token id
        User.findOne({ user_id: tokenid }).then((usr) => {
            if (usr === null) {
                return res.status(410).json({message: 'Bearer of this token is not registered'});
            }
            else {
                // Checking whether comments exists
                Comment.findOne({comment_id: c_id}).then((comm) => {
                    // Comment does not exists
                    if (comm === null) {
                        return res.status(410).json({message: 'Comment of this id does not exist'})
                    } else if (usr.group === 'admin' || usr.user_id === comm.user_id) {
                        next();
                    } else {
                        return res.status(401).json({message: 'Unauthorized'});
                    }
                });
            }
        });

    } catch (e) {
        return next(e);
    }
};