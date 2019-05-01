const internalReducer = (state={createAccountOptions:"",searchEvent:"", searchAthlete:"", selectArena :"", selectSex:"", selectInches:"", selectFeet:"s"}, action) => {
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

        case "SELECT_SEX" : {
            state = {...state, selectSex : action.payload.selection}
            break
        }
        case "SELECT_INCHES" : {
            state = {...state, selectInches : action.payload.selection}
            break
        } 
        case "SELECT_FEET" : {
            state = {...state, selectFeet : action.payload.selection}
        }

    }
    return state;
};

export default internalReducer;