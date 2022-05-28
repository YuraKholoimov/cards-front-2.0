export type InitialStateType = {
    status: RequestStatusType
    isInitialized: boolean
}
export type RequestStatusType = 'loading' | 'succeeded'

const initialState: InitialStateType = {
    status: "succeeded",
    isInitialized: false
}

export const AppReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }


}
export const isInitializedAc = (isInitialized: boolean) => {
    return {
        type: 'IS-INITIALIZED',
        isInitialized

    } as const
}

export type ActionsType = isInitializedType
export type isInitializedType = ReturnType<typeof isInitializedAc>

