const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const bcrypt = require('bcryptjs');
const Schema = Mongoose.Schema;


const UserSchema = new Schema({
    //User id:
    user_id: {
        type: Number,
        unique: true
    },
    //username:
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 128
    },
    //hashed password (bcrypt)
    password: {
        type: String,
        required: true,
    },
    //email address:
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 256
    },
    // User comments ids
    comments_id: {
        type: Array
    },
    // User forms ids
    forms_id: {
      type: Array
    },
    //User group
    group: {
        type: String,
        enum: ['standard', 'admin'],
        default: 'standard'
    }
});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

UserSchema.methods = {
    // User authentication
    authenticate(password) {
        return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
    },
    // Returning user data
    view() {
        let fields = ['user_id', 'username', 'email', 'comments_id', 'forms_id', 'group'];
        let view = {};

        fields.forEach((field) => {
            view[field] = this[field]
        });

        return view;
    }
};

module.exports = {
    UserSchema,
    User: Mongoose.model('User', UserSchema)
};