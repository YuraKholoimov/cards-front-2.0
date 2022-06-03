import {Dispatch} from "redux";
import {setStatusLoadingApp, setLoadingAppType} from './appReducer';
import {api, ReturnParamsType} from '../b3-dal/api';


const initState = {
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


export const profileReducer = (state = initState, action: ProfileActionType): initStateProfilePage => {
    switch (action.type) {
        case "SET-PROFILE":
            return {
                ...state,
                name: action.data.name,
                avatar: action.data.avatar ? action.data.avatar : "",
                email: action.data.email,
                _id: action.data._id,
            }
        case "UPDATE-PROFILE":
            return {...state, name: action.name, avatar: action.avatar}

    }
    return state
}


//---- Actions
export const setProfile = (data: ReturnParamsType) => ({type: "SET-PROFILE", data} as const)
export const updateProfile = (name: string, avatar: string) => ({type: "UPDATE-PROFILE", name, avatar} as const)


//---- Thunks
export const editProfileThunk = (name: string, avatar: string) => (dispatch: Dispatch) => {
    dispatch(setStatusLoadingApp(true));
    api.updateMe(name, avatar)
        .then(res => {
            let {name, avatar} = res.data.updatedUser
            dispatch(updateProfile(name, avatar))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false));
        })
}


//---- Types
export type initStateProfilePage = typeof initState
export type ProfileActionType = ReturnType<typeof updateProfile> | setLoadingAppType | setProfileType
export type setProfileType = ReturnType<typeof setProfile>