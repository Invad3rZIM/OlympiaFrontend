import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mux from './Mux';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from "redux-logger"
import thunk from "redux-thunk"
import axios from 'axios';

/*const error = (store) => (next) => (action) => {
    try {
        next(action);
    } catch(e) {
        console.log("AHHH", e);
    }
}

const middleware = applyMiddleware(logger, thunk, error);
const store = createStore(reducers, {}, middleware);


store.subscribe(() => {
    console.log("store changed ", store.getState())
})

store.dispatch((dispatch) => {
    dispatch({type: "CHANGE_USER", payload: "XXXTENTACION"})
    axios.get("http://rest.learncode.academy/api/kirk/users").then((response) => {
      
    dispatch({type: "CHANGE_PASS", payload: "died in vain"})  
    }).catch((err) => {
        console.log("Testing")
    })
})*/
import store from "./store"
import {Provider} from 'react-redux';
import {login} from './actions/userActions'


ReactDOM.render(<Provider store={store}>
        <Mux />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
