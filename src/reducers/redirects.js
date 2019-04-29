const redirect = (state={page:"LOGIN"}, action) => {
    switch(action.type) {
        case "CREATE_USER" : {
            state = {...state, page: "CREATE_USER"}
            break;
        }
        case "LOGIN" : {
            state = {...state, page: "LOGIN"}
            break;
        }
        case "DASHBOARD" : {
            state = {...state, page: "DASHBOARD"}
            break;
        } case "CREATE_ARENA" : {
            state = {...state, page: "CREATE_ARENA"}
            break;
        } case "CREATE_EVENT" : {
            state = {...state, page: "CREATE_EVENT"}
            break;
        }

        case "SCHEDULE_SIGNING" : {
            state = {...state, page: "SCHEDULE_SIGNING"}
            break;
        } case "ATHLETE_COMPETITION" : {
            state = {...state, page: "ATHLETE_COMPETITION"}
            break;
        }

        case "ATHLETE_PURCHASE" : {
            state = {...state, page: "ATHLETE_PURCHASE"}
            break;

        } case "SET_BIO" : {
            state = {...state, page: "SET_BIO"}
            break;
        }

        case "MY_EVENTS" : {
            state = {...state, page: "MY_EVENTS"}
            break;
        }

    }
    return state;
}

export default redirect;