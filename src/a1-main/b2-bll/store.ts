import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AuthActionsType, registerReducer} from "./registerReducer";
import {useDispatch} from "react-redux";
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {authReducer} from './loginReducer';
import {ActionsType, appReducer} from './appReducer';
import { passwordRestoreReducer } from "./passwordRestoreReducer";
import { profileReducer } from "./profileReducer";

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

export type TypedDispatch = ThunkDispatch<AppRootStateType, unknown, ActionsType>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()

// @ts-ignore
window.store = store;