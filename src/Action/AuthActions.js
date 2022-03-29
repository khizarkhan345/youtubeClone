import {
  getDatabase,
  ref as DatabaseRef,
  push,
  onValue,
  set
} from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../components/Firebase";
import { getFirebase } from "react-redux-firebase";

export const Signup = (data) => {
  return (dispatch, getState) => {
    const Auth = getAuth(app);
    createUserWithEmailAndPassword(Auth, data.Email, data.Password)
    .then((resp) => {
      
      const uid = resp.user.auth.currentUser.uid
      console.log(uid);
    // const db = getDatabase(app);
    // push(DatabaseRef(db, "Users/"), {
    //   FirstName: data.FirstName,
    //   LastNAme: data.LastName,
    // })
    const db = getDatabase(app);
  set(DatabaseRef(db, 'Users/' + uid), {
    FirstName: data.FirstName,
    LastName: data.LastName,
    Email: data.Email
  });
    })
      .then((result) => {
        // setUploadStatus(" Video Uploaded successfully")
        dispatch({ type: "ADD_USER", data });
      })
      .catch((err) => {
        dispatch({ type: "ADD_USER_ERROR", err});
        //setUploadStatus("Error occurred while uploading Video")
        //console.log(err, "Error occurred while uploading data");
      });
  };
};

export const Signin = (credentials) => {
  return (dispatch) => {
    //const db = getFirebase(app)
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        console.log("Sign in success");
        console.log(userCredential);
        const uid = userCredential.user.uid
        const user = userCredential.user;
        dispatch({ type: "LOGIN_SUCCESS", uid});
        // ...
      })
      .catch((error) => {
        console.log("error occurred while logging in")
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error)
        dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};

export const Signout = () => {
    return (dispatch) => {
        console.log("signout action is called")
        const auth = getAuth(app);
        signOut(auth)
        .then((user) => {
        
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //const uid = user.uid;
            // ...  
           console.log("User sign out")
            dispatch({type: 'LOGOUT_SUCCESS'})
    }).catch((err) => {
        console.log(err)
    })
}
}  