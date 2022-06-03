import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RegisterActionsType, registerReducer} from "./registerReducer";
import {useDispatch} from "react-redux";
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {authReducer, LoginActionsType} from './loginReducer';
import {AppActionsType, appReducer} from './appReducer';
import {PasswordRestoreActionsType, passwordRestoreReducer} from "./passwordRestoreReducer";
import {ProfileActionType, profileReducer} from "./profileReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    register: registerReducer,
    restore: passwordRestoreReducer,
    profile: profileReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для App
export type AppRootActionsType = RegisterActionsType | LoginActionsType | PasswordRestoreActionsType | ProfileActionType | AppActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>>()//require in new redux version
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;