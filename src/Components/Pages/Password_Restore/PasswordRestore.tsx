import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import SuperInputText from '../../UI/SuperInputText/SuperInputText';
import SuperButton from '../../UI/SuperButton/SuperButton';
import {useAppSelector, useTypedDispatch} from '../../../Store/Store';
import {PATH} from '../../../App/App';
import {sendEmailTC} from './PasswordRestore-reducer';
import s from './PasswordRestore.module.css'
import {LoginWrapper} from './LoginWrapper/LoginWrapper';

export const PasswordRestore = () => {

    const isSend = useAppSelector((state) => state.restore.isSend)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')

    const onClickHandler = () => {
        dispatch(sendEmailTC(email))
        //         .then((res) => {
        //         if (res.data.success) {
        //             navigate(PATH.LOGIN)
        //         }
        // })
        setEmail('')
    }

    if (isSend) {
        navigate(PATH.CHECK_EMAIL)
    }

    return (
        <LoginWrapper>
            <h3 className={s.subtitle}>Forgot your password?</h3>
            <div className={s.input}>
                <SuperInputText value={email} onChangeText={setEmail} placeholder={'Email'}/>
            </div>
            <p className={s.instructions}>Enter your email address and we will send you further instruction</p>
            <div className={s.button}>
                <SuperButton onClick={onClickHandler}>Send instructions</SuperButton>
            </div>
            <p className={s.text}>Did you remember your password?</p>
            <NavLink to={PATH.LOGIN} className={s.linkToLogin}>Try logging in</NavLink>
        </LoginWrapper>

    );
};

