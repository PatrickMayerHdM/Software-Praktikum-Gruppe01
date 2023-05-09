import React, {useRef} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import "./header.css"
/** Hier ist die Navbar, die auf jeder Seite zu sehen ist.
 * Mit ihr kann man auf die verschiedenen Unterseiten navigieren*/
function Navbar() {
    const navRef = useRef();

    // Mit showNavbar wird die responsive Navbar realisiert
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }
    /** Eigentliche Struktur der Navigationsleiste*/
    return (
        <header>
            <h3>LOGO</h3>
            <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/Users/oresttkach/PycharmProjects/Software-Praktikum-Gruppe01/frontend/src/pages/Merkliste">Merkzettel</a>
                <a href="/Users/oresttkach/PycharmProjects/Software-Praktikum-Gruppe01/frontend/src/pages/Sperrliste">Sperrliste</a>
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