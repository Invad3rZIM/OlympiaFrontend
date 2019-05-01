const errors = (state={error:""}, action) => {
    switch(action.type) {
        case "USER_TAKEN" : {
            state = {...state, error: "USER_TAKEN"}
            break;
        }
        case "CLEAR" : {
            state = {...state, error:""}
            break
        }

        case "CREATE_ARENA_SUCCESS" : {
            state = {...state, error : "success"}
        }
        case "DIFFERENT_PASSWORDS" : {
            state = {...state, error: "DIFFERENT_PASSWORDS"}
            break;
        }
        case "INVALID_LOGIN" : {
            state = {...state, error: "INVALID_LOGIN"}
            break;
        }
       
    }
    return state;
}

export default errors;