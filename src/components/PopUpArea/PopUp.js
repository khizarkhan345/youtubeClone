import React from "react";
import { connect } from "react-redux";
import { Signout } from "../../Action/AuthActions";
import "./PopUp.css";

const PopUp = (props) => {
  return (
    <div className="Popup">
      <button onClick={props.Signout} disabled={!props.uid}>
        LogOut
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
