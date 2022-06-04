import {Dispatch} from 'react';
import {api} from '../b3-dal/api';
import {setStatusLoadingApp, setLoadingAppType} from './appReducer';
import {setCatchErrorType, setError} from "./loginReducer";

const initialState = {
    isSend: false,
    email: '',
    isChangedPassword: false
}


export const passwordRestoreReducer = (state = initialState, action: PasswordRestoreActionsType): InitialStateType => {
    switch (action.type) {
        case 'PASSWORD/IS-SEND':
            return {...state, email: action.payload.email, isSend: action.payload.isSend}
        default:
            return state
        case 'PASSWORD/SET-NEW-PASSWORD':
            return {...state, isChangedPassword: action.payload.isChangedPassword}
    }
}


//---- Actions
const passwordRestore = (email: string, isSend: boolean) => ({type: 'PASSWORD/IS-SEND', payload: {email, isSend}} as const)
const setIsChangedPassword = (isChangedPassword: boolean) => ({
    type: 'PASSWORD/SET-NEW-PASSWORD',
    payload: {isChangedPassword}
} as const)


//---- Thunks
export const sendEmailThunk = (email: string) => (dispatch: Dispatch<PasswordRestoreActionsType>) => {
    dispatch(setStatusLoadingApp(true))
    api.sendEmail(email)
        .then((res) => {
            console.log(res)
            dispatch(passwordRestore(email, true))
            // return res
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })
}
export const setNewPasswordThunk = (password: string, token: string | undefined) => (dispatch: Dispatch<PasswordRestoreActionsType>) => {
    dispatch(setStatusLoadingApp(true))
    api.setNewPassword(password, token)
        .then(() => {
            dispatch(setIsChangedPassword(true))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })
}


//---- Types
type InitialStateType = typeof initialState
export type PasswordRestoreActionsType =
    ReturnType<typeof passwordRestore>
    | ReturnType<typeof setIsChangedPassword>
    | setLoadingAppType
    | setCatchErrorType