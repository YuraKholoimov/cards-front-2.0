import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import SuperInputText from '../../UI/SuperInputText/SuperInputText';
import SuperButton from '../../UI/SuperButton/SuperButton';
import {AppRootStateType, useAppSelector, useTypedDispatch} from '../../../Store/Store';
import {PATH} from '../../../App/App';
import {sendEmailTC} from './PasswordRestore-reducer';
import s from './PasswordRestore.module.css'
import {LoginWrapper} from './LoginWrapper/LoginWrapper';
import {Frame} from "../../UI/common/Frame/Frame";
import { useSelector } from 'react-redux';
import Preloader from '../../UI/common/Preloader/Preloader';

export const PasswordRestore = () => {
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.status)
    const isSend = useAppSelector(state=>state.restore.isSend)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')

    const onClickHandler = () => {
        dispatch(sendEmailTC(email))
        // navigate(PATH.CHECK_EMAIL)
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
    if (loading) {
        return <Preloader/>
    }
    return (
        <>
            {loading && <Preloader/>}
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Forgot your password?</h2>
                <div className={s.input}>
                    <label>
                        Email
                    </label>
                    <SuperInputText value={email} onChangeText={setEmail}/>
                </div>
                <SuperButton onClick={onClickHandler}>Send instructions</SuperButton>
                <p>
                    <p className={s.text}>Did you remember your password?</p>
                    <NavLink to={PATH.LOGIN} className={s.linkToLogin}>Try logging in</NavLink>
                </p>
            </Frame>
        </>

    );
};

