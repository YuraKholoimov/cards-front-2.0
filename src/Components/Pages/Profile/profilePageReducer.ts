

const initState = {
    name: 'YuraKholoimov',
    email: 'yurakholoimov@ya.ru'
}

//---- Reducer
export const profilePageReducer = (state: initStateProfilePage = initState, action: ActionTypes) => {
    switch (action.type) {
        case "SET-PROFILE":
            return state
    }
    return state
}
//---- Actions
const setProfile = (name: string, email: string) => ({type: "SET-PROFILE", name, email} as const)

//---- Thunk


//---- Type
export type initStateProfilePage = typeof initState
export type ActionTypes = ReturnType<typeof setProfile>