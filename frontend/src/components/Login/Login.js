import React, { useEffect, useState } from 'react';
import { LoginContainer, LoginCard, Button, SmallButton, Input, LoginCardContent } from './LoginElements.js';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
    // State variables
    const [savedUsers, setSavedUsers] = useState([{}]);
    const [user, setUser] = useState(null);
    const [signupForm, setSignupForm] = useState({ username: '', password: '' });
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [showSignup, setShowSignup] = useState(false);

    // Retrieve user from local storage
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            console.log("User found in local storage:", savedUser);
            setUser(savedUser);
        }
    }, []);

    // Load user from session or fetch users from the database
    useEffect(() => {
        axios.get('http://127.0.0.1:3001/getUsers')
            .then(result => {
                setSavedUsers(result.data);
            })
            .catch(err => console.log(err))
        // log out the saved users for debugging
        console.log('Saved users:', savedUsers);
    }, [])

    // User login function
    const doUserLogin = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const { username, password } = loginForm;
        const foundUser = savedUsers.find(user => user.username === username);

        if (foundUser) {
            if (foundUser.password === password) {
                setUser(username); // Set the current user to the logged-in user
                setLoginForm({ username: '', password: '' });
                localStorage.setItem('user', username); // Store the user in session storage
                setIsLoggedIn(true); // Update the login state
                return <Navigate to="/Home" replace={true} />;
            } else {
                alert('Incorrect password. Please try again.');
                return;
            }
        } else {
            alert('Invalid username or password. Please try again.');
            return;
        }
    };

    // Functions used by the screen components
    const doUserRegistration = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const { username, password } = signupForm;

        if (savedUsers.some(user => user.username === username)) {
            alert('Username already exists. Please choose a different username.');
            return;
        }

        // Create a new user object
        const newUser = {
            username: username,
            password: password,
            id: username, // Use username as ID for simplicity
        };

        // Send a POST request to add the new user to the database
        axios.post('http://127.0.0.1:3001/addUser', newUser)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));

        setUser(username); // Set the current user to the newly registered user
        setSignupForm({ username: '', password: '' }); // Clear the signup form
        setShowSignup(false); // Hide the signup form
        localStorage.setItem('user', username); // Store the user in session storage
        setIsLoggedIn(true); // Update the login state
        return <Navigate to="/Home" replace={true} />;
    };


    if (!user) {
        return (
            <LoginContainer>
                <LoginCard>
                    <h1>Welcome to Spelling Bee Helper</h1>
                    <p>Sign in to access your hive</p>

                    {!showSignup ? (
                        <LoginCardContent>
                            <h2>
                                Login
                            </h2>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={loginForm.username}
                                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Button onClick={doUserLogin}>
                                    Sign In
                                </Button>
                            </div>
                    
                            <SmallButton onClick={() => setShowSignup(true)}>
                                Don't have an account? Sign up
                            </SmallButton>
                        </LoginCardContent>
                    ) : (
                        <LoginCardContent>
                            <h2>
                                Sign Up
                            </h2>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={signupForm.username}
                                onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Password"
                                value={signupForm.password}
                                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                required
                            />
                            <Button onClick={doUserRegistration}>
                                Create Account
                            </Button>
                
                            <SmallButton onClick={() => setShowSignup(false)}>
                                Already have an account? Login
                            </SmallButton>
                        </LoginCardContent>
                    )}
                </LoginCard>
            </LoginContainer>
        );
    }
    return <Navigate to="/Home" replace={true} />; // Redirect to Home if user is logged in
};

export default Login;