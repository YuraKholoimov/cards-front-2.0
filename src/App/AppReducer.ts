import {Dispatch} from "redux";
import {api} from "../Api/Api";

const initAppState = {
    isInitialized: false
}

export const AppReducer = (state: initAppStateType = initAppState, action: ActionAppType) => {
    switch (action.type) {
        case 'APP/SET-APP-STATE':
            return state
        case 'APP/ISINITIALIZED':
            return {...state, isInitialized: action.isInitialized}
    }
    return state
}

//----- Action creators
export const setAppState = () => ({type: 'APP/SET-APP-STATE'} as const)
export const initializedAppState = (isInitialized: boolean) => ({type: 'APP/ISINITIALIZED', isInitialized} as const)

//----- Thunk
export const initializeApp = () => (dispatch: Dispatch) => {
    api.authMe()
        .then(data => console.log(data))
}



//-----Types
export type initAppStateType = typeof initAppState
export type ActionAppType = ReturnType<typeof setAppState> | ReturnType<typeof initializedAppState>