import {Dispatch} from "redux";
import {setStatus, setStatusType} from './appReducer';
import {api} from '../b3-dal/api';

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

    // error?: string;
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
    updated: "",
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
        case "UPDATE-PROFILE":
            return {...state, name: action.name, avatar: action.avatar}

    }
    return state
}
//---- Actions
export const setProfileAC = (data: initStateProfilePage) => ({type: "SET-PROFILE", data} as const)
export const updateProfile = (name: string, avatar: string) => ({type: "UPDATE-PROFILE", name, avatar} as const)

//---- Thunk
export const editProfile = (name: string, avatar: string) => (dispatch: Dispatch) => {
    dispatch(setStatus(true));
    api.updateMe(name, avatar)
        .then(res => {
            let {name, avatar} = res.data.updatedUser
            console.log(res.data.updatedUser)
            dispatch(updateProfile(name, avatar))
        })
        .catch(rej => {
            console.log(rej)
        })
        .finally(() => {
            dispatch(setStatus(false));
        })
}


//---- Type
export type initStateProfilePage = typeof initState

export type setProfileType = ReturnType<typeof setProfileAC>

export type ActionTypes =
    | ReturnType<typeof updateProfile>
    | setStatusType
    | setProfileType