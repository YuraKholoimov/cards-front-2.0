import axios from 'axios';
import { PATH } from '../App/App';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0' ,
    withCredentials: true,
})


export const authAPI = {
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