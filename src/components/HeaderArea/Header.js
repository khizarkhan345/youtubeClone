import {React, useState } from "react";
import {connect} from 'react-redux';
import {FaYoutube} from 'react-icons/fa';
import {MdSearch, MdVideoCall, MdViewComfy, MdSettingsVoice} from 'react-icons/md';
import {AiTwotoneBell} from 'react-icons/ai';
import './Header.css';
import { setTextFilter } from "../../Action/FilterSearch";

const Header = (props) => {
  const [text, setText] = useState("");
  const onSearchClickHandler = ()=> {
       props.dispatch(setTextFilter(text));
      //  setText("");
  }
        return (
          <div className="HeaderArea">
             <header className="header">
                <FaYoutube color="red" fontSize="3rem"/>
                <div className="youtube"><b>YouTube</b></div>
             </header>
             <div className="Search">
              <input type="input" placeholder="Search" value={text} onChange={(e) => 
                {
                  setText(e.target.value);
                    //console.log(e.target.value)
                    //props.dispatch(setTextFilter(e.target.value));                  
                }}/>
              <div className="search">
                <button onClick={onSearchClickHandler}><MdSearch fontSize="2rem"/></button>
              </div>
              <div className="Voice">
                <MdSettingsVoice fontSize="2.5rem"/>
              </div>
             </div>
             <div className="icons">
               <div className="icon"><MdVideoCall  fontSize="2.5rem"/></div>
               <div className="icon"><MdViewComfy fontSize="2.5rem"/></div>
               <div className="icon"><AiTwotoneBell fontSize="2.5rem"/></div>
               <div className="icon"><b>K</b></div>
             </div>
        
        </div>
        )
}

const PropsToState = (state) => ({
      text: state.text
});

export default connect(PropsToState)(Header);
