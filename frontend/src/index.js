//index.js - Serves as the entry point for your React application

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Your main application component
import './index.css'; // Import your global styles

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);