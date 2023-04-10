const initialState = {
    news: []
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHED_NEWS":
            return {...state, news: action.payload.news_list}
        default: return state
    }
}

export default newsReducer

