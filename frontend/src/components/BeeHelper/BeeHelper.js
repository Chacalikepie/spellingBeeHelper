import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { HexagonContainer, HexagonInput, Button, SmallButton } from './BeeHelperElements.js';
import SpellingBeeSolver from "./SpellingBeeSolver.js";
import HintsTable from "../Hints/HintsTable.js";
import HelperWordTable from "../Words/HelperWordTable.js";

function BeeHelper() {
    const [wordList, setWordList] = useState([]);
    const [letterList, setLetterList] = useState(["", "", "", "", "", "", ""]); // Store letters in an array where the last element is the center letter
    const [showWords, setShowWords] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);

    const [user, setUser] = useState(null);

    // Retrieve user and letters from local storage
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            console.log("User found in local storage:", savedUser);
            setUser(savedUser);
        }

        const savedLetters = sessionStorage.getItem("savedLetters");
        console.log("Saved letters from session storage:", savedLetters);
        if (savedLetters) {
            // Expecting savedLetters to be something like "A,B,C,D,E,F,G"
            const lettersArray = savedLetters.split(',').map(letter => letter.trim().toUpperCase());
            // Replace any , with empty string
            for (let i = 0; i < lettersArray.length; i++) {
                if (lettersArray[i] === ',') {
                    lettersArray[i] = "";
                }
            }
            setLetterList(lettersArray);
        }
    }, []);

    useEffect(() => {
        // Find words when the letterList is completely filled
        if (letterList.every(letter => letter !== "")) {
            const letters = letterList.join("");
            const centerLetter = letterList[6]; // The last letter in the list is the center letter
            sessionStorage.setItem("savedLetters", letterList);
            console.log("Finding words with letters:", letters, " and center letter:", centerLetter);

            axios.post('http://127.0.0.1:3001/findWords', {userId: user, letters: letters})
                .then(result => {
                    // Only display words that contain the center letter
                    const filteredWords = result.data.filter(word => word.word.includes(centerLetter));
                    const sortedWords = filteredWords.sort((a, b) => a.word.localeCompare(b.word));
                    setWordList(sortedWords)
                })
                .catch(err => console.log(err))
        }
    }, [letterList, user]);

    // Show words when the user clicks the button
    const handleShowWords = () => {
        if (letterList.every(letter => letter !== "")) {
            setShowWords(true);
            setShowHints(false);
            setShowAnswers(false);
        } else {
            alert("Please fill in all letters before finding words.");
        }
    }

    // Show hints when the user clicks the button
    const handleShowHints = () => {
        if (letterList.every(letter => letter !== "")) {
            setShowWords(false);
            setShowHints(true);
            setShowAnswers(false);
        } else {
            alert("Please fill in all letters before showing hints.");
        }
    }

    // Show answers when the user clicks the button
    const handleShowAnswers = () => {
        if (letterList.every(letter => letter !== "")) {
            setShowWords(false);
            setShowHints(false);
            setShowAnswers(true);
        } else {
            alert("Please fill in all letters before showing answers.");
        }
    }

    const handleLetterChange = (index, setLetterList) => (e) => {
        const val = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 1);
        setLetterList(prev => {
            const updated = [...prev];
            updated[index] = val;
            sessionStorage.setItem("savedLetters", updated);
            return updated;
        });
    };

    // Clear the letters
    const clearLetters = () => {
        setLetterList(["", "", "", "", "", "", ""]);
        sessionStorage.removeItem("savedLetters");
        setWordList([]);
    }

    if (!user) {
        return <div className="text-center mt-5">Please log in to use the Spelling Bee Helper.</div>;
    }
    return (
        <div className="container" >
            <div className="d-sm-flex mt-5 flex-column justify-content-center align-items-center">
                <h2 className="text-center">Enter today's spelling bee letters and select a helper</h2>
                <div className="relative mb-8" style={{ width: '340px', height: '340px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Center Hexagon */}
                    <HexagonContainer style={{ top: '105px', left: '120px' }}>
                        <HexagonInput type="text" maxlength={1} value={letterList[6]} onChange={handleLetterChange(6, setLetterList)} />
                    </HexagonContainer>

                    {/* Top Hexagon */}
                    <HexagonContainer style={{ top: '5px', left: '120px' }}>
                        <HexagonInput type="text" maxlength={1} value={letterList[1]} onChange={handleLetterChange(1, setLetterList)} />
                    </HexagonContainer>

                    {/* Top left Hexagon */}
                    <HexagonContainer style={{ top: '55px', left: '40px' }}>
                        <HexagonInput type="text" maxlength={1} value={letterList[0]} onChange={handleLetterChange(0, setLetterList)} />
                    </HexagonContainer>

                    {/* Top right Hexagon */}
                    <HexagonContainer style={{ top: '55px', left: '200px' }}>
                        <HexagonInput type="text" maxlength={1} value={letterList[2]} onChange={handleLetterChange(2, setLetterList)} />
                    </HexagonContainer>

                    {/* Bottom Hexagon */}
                    <HexagonContainer style={{ top: '205px', left: '120px' }}>
                        <HexagonInput type="text" maxlength={1} value={letterList[4]} onChange={handleLetterChange(4, setLetterList)} />
                    </HexagonContainer>

                    {/* Bottom left Hexagon */}
                    <HexagonContainer style={{ top: '155px', left: '40px' }}>
                        <HexagonInput type="text" maxlength={1} value={letterList[5]} onChange={handleLetterChange(5, setLetterList)} />
                    </HexagonContainer>

                    {/* Bottom right Hexagon */}
                    <HexagonContainer style={{ top: '155px', left: '200px' }}>
                        <HexagonInput type="text" maxlength={1} value={letterList[3]} onChange={handleLetterChange(3, setLetterList)} />
                    </HexagonContainer>

                </div>

                <div className="container d-flex flex-row justify-content-center mt-3" style={{ gap: "1rem" }}>
                    <Button class="btn btn-secondary" style={{ background: '#ac7f5d' }} onClick={clearLetters}>Clear Letters</Button>
                </div>

                <div className="container d-flex flex-row justify-content-center mt-3" style={{ gap: "1rem" }}>
                    {showWords ? (
                        <Button className="btn btn-secondary" onClick={() => setShowWords(false)}>Hide Your Words</Button>
                    ) : (
                        <Button className="btn btn-secondary" onClick={handleShowWords}>Show Your Words</Button>
                    )}

                    {showHints ? (
                        <Button className="btn btn-secondary" onClick={() => setShowHints(false)}>Hide Your Hints</Button>
                    ) : (
                        <Button className="btn btn-secondary" onClick={handleShowHints}>Show Your Hints</Button>
                    )}

                    {showAnswers ? (
                        <Button className="btn btn-secondary" onClick={() => setShowAnswers(false)}>Hide Answers</Button>
                    ) : (
                        <Button className="btn btn-secondary" onClick={handleShowAnswers}>Generate Answers</Button>
                    )}
                </div>

            </div>

            {showWords && (
                <HelperWordTable wordList={wordList} />
            )}

            {showHints && (
                <HintsTable wordList={wordList} showHints={showHints} />
            )}

            {showAnswers && (
                <SpellingBeeSolver
                    letters={letterList.join("")}
                    centerLetter={letterList[6]}
                    showAnswers={showAnswers}
                />
            )}
        
        </div>
    )
}
export default BeeHelper;