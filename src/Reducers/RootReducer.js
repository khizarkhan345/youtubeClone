import DataReducer from "./DataReducer";
import FilterReducer from "./FilterReducer";
import AuthReducer from "./AuthReducer";
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
const RootReducer = combineReducers({
    Auth: AuthReducer,
    VideoData: DataReducer,
    FilterSearch: FilterReducer,
    firebase: firebaseReducer
});

export default RootReducer;