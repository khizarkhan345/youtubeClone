import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ConfigureStore from '../src/Store/ConfigureStore';
import RootReducer from './Reducers/RootReducer';
import {ReactReduxFirebaseProvider,  getFirebase, reactReduxFirebase, reduxFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import AppRoutes from './routes/appRoutes';
import { initializeApp } from 'firebase/app';
import {createStore, applyMiddleware, compose} from 'redux';
import app from './components/Firebase';


const rrfConfig = { Videos: 'Videos' }
const store = createStore(RootReducer, 
    applyMiddleware(thunk.withExtraArgument({getFirebase})),   
  );


  const rrfProps = {
    app,
    config: rrfConfig,
    dispatch: store.dispatch,
    // createFirestoreInstance // <- needed if using firestore
  }

const jsx = (
  <React.StrictMode>
  <Provider store={store}>
      <AppRoutes />  
  </Provider>
  </React.StrictMode>
)
ReactDOM.render(
 jsx,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
