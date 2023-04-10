import { combineReducers } from 'redux'
import eventsReducer from './reducers/eventReducer';
import newsReducer from './reducers/newsReducer';

const rootReducer = combineReducers({
    events: eventsReducer,
    news: newsReducer
});

export default rootReducer;