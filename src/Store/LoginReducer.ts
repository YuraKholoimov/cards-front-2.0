import {authAPI, LoginParamsType} from "../Api/LoginApi";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: true,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    payload: value
})

// ThunkDispatch<AppRootReducerType, LoginParamsType, ActionsType>
// thunks
// : Dispatch<ActionsType>
export const loginThunk = (data: LoginParamsType) => (dispatch:  Dispatch<ActionsType>) => {

    authAPI.login(data)
        // .then((res) => {
        //     if (res.data.resultCode === 0) {
        //         dispatch(setIsLoggedIn(true))
        //
        //     }
        // })
}


// types
export type ActionsType =
    ReturnType<typeof setIsLoggedIn>
export {}