import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdVideoLibrary, MdExplore } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { Signout } from "../../Action/AuthActions";
import { connect } from "react-redux";
import "./SideBar.css";

const SideBar = (props) => {
  const { uid } = props;

  const Links = uid ? (
    ""
  ) : (
    <div className="Quick_icons">
      <RiLoginCircleFill fontSize="2rem" />
      <NavLink className="link_class" to="/signin" activeClassName="is-active">
        Sign In
      </NavLink>
    </div>
  );

  const SignUpLinks = uid ? (
    ""
  ) : (
    <div className="Quick_icons">
      <IoPersonAdd fontSize="2rem" />
      <NavLink className="link_class" to="/signup" activeClassName="is-active">
        Sign Up
      </NavLink>
    </div>
  );
  const UploadLinks = uid ? (
    <li className="navigation">
      <div className="Quick_icons">
        <MdVideoLibrary fontSize="2rem" />
        <NavLink
          className="link_class"
          to="/uploadVideo"
          activeClassName="is-active"
        >
          Upload
        </NavLink>
      </div>
    </li>
  ) : (
    ""
  );

  return (
    <ul className="Header">
      <li className="navigation">
        <button className="button">&#9776;</button>
      </li>
      <li className="navigation">
        <div className="Quick_icons">
          <MdHome fontSize="2rem" href="/" />
          <NavLink className="link_class" to="/" activeClassName="is-active">
            Home
          </NavLink>
        </div>
      </li>
      {UploadLinks}
      <li className="navigation">
        <div className="Quick_icons">
          <MdExplore fontSize="2rem" />
          <NavLink
            className="link_class"
            to="/explore"
            activeClassName="is-active"
          >
            Explore
          </NavLink>
        </div>
      </li>
      <li className="navigation">{Links}</li>
      <li className="navigation">{SignUpLinks}</li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    uid: state.Auth.uid,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Signout: () => {
      dispatch(Signout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
