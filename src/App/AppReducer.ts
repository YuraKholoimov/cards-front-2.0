const initAppState = {}

export const AppReducer = (state: initAppStateType = initAppState, action: ActionAppType) => {
    switch (action.type) {
        case 'SET-APP-STATE':
            return state
    }
    return null
}

export const setAppState = () => ({type: 'SET-APP-STATE'} as const)
//-----Type
export type initAppStateType = typeof initAppState
export type ActionAppType = ReturnType<typeof setAppState>