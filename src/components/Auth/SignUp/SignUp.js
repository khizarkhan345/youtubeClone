import { React, useState } from "react";
import { Signup } from "../../../Action/AuthActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    if(firstName === '' || lastName === '' || email === '' || password === ''){
       setError("Some input fields are missing!")
    }else if(!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
       setError("Incorrect email format!")
    }else{
   
      const data = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password
      }
  
      props.Signup(data);
      setAuthSuccess(props.signUpSuccess);
      if(props.signUpSuccess){
        navigate("/");
      }else{
        setAuthError(props.signUpError)
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      
    }

    setTimeout(() => {
      setError("")
      setAuthError("");
    }, 4000);
   
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
        <p className='Auth_error'>{authError}</p>
      }
      {
        <p className='Auth_success'>{authSuccess}</p>
      } 
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    signUpSuccess: state.Auth.signUpSuccess,
    signUpError: state.Auth.signUpError
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Signup: (data) => dispatch(Signup(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
