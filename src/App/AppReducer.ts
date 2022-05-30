import {Dispatch} from "redux";
import {authAPI} from "../Api/LoginApi";
import {setIsLoggedIn} from "../Store/LoginReducer";

export type InitialStateType = {
    status: boolean
    isInitialized: boolean
}


const initialState: InitialStateType = {
    status: false,
    isInitialized: false
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }


}
export const isInitializedAc = (isInitialized: boolean) => {
    return {
        type: 'APP/IS-INITIALIZED',
        isInitialized

    } as const
}
export const setStatus = (status: boolean) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
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

export type ActionsType = isInitializedType | setStatusType | setIsLoggedIn
export type setStatusType = ReturnType<typeof setStatus>
export type isInitializedType = ReturnType<typeof isInitializedAc>

