const redirect = (state={page:"LOGIN"}, action) => {
    switch(action.type) {
        case "CREATE_USER" : {
            state = {...state, page: "CREATE_USER"}
            break;
        }
        case "LOGIN" : {
            state = {...state, page: "LOGIN"}
            break;
        }
        case "DASHBOARD" : {
            state = {...state, page: "DASHBOARD"}
            break;
        } case "CREATE_ARENA" : {
            state = {...state, page: "CREATE_ARENA"}
            break;
        } case "CREATE_EVENT" : {
            state = {...state, page: "CREATE_EVENT"}
            break;
        }
    }
    return state;
}

export default redirect;