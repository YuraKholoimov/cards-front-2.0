const initialState = {
    error: null as null | boolean,
    status: 'idle',
    isInitialized: false
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return {...state}
    }
}

// Types
type InitialStateType = typeof initialState;
type ActionsType = AppActionsType;
type StatusType = 'idle' | 'loading';
export type AppActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setInitializedAC>

// Actions && ActionsCreators
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', payload: {error}} as const)
export const setAppStatusAC = (status: StatusType) => ({type: 'APP/SET-STATUS', payload: {status}} as const)
export const setInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', payload: {isInitialized}} as const)

//Thunks