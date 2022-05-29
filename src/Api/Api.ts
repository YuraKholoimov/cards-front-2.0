import {instance} from "./Settings";


export const api = {
    registration(email: string, password: number) {
        return instance.post('/auth/register', {email, password})
    },
    login(email: string, password: number) {
        return instance.post('/auth/login', {email, password})
    },
    logout() {
        return instance.delete("auth/me")
    },
    authMe() {
        return instance.post('/auth/me')
    },
    updateMe(name: string, avatar: string) {
        return instance.put('auth/me', {name, avatar})
    },
    forgotPassword(email: string) {
        return instance.post('/auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>
                link</a></div>`

        })
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post('auth/set-new-password', {password, resetPasswordToken})
    }

}