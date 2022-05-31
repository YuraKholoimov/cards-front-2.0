import {Dispatch} from 'react';
import {api} from '../../../Api/Api';
import {setStatus, setStatusType} from '../../../Store/AppReducer';

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
export type ActionsType = ReturnType<typeof passwordRestoreAC> | ReturnType<typeof setIsChangedPassword> | setStatusType

// Actions && ActionsCreators
const passwordRestoreAC = (email: string, isSend: boolean) => ({type: 'IS_SEND', payload: {email, isSend}} as const)
const setIsChangedPassword = (isChangedPassword: boolean) => ({
    type: 'SET_NEW_PASSWORD',
    payload: {isChangedPassword}
} as const)

//Thunks
export const sendEmailTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus(true))
    api.sendEmail(email)
        .then(() => {
            dispatch(passwordRestoreAC(email, true))
            // return res
        })
        .finally(() => {
        dispatch(setStatus(false))
    })
}
export const setNewPasswordTC = (password: string) => (dispatch: Dispatch<ActionsType>) => {

    dispatch(setStatus(true))
    api.setNewPassword(password)
        .then(() => {
            dispatch(setIsChangedPassword(true))
        })
        .finally(() => {
            dispatch(setStatus(false))
        })
}