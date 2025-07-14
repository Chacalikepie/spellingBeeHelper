# spellingBeeHelper
Companion web app to the NYT spelling bee to help track words, solve and maintain hints

## Features
### Word list
Each user has their own word list that they maintain for common spelling bee words. The word list can be fully shown, partially shown (by first letter count), or hint only. Users have the ability to write their own hints or generate one for their word using ChatGPT.

### Spelling bee solver
Users can opt to solve the puzzle by displaying matching words from a word list. Valid words are contained within words.txt in the backend and taken from https://github.com/dwyl/english-words.

## Initialization
1. Before getting started, sign up for an OPEN AI account and set the key in environment variables.
Follow guide to create an OPEN AI key: https://medium.com/@lorenzozar/how-to-get-your-own-openai-api-key-f4d44e60c327

2. Replace database url in server.js with your own MongoDB url.

To run backend locally:
```
cd .\backend\
npm start
```

To run frontend locally:
```
cd .\frontend\
npm start
```