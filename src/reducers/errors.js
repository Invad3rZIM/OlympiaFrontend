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
    }
    return state;
}

export default errors;