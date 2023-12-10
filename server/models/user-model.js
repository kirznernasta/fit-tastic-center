const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleID: { type: String, unique: true },
    facebookID: { type: String, unique: true },
});

module.exports = mongoose.model('User', User)