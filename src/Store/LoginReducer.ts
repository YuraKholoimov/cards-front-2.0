import {authAPI, LoginParamsType} from "../Api/LoginApi";
import {Dispatch} from "redux";
import {isInitializedType, setStatus, setStatusType} from "./AppReducer";

const initialState = {
    isInitialize: false,
    error: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isInitialize: action.payload}
        case "LOGIN/SET-ERROR":
            return {...state, error: action.payload}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    payload: value
}) as const
export const setError = (error: string) => ({
    type: 'LOGIN/SET-ERROR',
    payload: error
}) as const
//thunk
export const loginThunk = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus(true))
    authAPI.login(data)
        .then((res) => {
            console.log(res)
            dispatch(setIsLoggedIn(true))

        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
                    })
        .finally(()=>{
            dispatch(setStatus(false))
        })
}
export const logoutThunk = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus(true))
    authAPI.logout()
        .then((res) => {
            dispatch(setIsLoggedIn(false))
            dispatch(setStatus(false))

        })

}

// types
export type ActionsType = isInitializedType | setStatusType | setIsLoggedIn | ReturnType<typeof setError>
export type  setIsLoggedIn = ReturnType<typeof setIsLoggedIn>
