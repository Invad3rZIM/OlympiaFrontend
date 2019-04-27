import {combineReducers } from "redux"

import user from "./userReducer"
import redirect from "./redirects"
import errors from "./errors"
import arena from "./arenaReducer"
import event from "./eventReducer"
import security from "./securityReducer"
import athlete from "./athleteReducer"

export default combineReducers( {
    user,
    redirect,
    errors,
    arena,
    event,
    athlete,
    security
})