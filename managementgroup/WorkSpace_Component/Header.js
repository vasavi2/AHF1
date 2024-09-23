import React from "react";
import {   FaSearch, FaBell } from "react-icons/fa";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import HomeIcon from '@mui/icons-material/Home';

import profile from "../Dashboard_Component/profile.png"
var date = new Date().toDateString();
export const Header = () => (
  <div className="flex-header-containers">
    <div className="flex-header-date">
      <a href="/dashboard">
              
              <button style={{cursor:"pointer"}}>
              <HomeIcon/>
              </button>.
            </a>
    </div>
    <div className="flex-header-icons">
    <b>{date}</b>

      {/* <div className="flex-header-search">
        <FaSearch   />
      </div>
      <div className="flex-header-notification">
        <FaBell   />
      </div>
      <div className="flex-header-profile">
        <img src={profile} width='25px' height='25px' alt="profile"/>
      </div> */}
    </div>
  </div>

 
);
export default Header;
