import {Dispatch} from "redux";
import {api} from "../b3-dal/api";
import {setIsLoggedIn} from "./loginReducer";
import {setProfile, setProfileType} from "./profileReducer";


const initialState = {
    loadingApp: false,
    isInitializedApp: false
}

export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/IS-INITIALIZED":

            return {...state, isInitializedApp: action.payload.isInitialized}
        case "APP/SET-LOADING-APP":
            return {...state, loadingApp: action.payload.status}
        default:
            return state
    }
}


//---- Actions
export const isInitializedApp = (isInitialized: boolean) => ({type: 'APP/IS-INITIALIZED',payload: {isInitialized}} as const)
export const setStatusLoadingApp = (status: boolean) => ({type: 'APP/SET-LOADING-APP', payload: {status}} as const)


//---- Thunks
export const initializeAppThunk = () => (dispatch: Dispatch<AppActionsType>) => {
    api.me()
        .then((res) => {
            dispatch(setIsLoggedIn(true))
            dispatch(setProfile(res.data))
        })
        .finally(() => {
            dispatch(isInitializedApp(true))
        })
}


//---- Types
export type InitialStateType = typeof initialState
export type AppActionsType = isInitializedAppType | setLoadingAppType | setIsLoggedIn | setProfileType
export type setLoadingAppType = ReturnType<typeof setStatusLoadingApp>
export type isInitializedAppType = ReturnType<typeof isInitializedApp>