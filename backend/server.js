const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const SpellingBeeWordModel = require("./models/words")
const UserModel = require("./models/users")
const fs = require('node:fs');
const path = require('path');
const axios = require('axios');

var app = express();
app.use(cors());
app.use(express.json());

// ChatGPT inits. Definitely don't hardcode this lol
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure you set the OPENAI_API_KEY environment variable before running the server

// Connect to your MongoDB database (replace with your database URL)
// Password: fDV7rgpIsEclbyGS
mongoose.connect("mongodb+srv://christopherwu11:fDV7rgpIsEclbyGS@cluster0.n61lnsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Check for database connection errors
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

/**
 * Spelling Bee APIs
 */
// Add user to the database
app.post("/addUser", (req, res) => {
    UserModel.create({
        username: req.body.username,
        password: req.body.password,
        id: req.body.id,
    })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
});

// Get users from the database
app.get("/getUsers", (req, res) => {
    UserModel.find({})
        .then((userList) => res.json(userList))
        .catch((err) => res.json(err));
});

// Get saved words from the database
app.post("/getWords", (req, res) => {
    const userId = req.body.userId;
    console.log("User ID:", userId); // Log the userId for debugging
    SpellingBeeWordModel.find({ userId: userId })
        .then((spellingBeeWordList) => res.json(spellingBeeWordList))
        .catch((err) => res.json(err))
});

// Add new word to the database
app.post("/addWord", (req, res) => {
    const word = req.body.word.trim().toUpperCase();
    console.log("Adding word:", word, " submitted by: ", req.body.userId); // Log the word being added
    SpellingBeeWordModel.create({
        word: word,
        hint: req.body.hint,
        dateAdded: req.body.dateAdded,
        userId: req.body.userId,
    })
        .then((word) => res.json(word))
        .catch((err) => res.json(err));
});

// Delete word from the database
app.delete("/deleteWord/:id", (req, res) => {
    const id = req.params.id;
    SpellingBeeWordModel.findByIdAndDelete({ _id: id })
        .then((word) => res.json(word))
        .catch((err) => res.json(err));
});

// Update word in the database
app.post("/updateWord/:id", (req, res) => {
    const id = req.params.id;
    const word = req.body.word.trim().toUpperCase();
    const updateData = {
        word: word,
        hint: req.body.hint,
        dateAdded: req.body.dateAdded,
        userId: req.body.userId,
    };
    SpellingBeeWordModel.findByIdAndUpdate(id, updateData)
        .then((word) => res.json(word))
        .catch((err) => res.json(err));
});

// Find words that can be formed with the given letters
app.post("/findWords", (req, res) => {
    const letters = req.body.letters.toUpperCase();
    const userId = req.body.userId;

    console.log("Finding words with letters:", letters, " for user ID: ", userId); // Log the letters and userId

    SpellingBeeWordModel.find({ userId: userId, word: { $regex: new RegExp(`^([${letters}]+){4,}$`, 'i') } })
        .then((words) => res.json(words))
        .catch((err) => res.json(err));
});

// Solve Spelling Bee puzzle with letters and center letter
app.post("/solveSpellingBee", (req, res) => {
    const wordListPath = path.join(__dirname, 'util', 'words.txt');
    const wordList = fs.readFileSync(wordListPath, 'utf8').split('\r\n');
    console.log("Word list loaded with ", wordList.length, " entries");

    const letterSet = new Set(req.body.letters.toLowerCase().split(''));
    const centerLetter = req.body.centerLetter.toLowerCase();

    console.log("Finding words with letters:", letterSet, "and center letter:", centerLetter); // Log the letters

    const wordsWithCenterLetterAndLetters = wordList
        .filter(word => {
            return word.length >= 4 && 
                word.includes(centerLetter) && 
                [...new Set(word)].every(letter => letterSet.has(letter));
        });

    console.log(`Found ${wordsWithCenterLetterAndLetters.length} words.`);

    try {
        res.json(wordsWithCenterLetterAndLetters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Generate hint using ChatGPT
app.post("/generateHint", async (req, res) => {
    const word = req.body.word;
    const prompt = "Create a short hint for the word " + word;
    console.log("Requesting ChatGPT to create a hint for the word: ", word);
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-4.1-nano-2025-04-14",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data.choices[0].message.content);
    } catch (error) {
        console.error("Error calling ChatGPT API:", error.response ? error.response.data : error.message);
    }
});

app.listen(3001, () => {
    console.log('Server running on 3001');
});