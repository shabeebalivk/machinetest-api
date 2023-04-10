const initialState = {
    events: []
}

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHED_EVENTS":
            return {...state, events: action.payload.event_list} 
        default: return state
    }
}

export default eventsReducer

