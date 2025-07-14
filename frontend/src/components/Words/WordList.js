import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Button, DeleteButton, Table, TableData, TableHeader } from "./WordElements";

function WordList() {
    const [wordList, setWordList] = useState([]);
    const [newWord, setNewWord] = useState("");
    const [newHint, setNewHint] = useState("");
    const [editableId, setEditableId] = useState(null);
    const [editedWord, setEditedWord] = useState("");
    const [editedHint, setEditedHint] = useState("");
    const currenTableDataate = new Date().toJSON().slice(0, 10).toString(); // Get current date in YYYY-MM-DD format

    const [user, setUser] = useState(null);

    // Retrieve user from local storage and fetch words from database
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            console.log("User found in local storage:", savedUser);
            setUser(savedUser);
        }

        axios.post('http://127.0.0.1:3001/getWords', {userId: savedUser})
            .then(result => {
                // Sort the words by alphabetical order
                const sortedWords = result.data.sort((a, b) => a.word.localeCompare(b.word));
                setWordList(sortedWords)
            })
            .catch(err => console.log(err))
    }, []);

    // Function to add word to the database
    const addWord = (e) => {
        e.preventDefault();
        if (!newWord) {
            alert("Word must be filled out.");
            return;
        }

        axios.post('http://127.0.0.1:3001/addWord', { word: newWord, hint: newHint, dateAdded: currenTableDataate, userId: user })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Delete word from database
    const deleteWord = (id) => {
        axios.delete('http://127.0.0.1:3001/deleteWord/' + id)
            .then(result => {
                console.log(result);
                window.location.reload();
            })
            .catch(err =>
                console.log(err)
            )
    }

    // Function to toggle the editable state for a specific row
    const toggleEditable = (id) => {
        const rowData = wordList.find((data) => data._id === id);
        if (rowData) {
            setEditableId(id);
            setEditedWord(rowData.word);
            setEditedHint(rowData.hint);
        } else {
            setEditableId(null);
            setEditedWord("");
            setEditedHint("");
        }
    };

    // Function to save edited data to the database
    const saveEditedWord = (id) => {
        const editedData = {
            word: editedWord,
            hint: editedHint,
            dateAdded: currenTableDataate,
            userId: user
        };

        // If the word is empty
        if (!editedWord) {
            alert("Word must be filled out.");
            return;
        }

        // Updating edited data to the database through updateById API
        axios.post('http://127.0.0.1:3001/updateWord/' + id, editedData)
            .then(result => {
                console.log(result);
                setEditableId(null);
                setEditedWord("");
                setEditedHint("");
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Function to get hint from ChatGPT
    const generateHint = (e) => {
        e.preventDefault();
        if (!newWord) {
            alert("Word must be filled out.");
            return;
        }

        axios.post('http://127.0.0.1:3001/generateHint/', {word: newWord})
            .then(result => {
                console.log("Generated hint: ", result);
                setNewHint(result);
            })
            .catch((err) => {
                console.log(err);
                setNewWord(newWord);
                setNewHint("ChatGPT Error")
            });
    }

    if (!user) {
        return <div className="text-center mt-5">Please log in to access your word list.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <h2 className="text-center">Word List</h2>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="table-primary">
                                <TableHeader>Word</TableHeader>
                                <TableHeader>Hint</TableHeader>
                                <TableHeader>DateAdded</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </thead>
                            {Array.isArray(wordList) ? (
                                <tbody>
                                    {wordList.map((data) => (
                                        <tr key={data._id}>
                                            <TableData>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedWord}
                                                        onChange={(e) => setEditedWord(e.target.value)}
                                                    />
                                                ) : (
                                                    data.word
                                                )}
                                            </TableData>
                                            <TableData>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedHint}
                                                        onChange={(e) => setEditedHint(e.target.value)}
                                                    />
                                                ) : (
                                                    data.hint
                                                )}
                                            </TableData>
                                            <TableData>
                                                {data.dateAdded}
                                            </TableData>

                                            <TableData>
                                                {editableId === data._id ? (
                                                    <Button onClick={() => saveEditedWord(data._id)}>
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button onClick={() => toggleEditable(data._id)}>
                                                        Edit
                                                    </Button>
                                                )}
                                                <DeleteButton onClick={() => deleteWord(data._id)}>
                                                    Delete
                                                </DeleteButton>
                                            </TableData>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <TableData colSpan="4">Loading words...</TableData>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
                <div className="col-md-5">
                    <h2 className="text-center">Add Word</h2>
                    <form className="bg-light p-4">
                        <div className="mb-3">
                            <label>Word</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Word"
                                onChange={(e) => setNewWord(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Hint</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Hint"
                                onChange={(e) => setNewHint(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>DateAdded</label>
                            <p>{currenTableDataate}</p>
                        </div>
                        <Button onClick={addWord} className="btn btn-success btn-sm">
                            Add Word
                        </Button>
                        <Button onClick={generateHint} className="btn btn-success btn-sm">
                            Generate Hint with ChatGPT
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default WordList;