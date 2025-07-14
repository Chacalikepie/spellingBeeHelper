const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    id: {
        type: String,
    },
});

const userList = mongoose.model("user", user);

module.exports = userList;