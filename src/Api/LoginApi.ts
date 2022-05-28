import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// export type LoginParamsType = {
//     _id: string;
//     email: string;
//     name: string;
//     avatar?: string;
//     publicCardPacksCount: number;
// // количество колод
//
//     created: Date;
//     updated: Date;
//     isAdmin: boolean;
//     verified: boolean; // подтвердил ли почту
//     rememberMe: boolean;
//
//     error?: string;
// }

export type LoginParamsType = {
    login: string
    password: string
    rememberMe: boolean
// - куки умрут если пользователь будет
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post('POST/auth/login', data)
    }
}