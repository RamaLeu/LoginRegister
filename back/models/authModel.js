const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    type:{
        type: String,
    },
    password: {
        type: String,
    },
    salt: {
        type:String
    }


});

const AuthModel = new mongoose.model("users", authSchema);

module.exports = AuthModel;