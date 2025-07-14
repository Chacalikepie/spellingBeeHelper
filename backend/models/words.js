const mongoose = require('mongoose');

const spellingBeeWord = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    hint: {
        type: String,
        required: false,
    },
    dateAdded: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
});

const spellingBeeWordList = mongoose.model("word", spellingBeeWord);

module.exports = spellingBeeWordList;