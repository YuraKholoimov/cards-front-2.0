import {Dispatch} from "redux";
import {api, LoginParamsType} from "../b3-dal/api";
import {setStatus, setStatusType} from "./appReducer";
import {setProfileAC, setProfileType} from "./profileReducer";

const initialState = {
    isLogin: false,
    error: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLogin: action.payload}
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
    api.login(data)
        .then((res) => {
            dispatch(setIsLoggedIn(true))
            console.log(res.data)
            dispatch(setProfileAC(res.data))

        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setStatus(false))
        })
}
export const logoutThunk = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus(true))
    api.logout()
        .then((res) => {
            dispatch(setIsLoggedIn(false))
        })
        .finally(() => {
            dispatch(setStatus(false))
        })

}

// types
export type ActionsType = setIsLoggedIn | ReturnType<typeof setError> | setStatusType | setProfileType
export type  setIsLoggedIn = ReturnType<typeof setIsLoggedIn>
// function setStatus(arg0: boolean): any {
//     // throw new Error("Function not implemented.");
// }

