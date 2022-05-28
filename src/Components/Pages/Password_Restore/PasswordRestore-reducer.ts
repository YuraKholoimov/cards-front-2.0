import {Dispatch} from 'react';
import { authAPI } from '../../../api/authAPI';

const initialState = {
    isSend: false,
    email: ''
}

export const passwordRestoreReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'IS_SEND':
            return {...state, email: action.payload.email, isSend: action.payload.isSend}
        default:
            return state
    }
}


// Types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof passwordRestoreAC>


// Actions && ActionsCreators
const passwordRestoreAC = (email: string, isSend: boolean) => ({type: 'IS_SEND', payload: {email, isSend}} as const)

//Thunk


export const passwordForgotTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.passwordForgot(email)
        .then(() => {
            dispatch(passwordRestoreAC(email, true))
        })
}