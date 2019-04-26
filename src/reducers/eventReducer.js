const eventReducer = (state={allEvents : []}, action) => {
    switch(action.type) {
        case "ATTEMPT_CREATE_EVENT" : {
            state = {...state, username: action.payload.username, firstname: action.payload.firstname, lastname: action.payload.lastname, password: action.payload.password, key : action.payload.key, usertype:action.payload.usertype}
        
        break;
        }

        case "ALL_EVENT_LIST" : {
            state = {...state, allEvents : action.payload.allEvents}
        }

    }
    return state;
};

export default eventReducer;