import React, {useRef} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import "./header.css"
function Navbar() {
    const navRef = useRef();

    // Mit showNavbar wird die responsive Navbar realisiert
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }
    return (
        <header>
            <h3>LOGO</h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">Merkzettel</a>
                <a href="/#">Sperrliste</a>
                <a href="/#">Profil</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
    )
}

export default Navbar;