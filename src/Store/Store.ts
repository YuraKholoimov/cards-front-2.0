import {applyMiddleware, combineReducers, createStore } from "redux";
import {authReducer} from "./LoginReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AuthActionsType, registerReducer} from "./registerReducer";
import {useDispatch} from "react-redux";
import {ActionsType, passwordRestoreReducer} from '../Components/Pages/Password_Restore/PasswordRestore-reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { appReducer } from "./AppReducer";
import {profileReducer} from "../Components/Pages/Profile/profileReducer";

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
export type AppActionsType =  AuthActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, AppActionsType>>()//require in new redux version

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type TypedDispatch = ThunkDispatch<AppRootStateType, any, ActionsType>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()

// @ts-ignore
window.store = store;