import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import userEventsReducer from './user-events';
import recorderReducer from './recorder';
import middleware from "./middleware";

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer
});

//Return type demands a function to extract the return type!
export type RootState = ReturnType<typeof rootReducer>;


const store = createStore(rootReducer, middleware);

export default store;
