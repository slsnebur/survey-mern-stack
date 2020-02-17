const {Form} = require('./model');
const {User} = require('../users/model');
const {Comment} = require('../comments/model');

const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

// GET
// Returns all forms currently present in DB
const getForms = async ({ query }, res, next) => {
    try {
        // Pagination options
        let pageOptions = {
            page: query.page || 0,
            limit: 5
        };
        await Form.find({'_id': false}, function(err, forms) {
            let formMap = {};
            console.log(forms);

            if(forms === undefined) {

            }
            else {
                forms.forEach(function(form) {
                    formMap[form.form_id] = {
                        form_id: form.form_id,
                        name: form.name,
                        user_id: form.user_id,
                        comments_id: form.comments_id,
                        pages: form.pages
                    };
                });
            }
            res.status(200).json(formMap);
        }).limit(pageOptions.limit).skip(pageOptions.page * pageOptions.limit);
    } catch (e) {
        return next(e);
    }
};

// Returns form specified by form_id
const getForm = async ({ params }, res, next) => {
    const id = {form_id: params.id};
    try {
        const form = await Form.findOne(id);
        if(form) {
            formLocal = form.view();
            return res.status(200).json(formLocal);
        }
        return res.status(404).json({error: 'Form not found'});
    } catch (e) {
        return next(e);
    }
};

const getCommentsFromForm = async (req, res, next) => {
    // Pagination options
    let pageOptions = {
        page: req.query.page || 0,
        limit: 5
    };
    const id = parseInt(req.params.id);

    try {
        const form = await Form.findOne({form_id: id});
        if(form) {
            await Comment.find({comment_id: {$in : form.comments_id}}, function(err, comments) {
                let commentMap = {};

                comments.forEach(function(comment) {
                    commentMap[comment.comment_id] = {
                        comment_id: comment.comment_id,
                        user_id: comment.user_id,
                        form_id: comment.form_id,
                        username: comment.username,
                        text: comment.text,
                        timestamp: comment.timestamp
                    };
                });
                res.status(200).json(commentMap);
                console.log(pageOptions);
            }).limit(pageOptions.limit).skip(pageOptions.page * pageOptions.limit);

        }
        else {
            return res.status(404).json({error: 'Form not found'});
        }
    } catch(e) {
        next(e);
    }

};

// Returns owner of the form specified by id
const getUserFromForm = async ({params}, res, next) => {
    const id = parseInt(params.id);
    try {
        Form.findOne({ form_id: id }).then((frm) => {
            if (frm === null) {
                return res.status(410).json({message: 'Form of such form_id does not exist'});
            }

            User.findOne({user_id: frm.user_id}).then((usr) => {
               if(usr === null) {
                   return res.status(410).json({message: 'Owner of this form does no longer exists'});
               }
               return res.status(200).json({user: usr.view()});
            });
        });
    } catch (e) {
        return next(e);
    }
};

//TODO
// Returns survey results as json
const getSummaryFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// TODO
// Returns QR code which contains link to this form
const getQRForm = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const imgPath = id + '.png';
    dirPath = path.join(__dirname, '../../../public/qr');
    filePath = path.join(dirPath, imgPath);

    try {
        // Check if form exists
         Form.findOne({ form_id: id }).then(async (frm) => {
            if (frm === null) {
                return res.status(410).json({message: 'Form of such form_id does not exist'});
            }
            // Check if file exists
            else if(fs.existsSync(filePath)) {
                res.sendFile(imgPath, {'root': dirPath});
            }
            // If QR code does not exists it needs to be generated and saved
            else {
                 await QRCode.toFile(filePath, process.env.DOMAIN_NAME + 'api/forms/' + id, function (err, url) {
                    console.log('QR code saved to ' + filePath);
                });
                res.sendFile(imgPath, {'root': dirPath});
            }
        });

    } catch (e) {
        next(e);
    }
    //res.json({message: 'This method has not been implemented'});
};

const getPagesFromForm = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        const form = await Form.findOne({form_id: id});
        if(form){
            return res.status(200).json({
                pages: form.viewPages()
            });
        }
        return res.status(404).json({error: "Form not found"});

    } catch(e) {
        next(e);
    }
};

const getPageFromForm = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const pid = parseInt(req.params.pid) || 0;

    try {
        const form = await Form.findOne({form_id: id});
        if(form){
            return res.status(200).json({
                message: "OK",
                pages: form.viewPage(pid)
            });
        }
        return res.status(404).json({error: "Form not found"});

    } catch(e) {
        next(e);
    }
};

