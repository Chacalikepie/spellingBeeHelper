import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { TableHeader } from './BeeHelperElements.js';

function SpellingBeeSolver({letters, centerLetter, showAnswers}) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        if (letters && centerLetter) {
            axios.post('http://127.0.0.1:3001/solveSpellingBee', {letters: letters.toUpperCase(), centerLetter: centerLetter.toUpperCase()})
                .then(result => {
                    // Sort the words by alphabetical order
                    setWords(result.data)
                })
                .catch(err => console.log(err))
        }
    }, [letters, centerLetter, showAnswers]);

    return (
        <div className="d-sm-flex mt-5 flex-column justify-content-center">
            <p className="text-center">
                Note: Words are taken from https://github.com/dwyl/english-words.
            </p>
            <h2 className="text-center">Answers</h2>
            <div className="table-responsive" style={{ display: "flex", justifyContent: "center" }}>
                <table className="table table-bordered" style={{ width: '40%' }}>
                    <thead className="table-primary">
                        <TableHeader>Word</TableHeader>
                    </thead>
                    {Array.isArray(words) ? (
                        <tbody>
                            {words.map((word) => (
                                <tr>
                                    <td className="text-center">{word}</td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4">Loading words...</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )

}

export default SpellingBeeSolver;