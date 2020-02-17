const {User} = require('../api/users/model');

module.exports = (req, res, next) => {
    const id = req.params.id;
    let tokenid = req.user.user_id;

    try {
        // Checking token id
        User.findOne({ user_id: tokenid }).then((usr) => {
            if (usr === null) {
                return res.status(410).json({message: 'Bearer of this token is not registered'});
            }

            // Checking user status (permission ring)
            User.findOne({user_id: id}).then((ussr) => {
                if(ussr === null) {
                    return res.status(410).json({message: 'User of this user_id does not exists'});
                }
                else if(usr.group === 'admin' || usr.user_id === ussr.user_id) {
                    next();
                }
                else {
                    return res.status(401).json({message: 'Unauthorized'});
                }

            });
        });

    } catch (e) {
        return next(e);
    }
};