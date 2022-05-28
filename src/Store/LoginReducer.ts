import {authAPI, LoginParamsType} from "../Api/LoginApi";
import {Dispatch} from "redux";
import {isInitializedAc, isInitializedType} from "../App/AppReducer";

const initialState = {
    isInitialize: false,
    error: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isInitialize: action.payload}
        case "login/SET-ERROR":
            return {...state, error: action.payload}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    payload: value
}) as const
export const setError = (error: string) => ({
    type: 'login/SET-ERROR',
    payload: error
}) as const

export const loginThunk = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {

    authAPI.login(data)
        .then((res) => {
            console.log(res)
            dispatch(setIsLoggedIn(true))
        })
        .catch((err) => {

            dispatch(setError(err.response.data.error))
            // setInterval(() => {
            //     dispatch(setError(''))
            // }, 3000)
        })
}
export const logoutThunk = () => (dispatch: Dispatch<ActionsType>) => {

    authAPI.logout()
        .then((res) => {
            dispatch(setIsLoggedIn(false))
        })

}
export const initializeAppThunk = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(() => {
            dispatch(setIsLoggedIn(true))
        })
        .finally(() => {
            dispatch(isInitializedAc(true))
        })
}

// types
export type ActionsType = isInitializedType |
    ReturnType<typeof setIsLoggedIn> |
    ReturnType<typeof setError>
