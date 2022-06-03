import React from 'react';
import * as yup from 'yup'
import s from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Navigate, NavLink} from 'react-router-dom';
import {Formik} from 'formik';
import { AppRootStateType } from '../../../a1-main/b2-bll/store';
import {ActionsType, loginThunk, setError} from '../../../a1-main/b2-bll/loginReducer';
import SuperInputPassword from '../../../a1-main/b1-ui/common/superInputPassword/SuperInputPassword';
import {Frame} from '../../../a1-main/b1-ui/common/frame/Frame';
import Preloader from '../../../a1-main/b1-ui/common/preloader/Preloader';
import SuperButton from '../../../a1-main/b1-ui/common/superButton/SuperButton';
import SuperCheckbox from '../../../a1-main/b1-ui/common/superCheckbox/SuperCheckbox';
import SuperInputText from '../../../a1-main/b1-ui/common/superInputText/SuperInputText';

const Login = () => {
    const dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType> = useDispatch()
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLogin)
    const error = useSelector<AppRootStateType, string>(state => state.auth.error)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.status)
    const validations = yup.object().shape({
        email: yup.string().email('Invalid email address'),
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
                onSubmit={(values) => {
                    dispatch(loginThunk(values))
                }}
                validationSchema={validations}
        >
            {({

                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => {
                return (
                    <>
                        <Frame>
                            <span><strong>It-incubator</strong></span>
                            <h2>Sign in</h2>
                            {error && <div className={s.error}>{error}</div>}
                            <div className={s.input}>
                                <label>
                                    Email
                                </label>
                                <SuperInputText resetError={resetError}
                                                type={'email'}
                                                name={'email'}
                                                onChange={handleChange}
                                                value={values.email}/>
                                {touched.email && errors.email && <div className={s.error}>{errors.email}</div>}

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
                            <SuperButton onClick={() => {
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
    );
};

export default Login;