import { React, useState } from "react";
import { connect } from "react-redux";
import { FaYoutube } from "react-icons/fa";
import {
  MdSearch,
  MdVideoCall,
  MdViewComfy,
  MdSettingsVoice,
} from "react-icons/md";
import { AiTwotoneBell } from "react-icons/ai";
import "./Header.css";
import PopUp from "../PopUpArea/PopUp";
import { setTextFilter } from "../../Action/FilterActions";

const Header = (props) => {
  const [text, setText] = useState("");
  const [popUp, setPopUp] = useState(false);

  const onSearchClickHandler = () => {
    props.dispatch(setTextFilter(text));
  };

  const buttonHandler = () => {
    setPopUp(!popUp);
  };
  return (
    <div>
      <div className="HeaderArea">
        <header className="header">
          <FaYoutube color="red" fontSize="3rem" />
          <div className="youtube">
            <b>YouTube</b>
          </div>
        </header>
        <div className="Search">
          <input
            type="input"
            placeholder="Search"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="search">
            <button onClick={onSearchClickHandler}>
              <MdSearch fontSize="2rem" />
            </button>
          </div>
          <div className="Voice">
            <MdSettingsVoice fontSize="2.5rem" />
          </div>
        </div>
        <div className="icons">
          <div className="icon">
            <MdVideoCall fontSize="2.5rem" />
          </div>
          <div className="icon">
            <MdViewComfy fontSize="2.5rem" />
          </div>
          <div className="icon">
            <AiTwotoneBell fontSize="2.5rem" />
          </div>
          <div className="icon">
            <button className="Icon_button" onClick={buttonHandler}>
              K
            </button>
          </div>
        </div>
        <div className="PopUP">{popUp && <PopUp />}</div>
      </div>
    </div>
  );
};

const PropsToState = (state) => ({
  text: state.text,
});

export default connect(PropsToState)(Header);
