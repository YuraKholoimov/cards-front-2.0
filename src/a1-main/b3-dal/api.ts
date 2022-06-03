import { PATH } from "../b1-ui/routes/RoutesComponent";
import {instance} from './settings';

export type ReturnParamsType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string | undefined;
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
            <a href='https://yurakholoimov.github.io/cards-front-2.0/#${PATH.NEW_PASSWORD}/$token$'>link</a>
            </div>`
        })
    },
    setNewPassword(password: string, resetPasswordToken: string | undefined) {
        return instance.post('auth/set-new-password', {password, resetPasswordToken})
    }

}