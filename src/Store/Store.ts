import {applyMiddleware, combineReducers, createStore } from "redux";
import {AppReducer} from "./AppReducer";
import thunk from "redux-thunk";
import {authReducer} from "./LoginReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AuthActionsType, registerReducer} from "./registerReducer";
import {appReducer, AppReducerActionsType} from "./AppReducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    app: AppReducer,
    auth: authReducer,
    app: appReducer,
    register: registerReducer,
    profilePage: profilePageReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для App
export type AppActionsType = AppReducerActionsType | AuthActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, AppActionsType>>()//require in new redux version


// @ts-ignore
window.store = store;
