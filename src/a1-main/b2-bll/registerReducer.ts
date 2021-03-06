import {Dispatch} from "redux";
import {api} from "../b3-dal/api";
import {setStatusLoadingApp} from "./appReducer";
import {AppThunkType} from "./store";
import {setError} from "./loginReducer";

const initialState = {
    isRegistered: false,
}


export const registerReducer = (state = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-REGISTER":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
};


//---- Actions
export const setRegister = (isRegistered: boolean) => ({type: 'REGISTER/SET-REGISTER', isRegistered} as const)


//---- Thunks
export const registerThunk = (email: string, password: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusLoadingApp(true));
        api.register(email, password)
            .then((res) => {
                dispatch(setRegister(true))

            })
            .catch((err) => {
                dispatch(setError(err.response.data.error))
            })
            .finally(() => {
                dispatch(setStatusLoadingApp(false));
            })
    }
};


//---- Types
type InitialStateType = typeof initialState
export type RegisterActionsType = setRegisterType
type setRegisterType = ReturnType<typeof setRegister>