import {Component} from "react";

/** Definition der Footer-Komponente */
class Footer extends Component {
    /** Der Code rendert einen Footer-Bereich mit einem Link zur Seite "/AboutUs" und dem Text "Über uns". */
    render() {
        return (
            <footer className="footer">
                <a className="footer_text" href="/AboutUs">Über uns</a>
            </footer>
        );
    }
}
export default Footer;