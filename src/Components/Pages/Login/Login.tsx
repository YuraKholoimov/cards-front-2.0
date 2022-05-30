import React, {KeyboardEvent, useState} from 'react';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperCheckbox from "../../UI/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../UI/SuperButton/SuperButton";
import * as yup from 'yup'
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../../../Store/Store";
import {ThunkDispatch} from 'redux-thunk';
import {ActionsType, loginThunk, setError} from "../../../Store/LoginReducer";
import {Navigate, NavLink} from 'react-router-dom';
import SuperInputPassword from "../../UI/SuperInputPassword/SuperInputPassword";
import Preloader from "../../Preloader/Preloader";
import {Formik} from 'formik';

const Login = () => {
    const dispatch: ThunkDispatch<AppRootReducerType, unknown, ActionsType> = useDispatch()
    const isLogin = useSelector<AppRootReducerType, boolean>(state => state.auth.isInitialize)
    const error = useSelector<AppRootReducerType, string>(state => state.auth.error)
    const status = useSelector<AppRootReducerType, boolean>(state => state.app.status)
    const validations = yup.object().shape({
        email: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),

    })

    const resetError = () => dispatch(setError(''));
    // const loginHandler = (values: any) => {
    //     dispatch(loginThunk(values))
    // }
    // const loginPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         loginHandler()
    //     }
    // }


    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }
    if (status) {
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
                    debugger
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
                    <div>
                        <h3>It-incubator</h3>
                        <h3>Sign in</h3>
                        <div>
                            {/*name обязательно и должно совпадать с initialValues*/}

                            <SuperInputText
                                className={s.inp}
                                resetError={resetError}
                                type={'text'}
                                name={'email'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <span>{touched.email && errors.email &&
                                <div className={s.error}>{errors.email}</div>}</span>
                        </div>

                        <div className={s.inpContainer}>
                            <SuperInputPassword
                                className={s.inp}
                                resetError={resetError}
                                name={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <span>{touched.password && errors.password &&
                                <div className={s.error}>{errors.password}</div>}</span>
                        </div>
                        {error && <div className={s.error}>{error}</div>}
                        <div className={s.inpContainer}>
                            <input name={'rememberMe'}
                                   className={s.inp} onChange={handleChange}
                                   type="checkbox"/>remember me
                        </div>
                        <SuperButton className={s.btn}
                                     onClick={() => {
                                         handleSubmit()
                                     }}
                        >Login
                        </SuperButton>
                        <div>
                            Don't have an account?
                        </div>
                        <NavLink to={'/registration'}>

                            Sign up

                        </NavLink>

                    </div>


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