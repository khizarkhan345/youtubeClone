import React from "react";
import {FaYoutube} from 'react-icons/fa';
import {MdSearch, MdVideoCall, MdViewComfy, MdSettingsVoice} from 'react-icons/md';
import {AiTwotoneBell} from 'react-icons/ai';
import './Header.css';

const Header = () => (

        <div className="HeaderArea">
             <header className="header">
                <FaYoutube color="red" fontSize="3rem"/>
                <div className="youtube"><b>YouTube</b></div>
             </header>
             <div className="Search">
              <input type="input" placeholder="Search" />
              <div className="search">
                <MdSearch fontSize="2rem"/>
              </div>
              <div className="Voice">
                <MdSettingsVoice fontSize="2.5rem"/>
              </div>
              
             </div>
             <div className="icons">
               <div className="icon"><MdVideoCall  fontSize="2.5rem"/></div>
               <div className="icon"><MdViewComfy fontSize="2.5rem"/></div>
               <div className="icon"><AiTwotoneBell fontSize="2.5rem"/></div>
               <div className="icon" style={{fontSize: "12px"}}><b>K</b></div>
             </div>
        
        </div>
        
    
)

export default Header;