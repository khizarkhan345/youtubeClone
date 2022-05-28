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
        }else if(!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
          setError("Incorrect email format!")
       }else{
          const credentials = {
            email: email,
            password: password
          }
   
           props.Signin(credentials);
           setAuthSuccess(props.logInSuccess);
           if(authSuccess){
              setAuthSuccess("");
              navigate("/");
           }else{
            setAuthError(props.logInError);
           }
           setEmail("");
           setPassword("");
        }
      setTimeout(()=> {
        setError("");
        setAuthSuccess("");
        setAuthError("");
      }, 1000)

      navigate("/");
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
          authSuccess ? <p className='Input_error'>{authSuccess}</p>:''
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
    logInError: state.Auth.logInError,
    uid: state.Auth.uid
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Signin: (credentials) => dispatch(Signin(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);