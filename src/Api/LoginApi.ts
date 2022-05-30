import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type ReturnParamsType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;

    error?: string;
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
// - куки умрут если пользователь будет
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ReturnParamsType>('/auth/login', data)
    },
    logout() {
        return instance.delete('/auth/me')
    },
    me() {
      return instance.post<ReturnParamsType>('/auth/me')
    },

}
export const profileAPI = {
    editProfile (data: DataType) {
        return instance.put('/auth/me' , data)
    }
}
type DataType = {
    name: string
    avatar?: string
}