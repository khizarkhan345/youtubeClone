import VideoData from "./VideoData";
import FilterSearch from "./FilterSearch";
import AuthReducer from "./AuthReducer";
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
const RootReducer = combineReducers({
    Auth: AuthReducer,
    VideoData: VideoData,
    FilterSearch: FilterSearch,
    firebase: firebaseReducer
});

export default RootReducer;