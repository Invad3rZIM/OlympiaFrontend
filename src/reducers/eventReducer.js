const eventReducer = (state={allEvents : [], myEvents : []}, action) => {
    switch(action.type) {
        case "ATTEMPT_CREATE_EVENT" : {
            state = {...state, username: action.payload.username, firstname: action.payload.firstname, lastname: action.payload.lastname, password: action.payload.password, key : action.payload.key, usertype:action.payload.usertype}
            break;
        }
        case "ALL_EVENT_LIST" : {
            state = {...state, allEvents : action.payload.allEvents}
            break;
        } 
        case "MY_EVENT_LIST" : {
            state = {...state, myEvents : action.payload.myEvents}
            break;
        }
        case "LOGIN" : {
            state = {...state, myEvents : []}
            break;
        }
    }
    return state;
};

export default eventReducer;