import React from "react";

const About = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <h2 className="text-center">About Spelling Bee Helper</h2>
                <p>
                    Speeling Bee Helper is a web application designed to assist users in
                    solving the New York Times spelling bee game. It provides a user inputted
                    word list allowing users to find words that can be formed with today's letters.
                    The application also includes a word list feature, where users can create and
                    manage their own hints.
                </p>
                <p>This app was created by Christopher Wu</p>
            </div>
        </div>
    );
};

export default About;