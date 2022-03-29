const initialState = {
    logInSuccess: null,
    logInError: null,
    signUpSuccess: null,
    signUpError: null,
    uid: null
}


const AuthReducer = (state=initialState, action) => {
    
    switch(action.type){
        case 'ADD_USER':
            console.log("User is added successfully", action.data)
            return {
                ...state,
                signUpSuccess: 'User Added Successfully',
                signUpError: null
            }
            break;
        case 'ADD_USER_ERROR':
            console.log("Error occurred while adding user", action.err)
            return {
                ...state,
                signUpSuccess: null,
                signUpError: "SignUp Failed"
            }
            break;
        case 'LOGIN_ERROR':
            console.log("Login Failed")
            return {
                ...state,
                logInSuccess: null,
                logInError: 'Login Failed'
            } 
            break;     
        case 'LOGIN_SUCCESS':
            console.log(action.uid);
            return {
                ...state,
                logInSuccess: "Logged in Successfully!",
                logInError: null,
                uid: action.uid,
            }
            break;
        case 'LOGOUT_SUCCESS':
            console.log("Sign out success")
            return {
                ...state,
                uid: null
            }
            break; 
        default:
            return state;
    }
}

export default AuthReducer;