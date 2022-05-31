import React from 'react';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperCheckbox from "../../UI/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../UI/SuperButton/SuperButton";
import * as yup from 'yup'
import s from './Login.module.css'
import {Frame} from "../../UI/common/Frame/Frame";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from 'redux-thunk';
import {ActionsType, loginThunk, setError} from "../../../Store/LoginReducer";
import {Navigate, NavLink} from 'react-router-dom';
import SuperInputPassword from "../../UI/SuperInputPassword/SuperInputPassword";
import Preloader from "../../Preloader/Preloader";
import {Formik} from 'formik';
import {AppRootStateType} from '../../../Store/Store';

const Login = () => {
    const dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType> = useDispatch()
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLogin)
    const error = useSelector<AppRootStateType, string>(state => state.auth.error)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.status)
    const validations = yup.object().shape({
        email: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),

    })

    const resetError = () => dispatch(setError(''));
    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }
    if (loading) {
        return <Preloader/>
    }
    return (
        <Formik initialValues={
            {
                email: '',
                password: '',
                rememberMe: false
            }

        }
                validateOnBlur
                onSubmit={(values) => {
                    console.log(values)
                    dispatch(loginThunk(values))
                }}
                validationSchema={validations}

        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => {
                return (
                    <>
                        {loading && <Preloader/>}
                        <Frame>
                            <span><strong>It-incubator</strong></span>
                            <h2>Sign in</h2>
                            {error && <div className={s.error}>{error}</div>}
                            <div className={s.input}>
                                <label>
                                    Email 
                                </label>
                                <SuperInputText resetError={resetError}
                                                type={'text'}
                                                name={'email'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}/>

                            </div>
                            <div className={s.input}>
                                <label>
                                    Password
                                </label>
                                <SuperInputPassword
                                    name={'password'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}/>
                            </div>
                            <div className={s.input}>

                                <SuperCheckbox name={'rememberMe'}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               checked={values.rememberMe}/>
                                <label>
                                    Remember me
                                </label>
                                <span className={s.linkItem}><NavLink className={s.link} to={'/password-restore'}>Forgot password?</NavLink></span>

                            </div>

                            <SuperButton  onClick={() => {
                                handleSubmit()
                            }} style={{padding: '10px 60px'}}>Login</SuperButton>
                            <div className={s.text}>
                                Don't have an account?
                            </div>
                            <p>
                                <NavLink to={'/registration'} className={s.linkLogin}>
                                    <p className={s.signUpText}>Sign up</p>
                                </NavLink>
                            </p>

                        </Frame>
                    </>
                )
            }}


        </Formik>



        // <div>
        //     <h3>It-incubator</h3>
        //     <h3>Sign in</h3>
        //     <div>
        //
        //         <SuperInputText value={email} resetError={resetError} onChangeText={setEmail}/>
        //
        //     </div>
        //
        //     <div>
        //
        //         <SuperInputPassword onKeyPress={loginPressKeyHandler} type={'password'} resetError={resetError}
        //                             value={password}
        //                             onChangeText={setPassword}/>
        //
        //     </div>
        //
        //     <div>
        //
        //         <SuperCheckbox
        //             onChangeChecked={setRememberMe} checked={rememberMe}/> Forgot Password
        //
        //
        //     </div>
        //     {error && <div className={s.error}>{error}</div>}
        //     <div className={s.btnLogin}>
        //
        //         <SuperButton onClick={loginHandler}>login</SuperButton>
        //
        //     </div>
        //
        //     <div>
        //
        //         Don't have an account?
        //
        //     </div>
        //
        //     <NavLink to={'/registration'}>
        //
        //         Sign up
        //
        //     </NavLink>
        //
        // </div>
    );
};
//test branch
export default Login;