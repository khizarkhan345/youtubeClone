import {createStore, combineReducers} from 'redux';
import VideoData from '../Reducers/VideoData';
import filterReducers from '../Reducers/FilterSearch';

export default () => {
    const store = createStore(
         filterReducers
    );

    return store;
}