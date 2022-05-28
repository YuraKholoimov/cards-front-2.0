import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const authAPI = {
    passwordForgot(email: string) {
        return instance.post('auth/forgot', {
            email: email, // кому восстанавливать пароль
            from: "test-front-developer <memories@bk.ru>",
            // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>` // хтмп-письмо, вместо $token$ бэк вставит токен
        })
    }
}