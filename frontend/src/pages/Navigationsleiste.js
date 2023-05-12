import React from "react";
import "./Navigationsleiste.css"
import { Link, useMatch, useResolvedPath} from "react-router-dom"

/** Das ist ein neuer Versuch für eine fuktionierende NaVbar */
export default function Navigationsleiste() {

    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Site Name
            </Link>
        <ul>
            <CustomLink to="/Merkliste">Merkliste</CustomLink>
            <CustomLink to="/src/pages/Sperrliste">Sperrliste</CustomLink>
            <CustomLink to="/Onboarding">Onboarding</CustomLink>
        </ul>
    </nav>
    )
}

//Man überprüft, auf welcher Seite man im href im <a/> ist
//mit useResolvedPath wird der relative Pfad von der aktuellen Seite erzeigt
function CustomLink({ to, children , ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    //mit der oberen const wird in className überprüft, auf welcher Unterseite man aktiv ist
    return(
        <li className={isActive ? "active": ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}