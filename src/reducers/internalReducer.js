const internalReducer = (state={createAccountOptions:""}, action) => {
    switch(action.type) {
        
        case "SELECT_CREATE_USER" : {
            state = {...state, createAccountOptions : action.payload.selection}
            break
        }

    }
    return state;
};

export default internalReducer;