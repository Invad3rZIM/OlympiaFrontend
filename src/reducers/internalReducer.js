const internalReducer = (state={createAccountOptions:"",searchEvent:"", searchAthlete:"", selectArena :""}, action) => {
    switch(action.type) {
        
        case "SELECT_CREATE_USER" : {
            state = {...state, createAccountOptions : action.payload.selection}
            break
        }

        case "SELECT_ARENA" : {
            state = {...state, selectArena : action.payload.selection}
            break
        }

        case "SEARCH_ATHLETE" : {
            state = {...state, searchAthlete : action.payload.selection}
            break
        }


        case "SEARCH_EVENT" : {
            state = {...state, searchEvent : action.payload.selection}
            break
        }

    }
    return state;
};

export default internalReducer;