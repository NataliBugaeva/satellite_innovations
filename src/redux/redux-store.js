import {combineReducers, createStore} from "redux";
import mainReducer from "./main-reducer";

let reducers = combineReducers({
    mainPage: mainReducer
});

let store = createStore(reducers);
window.store = store;

export default store;
