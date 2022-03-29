import {React, useState } from 'react';
import { Signin } from '../../../Action/AuthActions';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import './SignIn.css';

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
       
        if(email === '' || password === ''){
           setError("No Email or Password is Entered.")
        }else{
          const credentials = {
            email: email,
            password: password
          }
   
           props.Signin(credentials);
           console.log("LogIn is clicked");
           setAuthSuccess(props.logInSuccess);
           setAuthError(props.logInError);
           setEmail("");
           setPassword("");
        }
      setTimeout(()=> {
        setError("");
        setAuthSuccess("");
        setAuthError("");
        navigate("/");
      }, 1000)
    }
    return (
       <div className='signIn'>
        
        <div className='input'>
        
        <input type="email" name="email" value={email} placeholder="Email" 
        onChange={(e) => {setEmail(e.target.value)}}
        />
        </div>
         
        <div className='input'>
        
        <input type="password" name="password" value={password} placeholder="Password"
        onChange={(e) => {setPassword(e.target.value)}}
        />
        </div>
         
        <div className='input'>
        <button onClick={onSubmitHandler}>LogIn</button>
        
        </div>
        {
          error ? <p className='Input_error'>{error}</p>:''
        }
        {
          authError ? <p className='Auth_error'>{authError}</p>:<p className='Auth_success'>{authSuccess}</p>
        }
      </div>
    )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    logInSuccess: state.Auth.logInSuccess,
    logInError: state.Auth.logInError
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Signin: (credentials) => dispatch(Signin(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);