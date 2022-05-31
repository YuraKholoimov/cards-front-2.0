import {Dispatch} from "redux"
import {api} from "../../../Api/Api";
import { setStatus, setStatusType } from "../../../Store/AppReducer";

const initState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,

    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,

    error: ''
}

//---- Reducer
export const profilePageReducer = (state: initStateProfilePage = initState, action: ActionTypes) => {
    switch (action.type) {
        case "SET-PROFILE":
            return state
        case "UPDATE-PROFILE":
            return {...state, name: action.name, avatar: action.avatar}
    }
    return state
}
//---- Actions
const setProfile = (nickname: string, email: string) => ({type: "SET-PROFILE", nickname, email} as const)
const updateProfile = (name: string, avatar: string) => ({type: "UPDATE-PROFILE", name, avatar} as const)

//---- Thunk
export const editProfile = (name: string, avatar: string) => (dispatch: Dispatch) => {
    dispatch(setStatus(true));
    api.updateMe(name, avatar)
        .then(res => {
            let {name, avatar} = res.data.updatedUser
            console.log(res.data.updatedUser)
            dispatch(updateProfile(name, avatar))
        })
        .catch(rej => {console.log(rej)})
        .finally(()=>{
            dispatch(setStatus(false));
        })
}

//---- Type
export type initStateProfilePage = typeof initState
export type ActionTypes = ReturnType<typeof setProfile> | setStatusType
    | ReturnType<typeof updateProfile>