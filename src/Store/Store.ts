import {combineReducers, createStore } from "redux";
import {AppReducer} from "../App/AppReducer";
import {profilePageReducer} from "../Components/Pages/Profile/profilePageReducer";

const rootReducer = combineReducers({
    app: AppReducer,
    profilePage: profilePageReducer
})

export const store = createStore(rootReducer)

export type AppRootReducer = ReturnType<typeof rootReducer>