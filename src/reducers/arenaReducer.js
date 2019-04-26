const arenaReducer = (state={allArenas : []}, action) => {
    switch(action.type) {
        
        case "ALL_ARENA_LIST" : {
            state = {...state, allArenas : action.payload.allArenas}
        }

    }
    return state;
};

export default arenaReducer;