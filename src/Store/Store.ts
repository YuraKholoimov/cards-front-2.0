import {applyMiddleware, combineReducers, createStore } from "redux";
import {AppReducer} from "../App/AppReducer";
import thunk from "redux-thunk";
import {authReducer} from "./LoginReducer";
const rootReducer = combineReducers({
    app: AppReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootReducerType = ReturnType<typeof rootReducer>