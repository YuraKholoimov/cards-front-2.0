import React, {useEffect} from 'react';
import {Navigate, NavLink} from "react-router-dom";
import s from './Registration.module.css';
import {Frame} from "../../../a1-main/b1-ui/common/frame/Frame";
import SuperInputPassword from "../../../a1-main/b1-ui/common/superInputPassword/SuperInputPassword";
import {registerThunk, setRegister} from "../../../a1-main/b2-bll/registerReducer";
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import Preloader from '../../../a1-main/b1-ui/common/preloader/Preloader';
import SuperInputText from '../../../a1-main/b1-ui/common/superInputText/SuperInputText';
import {Formik} from "formik";
import * as yup from "yup";

export const Registration = () => {
    const validations = yup.object().shape({
        email: yup.string().email('Invalid email address'),
        password: yup.string().typeError('Must be a string').required('The field is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'The passwords do not match').required('The field is required')
    })
    const error = useAppSelector<string>(state => state.auth.error)
    const isRegistered = useAppSelector<boolean>(state => state.register.isRegistered)
    const loading = useAppSelector<boolean>(state => state.app.loadingApp);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(setRegister(false));
        }
    }, [])

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }
    if (loading) {
        return <Preloader/>
    }

    return (
        <Formik initialValues={
            {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
                onSubmit={(values) => {
                    dispatch(registerThunk(values.email, values.password))
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
                            <h2>Sign up</h2>
                            {error && <div className={s.error}>{error}</div>}
                            <div className={s.input}>
                                <label>
                                    Email
                                </label>
                                <SuperInputText
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
                                {touched.password && errors.password && <div className={s.error}>{errors.password}</div>}
                            </div>
                            <div className={s.input}>
                                <label>
                                    Confirm Password
                                </label>
                                <SuperInputPassword
                                    name={'confirmPassword'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}/>
                                {touched.confirmPassword && errors.confirmPassword && <div className={s.error}>{errors.confirmPassword}</div>}
                            </div>

                            <SuperButton onClick={() => {
                                handleSubmit()
                            }} style={{padding: '10px 60px'}}>Register</SuperButton>

                            <p>
                                <NavLink to={'/login'} className={s.linkLogin}>
                                    <p className={s.signUpText}>To login</p>
                                </NavLink>
                            </p>

                        </Frame>
                    </>
                )
            }}
        </Formik>
    );
};
