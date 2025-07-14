import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { TableHeader, SmallButton } from '../BeeHelper/BeeHelperElements.js';

const blankChar = ' _';

function HintsTable({wordList, showHints}) {
    const [wordsToDisplay, setWordsToDisplay] = useState([]);

    useEffect(() => {
        setWordsToDisplay(generateHiddenWords(wordList, 0));
    }, [wordList, showHints]);

    // Given an array of words, show up to the indexToShow and blanks after
    function generateHiddenWords(wordList, indexToShow) {
        // Return a new array, do not mutate the original
        return wordList.map(wordObj => {
            const word = wordObj.word || wordObj;
            // Show up to indexToShow letters, then blanks
            let shown = word.slice(0, indexToShow + 1);
            let blanks = blankChar.repeat(word.length - (indexToShow + 1));
            return shown + blanks;
        });
    }
    
    return (
        <div className="d-sm-flex mt-5 flex-column justify-content-center">
            <h2 className="text-center">Hints</h2>
            <div className="container d-flex flex-row justify-content-center mt-3" style={{ gap: "1rem", marginBottom: "20px" }}>
                <SmallButton className="btn btn-primary btn-sm" onClick={() => setWordsToDisplay(generateHiddenWords(wordList, 0))}>
                    1st letter
                </SmallButton>
                <SmallButton className="btn btn-primary btn-sm" onClick={() => setWordsToDisplay(generateHiddenWords(wordList, 1))}>
                    2nd letter
                </SmallButton>
                <SmallButton className="btn btn-primary btn-sm" onClick={() => setWordsToDisplay(generateHiddenWords(wordList, 2))}>
                    3rd letter
                </SmallButton>
            </div>
            <b></b>
            <div className="table-responsive" style={{ display: "flex", justifyContent: "center" }}>
                <table className="table table-bordered " style={{ width: '80%' }}>
                    <thead className="table-primary">
                        <TableHeader>Word</TableHeader>
                        <TableHeader>Hint</TableHeader>
                    </thead>
                    {Array.isArray(wordList) ? (
                        <tbody>
                            {wordList.map((data, index) => (
                                <tr key={data._id}>
                                    <td style={{ width: "30%", textAlign: "center" }}>
                                        {wordsToDisplay[index]}
                                    </td>
                                    <td>
                                        {data.hint}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4">Loading hints...</td>
                            </tr>
                        </tbody>
                    )}


                </table>
            </div>
        </div>
    )

}

export default HintsTable;