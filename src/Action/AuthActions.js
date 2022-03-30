import {
  getDatabase,
  ref as DatabaseRef,
  set,
} from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../components/Firebase";

export const Signup = (data) => {
  return (dispatch, getState) => {
    const Auth = getAuth(app);
    createUserWithEmailAndPassword(Auth, data.Email, data.Password)
      .then((resp) => {
        const uid = resp.user.auth.currentUser.uid;
        const db = getDatabase(app);
        set(DatabaseRef(db, "Users/" + uid), {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
        });
      })
      .then((result) => {
        dispatch({ type: "ADD_USER", data });
      })
      .catch((err) => {
        dispatch({ type: "ADD_USER_ERROR", err });
      });
  };
};

export const Signin = (credentials) => {
  return (dispatch) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        dispatch({ type: "LOGIN_SUCCESS", uid });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};

export const Signout = () => {
  return (dispatch) => {
    const auth = getAuth(app);
    signOut(auth)
      .then((user) => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
