// SoPra 2023 - Gruppe 1
import React, { Component } from "react";
import '../components/App.css';

/** Definition der AboutUs-Komponente */
class AboutUs extends Component {
    /** Rendern der Komponente */
    render() {
        {/** Der Code rendert eine Seite mit dem Titel "Über uns". */}
        return (
            <div>
                <h1>Über uns</h1>
                <h2>Software-Praktikum Gruppe 01 im SS23</h2>
                <h3>Anbei sind alle Teilnehmer verlinkt:</h3>
                <div>
                    <a className="authors" href="https://github.com/OrestTkach">Orest Tkach</a><br /><br />
                    <a className="authors" href="https://github.com/MichaelFezer">Michael Fezer</a><br /><br />
                    <a className="authors" href="https://github.com/PatrickMayerHdM">Patrick Mayer</a><br /><br />
                    <a className="authors" href="https://github.com/EfstratiosVassiliou">Efstratios Vassiliou</a><br /><br />
                    <a className="authors" href="https://github.com/DominikWunderlich">Dominik Wunderlich</a><br /><br />
                    <a className="authors" href="https://github.com/TaroNakajima">Taro Nakajima</a><br />
                </div>
            </div>
        );
    }
}
export default AboutUs;
