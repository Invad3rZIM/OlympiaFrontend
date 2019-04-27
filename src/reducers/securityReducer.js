const securityReducer = (state={allSecurity : []}, action) => {
    switch(action.type) {
        
        case "ALL_SECURITY_LIST" : {
            state = {...state, allSecurity : action.payload.allSecurity}
        }

    }
    return state;
};

export default securityReducer;