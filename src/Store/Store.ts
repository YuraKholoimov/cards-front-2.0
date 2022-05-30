import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {AppReducer} from "../App/AppReducer";
import {profilePageReducer} from "../Components/Pages/Profile/profilePageReducer";

const rootReducer = combineReducers({
    app: AppReducer,
    profilePage: profilePageReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootReducer = ReturnType<typeof rootReducer>