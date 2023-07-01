import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BlockIcon from '@mui/icons-material/Block';
import {IconButton} from "@mui/material";
import { Link } from "react-router-dom";
import './App.css';

/** Definition der Header-Komponente */
class Header extends Component {
    /** alle Zustandsvariablen: */
    constructor(props) {
        super(props);
        this.state = {
            tabindex: 0
        };
    }
    /** Behandelt onChange-Ereignisse der Komponente Tabs */
    handleTabChange = (e, newIndex) => {
        this.setState({
            tabindex: newIndex
        })
    };
    /** Rendern der Komponente */
    render() {
        {/** Hier werden die aktuellen States gesetzt */}
        const { user } = this.props;

        return (
            <div className="header">
                {/** Button um auf sein eigenes Profil zu kommen */}
                <Link to={`/Profil/${this.props.user.uid}`}>
                    <IconButton>
                        <PersonIcon className="header_icon" />
                    </IconButton>
                </Link>
                {/** Button um auf die Suche zu kommen */}
                <Link to="/Suche">
                    <IconButton>
                        <SearchIcon className="header_icon" />
                    </IconButton>
                </Link>
                {/** Button um auf die Merkliste zu kommen */}
                <Link to="/Merkliste">
                    <IconButton>
                        <FormatListBulletedIcon className="header_icon" />
                    </IconButton>
                </Link>
                {/** Button um auf die Sperrliste zu kommen */}
                <Link to="/Sperrliste">
                    <IconButton>
                        <BlockIcon className="header_icon" />
                    </IconButton>
                </Link>
                {/** Button um auf seine Chats zu kommen */}
                <Link to="/Chats">
                    <IconButton>
                        <MailIcon className="header_icon" />
                    </IconButton>
                </Link>
            </div>
        )
    }
}
/** PropTypes */
Header.propTypes = {
  /** Der eingeloggte firesbase-Benutzer */
  user: PropTypes.object,
}
export default Header;