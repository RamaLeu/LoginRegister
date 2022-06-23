const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please tell us your username!'],
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false, //kad nesimatytu slaptazodis
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm ypur password!'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});


authSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);

    this.passwordConfirm = undefined;
    next();
})

const AuthModel = new mongoose.model("users", authSchema);

module.exports = AuthModel;