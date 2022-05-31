import {Dispatch} from "redux";
import {api} from "../Api/Api";

import {setIsLoggedIn} from "./LoginReducer";
import {setProfileAC, setProfileType} from "../Components/Pages/Profile/profileReducer";

export type InitialStateType = {
    status: boolean
    isInitialized: boolean
}


const initialState: InitialStateType = {
    status: false,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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
    api.me()
        .then((res) => {
            dispatch(setIsLoggedIn(true))
            dispatch(setProfileAC(res.data))
        })
        .finally(() => {
            dispatch(isInitializedAc(true))
        })
}

export type ActionsType = isInitializedType | setStatusType | setIsLoggedIn | setProfileType
export type setStatusType = ReturnType<typeof setStatus>
export type isInitializedType = ReturnType<typeof isInitializedAc>