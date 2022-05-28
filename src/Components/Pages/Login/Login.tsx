import React, {useState} from 'react';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperCheckbox from "../../UI/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../UI/SuperButton/SuperButton";
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../../../Store/Store";
import {ThunkDispatch} from 'redux-thunk';
import {ActionsType, loginThunk, setError} from "../../../Store/LoginReducer";
import {Navigate} from 'react-router-dom';

const Login = () => {
    const dispatch: ThunkDispatch<AppRootReducerType, unknown, ActionsType> = useDispatch()
    const isLogin = useSelector<AppRootReducerType, boolean>(state => state.auth.isInitialize)
    const error = useSelector<AppRootReducerType, string>(state => state.auth.error)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const loginHandler = () => {
        dispatch(loginThunk({email, password, rememberMe}))
    }
    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }
    const resetError = () => dispatch(setError(''));


    return (
        <div>
            <h3>It-incubator</h3>
            <h3>Sign in</h3>
            <div>

                <SuperInputText value={email} resetError={resetError} onChangeText={setEmail}/>

            </div>

            <div>

                <SuperInputText type={'password'} resetError={resetError} value={password} onChangeText={setPassword}/>

            </div>

            <div>

                <SuperCheckbox
                    onChangeChecked={setRememberMe} checked={rememberMe}/> Forgot Password


            </div>
            {error && <div className={s.error}>{error}</div>}
            <div className={s.btnLogin}>

                <SuperButton onClick={loginHandler}>login</SuperButton>

            </div>

            <div>

                Don't have an account?

            </div>

            <div>

                Sign up

            </div>

        </div>
    );
};
//test branch
export default Login;