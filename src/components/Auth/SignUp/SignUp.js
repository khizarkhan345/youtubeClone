import { React, useState } from "react";
import { Signup } from "../../../Action/AuthActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import './SignUp.css';
import { propTypes } from "react-video-thumbnail";
const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    if(firstName === '' || lastName === '' || email == '' || password === ''){
       setError("Some input fields are missing!")
    }else{
           
      const data = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password
      }
  
      props.Signup(data);
      setAuthError(props.signUpError);
      console.log("Sign Up is clicked");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }

    setTimeout(() => {
      setError("")
      setAuthError("");
      navigate("/");
    }, 1000);
   
  };
  return (
    <div className="signUp">
      <div className="input">
        <input
          type="text"
          name="Firstname"
          placeholder="FirstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>

      <div className="input">
        <input
          type="text"
          name="Lastname"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>

      <div className="input">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="input">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="input">
        <button onClick={onSubmitHandler}>Sign Up</button>
        
      </div>
      {
        error ? <p className='Input_error'>{error}</p>:''
      }
      {
        authError ? <p className='Auth_error'>{authError}</p>:''
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    signUpError: state.Auth.signUpError
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Signup: (data) => dispatch(Signup(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
