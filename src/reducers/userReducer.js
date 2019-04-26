const userReducer = (state={username:"X", firstname : "", lastname: "", password:"Y", key:0, usertype:""}, action) => {
    switch(action.type) {
        case "ATTEMPT_LOGIN" : {
            state = {...state, username: action.payload.username, firstname: action.payload.firstname, lastname: action.payload.lastname, password: action.payload.password, key : action.payload.key, usertype:action.payload.usertype}
        
        break;
        }
        case "CREATE_USER" : {
            state = {...state, username: action.payload.username, firstname: action.payload.firstname, lastname: action.payload.lastname, password: action.payload.password, key : action.payload.key, usertype:action.payload.usertype}
        
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