//POST
// Creates empty form
const addForm = async (req, res, next) => {

        // Adding indexes and 0 count to pages
        if(req.body.pages) {
            let pages = req.body.pages;

            iterator = 1;
            pages.forEach(element => {
                // Setting indexes for pages
                element.question_id = iterator;
                iterator++;

                // Setting answer count to 0
                element.answers.forEach(answer => {
                    answer.count = 0;
                });
            });

        }

    try {
        const form = await Form.create({
            name: req.body.name,
            user_id: req.user.user_id,
            comments_id: [],
            pages: req.body.pages
        });
        return res.status(201).json({
            form: form.view()
        })
    } catch (e) {
        return next(e);
    }
};

// Answer specific question
const answerQuestion = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const pid = parseInt(req.params.pid) || 0;
    const answer = parseInt(req.body.answer);

    try {
        const form = await Form.findOne({form_id: id});
        if(form){
            if(form.pages.length !== 0){
                if((form.pages.length >= pid)) {
                    if(answer <= form.pages[pid-1].answers.length) {
                        console.log(form.pages[pid-1].answers);
                        form.pages[pid-1].answers[answer-1].count+=1;
                        form.save();

                        return res.status(200).json({
                            message: "Answer submitted",
                            form: form
                        });
                    }
                }
            }
        }
        return res.status(422).json({error: "Cannot answer this question"});

    } catch(e) {
        next(e);
    }
};


// Adds comment to specified form
const addComment = async (req, res, next) => {
    let {user} = req;
    let id = req.params.id;

    try {
        User.findOne({ user_id: user.user_id }).then((usr) => {
            if (usr === null) {
                return res.status(410).json({message: 'User of this user_id is not currently registered'});
            }
            Form.findOne({form_id: id}).then(async (frm) => {
                if(frm === null) {
                    return res.status(410).json({message: 'Form of such form_id does not exists'});
                }

                // Creating comment and pushing it to DB
                try {
                    const comment = await Comment.create({
                        user_id: usr.user_id,
                        form_id: frm.form_id,
                        username: usr.username,
                        text: req.body.text,
                        timestamp: new Date()
                    });

                    // Updating comments_id array in Form to store comment_id
                    frm.comments_id.push(comment.comment_id);
                    frm.save();

                    // Updating comments_id array in User to track user comments
                    usr.comments_id.push(comment.comment_id);
                    usr.save();

                    return res.status(201).json({comment: comment.view()});
                } catch (e) {
                    console.error(e);
                    return res.status(503).json({message: 'Comment length should be between 4 and 512 characters'});
                }
            });
        });

    } catch (e) {
        return next(e);
    }
};

//TODO
// Appends to Pages array
const addPages = async (req, res, next) => {
    const id = {form_id: req.params.id};
    const { pages } = req.body;
    try {
        const form = await Form.findOne(id);
        if(form) {
            //TODO pid indexing and other stuff
            return res.status(200).json({"message": "Successfully added form pages list/array"});
        }
        return res.status(404).json({"error": "Form not found"});
    } catch (e) {
        return next(e);
    }


/*
    const id = {user_id: params.id};
    const {username, email, password} = body;
    try {
        const user = await User.findOne(id);
        if(user){
            user.username = username;
            user.email = email;
            user.password = await bcrypt.hash(password, 12);
            await user.save();
            return res.status(200).json({"message": "User data successfully updated"});
        }
        return res.status(404).json({error: "User not found"});

    } catch (e) {
        next(e)
    }

 */
};

// PUT

// Updates form specified by id
const updateForm = async (req, res, next) => {
    const id = req.params.id;
    const {name, pages} = req.body;
    try {
        const form = await Form.findOne({form_id: id});
        if(form){
            form.name = name;
            form.pages = pages;
            form.timestamp = new Date();
            await form.save();
            return res.status(200).json({
                message: "Form data successfully updated",
                form: form.view()
            });
        }
        return res.status(404).json({error: "Form not found"});

    } catch (e) {
        next(e)
    }
};

//TODO
// Updated page specified by id
const updatePage = async ({ body , params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// DELETE

// Deletes form specified by id
const deleteForm = async (req, res, next) => {
    const id = req.params.id;

    try {
        const form = await Form.findOne({form_id: id});
        if(form){
            await form.remove();
            return res.status(202).json({message: "Deleted"});
        }
        return res.status(404).json({error: "Form not found"});

    } catch (e) {
        next(e)
    }
};

//TODO
// Drops all comments from form
const deleteAllCommentsFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Drops pages array from form
const deletePagesFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Drops specified page from form
const deletePageFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};


module.exports = {
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
};

