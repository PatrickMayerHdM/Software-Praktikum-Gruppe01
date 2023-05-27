import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BlockIcon from '@mui/icons-material/Block';
import {IconButton} from "@mui/material";
import { Link } from "react-router-dom";
import './Header.css';

class Header extends Component {
    constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const { user } = this.props;

    return (
        <div className="header">
            <Link to="/Profil">
                <IconButton>
                    <PersonIcon className="header_icon" />
                </IconButton>
            </Link>
            <Link to="/Suche">
                <IconButton>
                    <SearchIcon className="header_icon" />
                </IconButton>
            </Link>
            <Link to="/Merkliste">
                <IconButton>
                    <FormatListBulletedIcon className="header_icon" />
                </IconButton>
            </Link>
            <Link to="/Sperrliste">
                <IconButton>
                    <BlockIcon className="header_icon" />
                </IconButton>
            </Link>
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
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Header;