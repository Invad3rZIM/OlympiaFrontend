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
        } 
    }
    return state;
}

export default redirect;