const internalReducer = (state={createAccountOptions:"", searchAthlete:""}, action) => {
    switch(action.type) {
        
        case "SELECT_CREATE_USER" : {
            state = {...state, createAccountOptions : action.payload.selection}
            break
        }

        case "SEARCH_ATHLETE" : {
            state = {...state, searchAthlete : action.payload.selection}
            break
        }

    }
    return state;
};

export default internalReducer;