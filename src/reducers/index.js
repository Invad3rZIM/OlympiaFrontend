import {combineReducers } from "redux"

import user from "./userReducer"
import redirect from "./redirects"

export default combineReducers( {
    user,
    redirect
})