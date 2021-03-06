import {Dispatch} from "redux";
import {api, LoginParamsType} from "../b3-dal/api";
import {setStatusLoadingApp, setLoadingAppType} from "./appReducer";
import {setProfile, setProfileType} from "./profileReducer";

const initialState = {
    isLogin: false,
    error: '',
    userId: ''
}


export const authReducer = (state = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLogin: action.payload.value}
        case "LOGIN/SET-ERROR":
            return {...state, error: action.payload.error}
        case 'LOGIN/SET-USER-ID':
            return {...state, userId: action.payload.userId}
        default:
            return state
    }
}


//---- Actions
export const setIsLoggedIn = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', payload: {value}} as const)
export const setError = (error: string) => ({type: 'LOGIN/SET-ERROR', payload: {error}} as const)
export const setUserId = (userId: string) => ({type: 'LOGIN/SET-USER-ID', payload: {userId}} as const)


//---- Thunks
export const loginThunk = (data: LoginParamsType) => (dispatch: Dispatch<LoginActionsType>) => {
    dispatch(setStatusLoadingApp(true))
    api.login(data)
        .then((res) => {
            dispatch(setIsLoggedIn(true))
            dispatch(setProfile(res.data))
            dispatch(setUserId(res.data._id))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })
}
export const logoutThunk = () => (dispatch: Dispatch<LoginActionsType>) => {
    dispatch(setStatusLoadingApp(true))
    api.logout()
        .then(() => {
            dispatch(setIsLoggedIn(false))
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })

}


//---- Types
type InitialStateType = typeof initialState
export type LoginActionsType = setIsLoggedIn | setCatchErrorType | setLoadingAppType | setProfileType | setUserIdType
export type setIsLoggedIn = ReturnType<typeof setIsLoggedIn>
export type setCatchErrorType = ReturnType<typeof setError>
export type setUserIdType = ReturnType<typeof setUserId>


