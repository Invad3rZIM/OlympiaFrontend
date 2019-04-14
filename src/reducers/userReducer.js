const userReducer = (state={username:"X", password:"Y", key:0, userType:""}, action) => {
    switch(action.type) {
        case "ATTEMPT_LOGIN" : {
            state = {...state, username: action.payload.username, password: action.payload.password, key : action.payload.key, userType:action.payload.userType}
        
        break;
        }
        case "LOGOUT" : {
            state = {...state, password: "", username: "", key:0, userType:""}
            break;
        } 
    }
    return state;
};

export default userReducer;