import {setStatusType} from "../../../Store/AppReducer";

type InitStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод
    __v: number | null,
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    token: string
    tokenDeathTime: string

    error?: string;
}


const initState: InitStateType = {

    avatar: '',
    created: '',
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    token: '',
    tokenDeathTime: '',
    updated: "2022-05-31T09:26:58.954Z",
    verified: false,
    __v: null,
    _id: '',
}
// const setUserType = {
//     data:
// }

//---- Reducer
export const profileReducer = (state: initStateProfilePage = initState, action: ActionTypes) => {
    switch (action.type) {
        case "SET-PROFILE":
            return {
                ...state,
                name: action.data.name,
                avatar: action.data.avatar,
                email: action.data.email,
                _id: action.data._id,

            }

    }
    return state
}
//---- Actions
export const setProfileAC = (data: InitStateType) => ({type: "SET-PROFILE", data} as const)
const updateProfile = (name: string, avatar: string) => ({type: "UPDATE-PROFILE", name, avatar} as const)

//---- Thunk


//---- Type
export type initStateProfilePage = typeof initState
export type ActionTypes = setProfileType | setStatusType

export type setProfileType = ReturnType<typeof setProfileAC>