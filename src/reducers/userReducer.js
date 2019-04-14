const userReducer = (state={username:"X", firstName : "", lastName: "", password:"Y", key:0, userType:""}, action) => {
    switch(action.type) {
        case "ATTEMPT_LOGIN" : {
            state = {...state, username: action.payload.username, firstName: action.payload.firstName, lastName: action.payload.lastName, password: action.payload.password, key : action.payload.key, userType:action.payload.userType}
        
        break;
        }
        case "CREATE_USER" : {
            state = {...state, username: action.payload.username, firstName: action.payload.firstName, lastName: action.payload.lastName, password: action.payload.password, key : action.payload.key, userType:action.payload.userType}
        
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