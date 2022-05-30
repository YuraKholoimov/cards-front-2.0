import {Dispatch} from "redux";



import {authAndProfileApi} from "../Components/DAL/authAndProfileApi";
import {setErrorAC, setLoadingAC} from "./AppReducer";
import {AppThunkType} from "./Store";

const initialState = {
    isRegistered: false,
}

export const registerReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-REGISTER":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
};

// type
type InitialStateType = {
    isRegistered: boolean
}

export type AuthActionsType = setRegisterType

// actions
export const setRegister = (isRegistered: boolean) =>
    ({type: 'REGISTER/SET-REGISTER', isRegistered} as const)

type setRegisterType = ReturnType<typeof setRegister>

// thunk
export const registerTC = (email: string, password: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true));
        authAndProfileApi.register(email, password)
            .then(() => {
                dispatch(setRegister(true))
                dispatch(setErrorAC(''))
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
            })
            .finally(() => {
                dispatch(setLoadingAC(false));
            })
    }
};