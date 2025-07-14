import React, { useEffect, useState } from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navBarElements";
import { Navigate } from 'react-router-dom';

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {

    const signOut = () => {
        // Clear the user from local storage
        localStorage.clear();
        setIsLoggedIn(false);
    }

    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/Home" >
                        Bee Helper
                    </NavLink>
                    <NavLink to="/WordList" activeStyle>
                        Word List
                    </NavLink>
                    <NavLink to="/About" activeStyle>
                        About
                    </NavLink>
                </NavMenu>
                {isLoggedIn ? (
                    <NavBtn>
                        <NavBtnLink to="/" onClick={signOut}>
                            Sign Out
                        </NavBtnLink>
                    </NavBtn> 
                ) : (
                    <NavBtn>
                        <NavBtnLink to="/">
                            Sign In
                        </NavBtnLink>
                    </NavBtn>
                )}          
            </Nav>
        </>
    );
};

export default Navbar;