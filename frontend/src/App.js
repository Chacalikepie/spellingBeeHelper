import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WordList from './components/Words/WordList';
import BeeHelper from './components/BeeHelper/BeeHelper';
import NavBar from './components/NavBar';
import About from './components/about';
import Login from './components/Login/Login';

function App() {
  // Check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const headStyle = {
    textAlign: "center",
    fontWeight: "bold",
  }
  return (
    <div>
      <h1 style={headStyle}>Spelling Bee Helper!! &#128029;</h1>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path='/Home' element={<BeeHelper />} />
            <Route path='/WordList' element={<WordList />} />
            <Route path='/About' element={<About />} />
            {/* Add more routes as needed */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;