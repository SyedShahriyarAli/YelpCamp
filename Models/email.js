const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    message: String,
    email: String,
    name : String
});

module.exports = mongoose.model("email", emailSchema);