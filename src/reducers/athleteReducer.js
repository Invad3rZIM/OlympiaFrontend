const athleteReducer = (state={allAthletes : []}, action) => {
    switch(action.type) {
        
        case "ALL_ATHLETE_LIST" : {
            state = {...state, allAthletes : action.payload.allAthletes}
        }

    }
    return state;
};

export default athleteReducer;