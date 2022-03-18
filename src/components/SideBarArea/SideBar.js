import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { MdHome, MdVideoLibrary, MdOutlineExplore } from 'react-icons/md';
import { FaGripfire } from "react-icons/fa";
import { BsFillCollectionPlayFill } from 'react-icons/bs';


import './SideBar.css';

const SideBar = () => (

  (

    <header className="Header">
    <div className="navigation">
    <button className="button">
    &#9776;
   </button>
    </div>
      <div className="navigation">
        <div className="Quick_icons">
        <MdHome fontSize="2rem" />
        <NavLink to="/" activeClassName="is-active" style={{ textDecoration: "none", color: "black" }}>
          Home</NavLink>
        </div>

      </div>
      <div className="navigation">
          <div className="Quick_icons">
          <MdVideoLibrary fontSize="2rem" />
          <NavLink to="/uploadVideo" activeClassName="is-active" style={{ textDecoration: "none", color: "black" }}>
          Upload</NavLink>
        </div>
      </div>
      <div className="navigation">
        
          <div className="Quick_icons">
          <MdOutlineExplore fontSize="2rem"/>
          <NavLink to="/explore" activeClassName="is-active" style={{ textDecoration: "none", color: "black" }}>
          Explore</NavLink>
           </div>
        </div>
      <div className="navigation">
        
          <div className="Quick_icons">
          <BsFillCollectionPlayFill fontSize="2rem" />
          <NavLink to="/subscriptions" activeClassName="is-active" style={{ textDecoration: "none", color: "black" }}>
          Subscriptions</NavLink>
           </div>
          </div>
      <div className="navigation">
          <div className="Quick_icons">
          <MdVideoLibrary fontSize="2rem" />
          <NavLink to="/library" activeClassName="is-active" style={{ textDecoration: "none", color: "black" }}>
              Library</NavLink>
           </div>
      </div>
    </header>

  )
)

export default SideBar;