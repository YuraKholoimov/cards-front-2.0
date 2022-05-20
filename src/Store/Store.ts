import {combineReducers, createStore } from "redux";
import {AppReducer} from "../App/AppReducer";

const rootReducer = combineReducers({
    app: AppReducer
})

export const store = createStore(rootReducer)