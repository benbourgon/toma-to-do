// Header.js
import React from "react";
import { GiTomato } from "react-icons/gi"

const Header = () => {
    return (
        <header className="App-header">
                <div className="wrapper">
                    <h1 className="logo">
                        <GiTomato />
                        toma_to-do
                        <GiTomato />
                    </h1>
                </div>
        </header>
    )
}

export default Header;