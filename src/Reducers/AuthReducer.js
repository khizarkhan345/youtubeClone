const initialState = {
  logInSuccess: null,
  logInError: null,
  signUpSuccess: null,
  signUpError: null,
  uid: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      console.log("User is added successfully", action.data);
      return {
        logInSuccess: null,
        logInError: null,
        signUpError: null,
        signUpSuccess: "User added successfully",
        uid: null,
      };
      
    case "ADD_USER_ERROR":
      console.log("Error occurred while adding user", action.err);
      return {
        logInSuccess: null,
        logInError: null,
        signUpSuccess: null,
        signUpError: "SignUp Failed",
        uid: null,
      };
    
    case "LOGIN_ERROR":
      console.log("Login Failed");
      return {
        logInSuccess: null,
        logInError: "Login Failed",
        signUpSuccess: null,
        signUpError: null,
        uid: null,
      };
    case "LOGIN_SUCCESS":
      console.log(action.uid);
      return {
        logInError: null,
        logInSuccess: "Logged in Successfully!",
        signUpSuccess: null,
        signUpError: null,
        uid: action.uid,
      };
    case "LOGOUT_SUCCESS":
      console.log("Sign out success");
      return {
        logInSuccess: null,
        logInError: null,
        signUpSuccess: null,
        signUpError: null,
        uid: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
