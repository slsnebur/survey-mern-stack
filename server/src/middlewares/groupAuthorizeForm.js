const {User} = require('../api/users/model');
const {Form} = require('../api/forms/model');


module.exports = (req, res, next) => {
    const f_id = req.params.id;
    let tokenid = req.user.user_id;

    try {
        // Checking token id
        User.findOne({ user_id: tokenid }).then((usr) => {
            if (usr === null) {
                return res.status(410).json({message: 'Bearer of this token is not registered'});
            }
            else {
                // Checking whether comments exists
                Form.findOne({form_id: f_id}).then((form) => {
                    // Comment does not exists
                    if (form === null) {
                        return res.status(410).json({message: 'Form of this id does not exist'})
                    } else if (usr.group === 'admin' || usr.user_id === form.user_id) {
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