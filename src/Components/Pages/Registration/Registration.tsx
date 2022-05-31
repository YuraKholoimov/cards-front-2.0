import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import s from './Registration.module.css';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import Preloader from '../../UI/common/Preloader/Preloader';
import {Frame} from "../../UI/common/Frame/Frame";
import SuperInputPassword from "../../UI/SuperInputPassword/SuperInputPassword";
import {registerTC, setRegister} from "../../../Store/registerReducer";
import SuperButton from "../../UI/SuperButton/SuperButton";
import {AppRootStateType, useAppDispatch} from "../../../Store/Store";

export const Registration = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    // const error = useSelector<AppRootStateType, string>(state => state.app.error)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.status);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(setRegister(false));
            // dispatch(setErrorAC(''))
        }
    }, [])

    const onClickHandler = () => {
        if (password !== confirmPassword) {
            // dispatch(setErrorAC('Password and confirmation password do not match'))
        } else {
            dispatch(registerTC(email, password))
        }
    }

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {loading && <Preloader/>}
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Sign up</h2>
                {/*{error && <div className={s.error}>{error}</div>}*/}
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
