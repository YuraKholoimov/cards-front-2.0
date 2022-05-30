import {applyMiddleware, combineReducers, createStore } from "redux";
import {AppReducer} from "./AppReducer";
import thunk from "redux-thunk";
import {authReducer} from "./LoginReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AuthActionsType, registerReducer} from "./registerReducer";
import {appReducer, AppReducerActionsType} from "./AppReducer";
import {useDispatch} from "react-redux";
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
// import {AppReducer} from '../App/AppReducer';
import {ActionsType, passwordRestoreReducer} from '../Components/Pages/Password_Restore/PasswordRestore-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    app: AppReducer,
    auth: authReducer,
    app: appReducer,
    register: registerReducer,
    profilePage: profilePageReducer,
    // app: AppReducer,
    restore: passwordRestoreReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для App
export type AppActionsType = AppReducerActionsType | AuthActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, AppActionsType>>()//require in new redux version

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type TypedDispatch = ThunkDispatch<AppRootStateType, any, ActionsType>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()

// @ts-ignore
window.store = store;