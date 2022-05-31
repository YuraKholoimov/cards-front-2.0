import { PATH } from "../App/App";
import {instance} from "./Settings";

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
type RegistrationResponseType = {
    addedUser: any,
    error?: string
}
export const api = {
    registration(email: string, password: number) {
        return instance.post('/auth/register', {email, password})
    },
    login(data: LoginParamsType) {
        return instance.post<ReturnParamsType>('/auth/login', data)
    },
    logout() {
        return instance.delete('/auth/me')
    },
    me() {
        return instance.post<ReturnParamsType>('/auth/me')
    },
    register(email: string, password: string) {
        return instance.post<RegistrationResponseType>('/auth/register', {email, password})
    },
    updateMe(name: string, avatar: string) {
        return instance.put('auth/me', {name, avatar})
    },
    sendEmail(email: string) {
        return instance.post('auth/forgot', {
            email,
            from: 'test-front-developer <memories@bk.ru>',
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='https://yurakholoimov.github.io/${PATH.NEW_PASSWORD}/$token$'>link</a>
            </div>`
        })
    },
    setNewPassword(password: string) {
        return instance.post('auth/set-new-password', {
            password, resetPasswordToken: "some-token-from-url"
        })
    }

}