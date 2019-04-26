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
    }
    return state;
}

export default errors;