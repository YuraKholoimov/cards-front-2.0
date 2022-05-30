import {Dispatch} from 'react';
import { authAPI } from '../../../api/authAPI';

const initialState = {
    isSend: false,
    email: '',
    isChangedPassword: false
}

export const passwordRestoreReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'IS_SEND':
            return {...state, email: action.payload.email, isSend: action.payload.isSend}
        default:
            return state
        case 'SET_NEW_PASSWORD':
            return {...state, isChangedPassword: action.payload.isChangedPassword}
    }
}

// Types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof passwordRestoreAC> | ReturnType<typeof setIsChangedPassword>

// Actions && ActionsCreators
const passwordRestoreAC = (email: string, isSend: boolean) => ({type: 'IS_SEND', payload: {email, isSend}} as const)
const setIsChangedPassword = (isChangedPassword: boolean) => ({type: 'SET_NEW_PASSWORD', payload: {isChangedPassword}} as const)

//Thunks
export const sendEmailTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {
     authAPI.sendEmail(email)
        .then(() => {
            dispatch(passwordRestoreAC(email,true))
            // return res
        })
}
export const setNewPasswordTC = (password: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.setNewPassword(password)
        .then(() => {
            dispatch(setIsChangedPassword(true))
        })
}