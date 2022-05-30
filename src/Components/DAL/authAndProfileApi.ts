import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0' || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAndProfileApi = {
    me() {
        return instance.post<UserResponseType>('/auth/me')
    },
    register(email: string, password: string) {
        return instance.post<RegistrationResponseType>('/auth/register', {email, password})
    },
}

export type UserResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    token?: string
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}



type RegistrationResponseType = {
    addedUser: any,
    error?: string
}

