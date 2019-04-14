import {combineReducers } from "redux"

import user from "./userReducer"
import redirect from "./redirects"
import errors from "./errors"

export default combineReducers( {
    user,
    redirect,
    errors
})