import React, {useEffect, useState} from 'react';
import {Navigate, NavLink} from "react-router-dom";
import s from './Registration.module.css';
import {Frame} from "../../../a1-main/b1-ui/common/frame/Frame";
import SuperInputPassword from "../../../a1-main/b1-ui/common/superInputPassword/SuperInputPassword";
import {registerTC, setRegister} from "../../../a1-main/b2-bll/registerReducer";
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import Preloader from '../../../a1-main/b1-ui/common/preloader/Preloader';
import SuperInputText from '../../../a1-main/b1-ui/common/superInputText/SuperInputText';

export const Registration = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const error = useAppSelector<string>(state => state.auth.error)
    const isRegistered = useAppSelector<boolean>(state => state.register.isRegistered)
    const loading = useAppSelector<boolean>(state => state.app.loadingApp);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(setRegister(false));
        }
    }, [])

    const onClickHandler = () => {
        if (password !== confirmPassword) {
            // dispatch(setErrorAC('password and confirmation password do not match'))
        } else {
            dispatch(registerTC(email, password))
        }
    }

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }
    if (loading) {
        return <Preloader/>
    }

    return (
        <>
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Sign up</h2>
                {error && <div className={s.error}>{error}</div>}
                <div className={s.input}>
                    <label>
                        Email
                    </label>
                    <SuperInputText value={email} onChangeText={setEmail}/>
                </div>
                <div className={s.input}>
                    <label>
                        Password
                    </label>
                    <SuperInputPassword value={password} onChangeText={setPassword}/>
                </div>
                <div className={s.input}>
                    <label>
                        Confirm password
                    </label>
                    <SuperInputPassword value={confirmPassword} onChangeText={setConfirmPassword}/>
                </div>
                <SuperButton onClick={onClickHandler} style={{padding: '10px 60px'}}>Register</SuperButton>
                <p>
                    <NavLink to={'/login'} className={s.linkLogin}>
                        <p className={s.signUpText}>To login</p>
                    </NavLink>
                </p>
            </Frame>
        </>
    );
};
