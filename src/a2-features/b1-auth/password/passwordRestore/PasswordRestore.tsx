import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppSelector, useTypedDispatch} from '../../../../a1-main/b2-bll/store';
import {sendEmailThunk} from '../../../../a1-main/b2-bll/passwordRestoreReducer';
import s from './PasswordRestore.module.css'
import {Frame} from '../../../../a1-main/b1-ui/common/frame/Frame';
import {Formik} from 'formik';
import * as yup from 'yup'
import Preloader from '../../../../a1-main/b1-ui/common/preloader/Preloader';
import { PATH } from '../../../../a1-main/b1-ui/routes/RoutesComponent';
import SuperInputText from '../../../../a1-main/b1-ui/common/superInputText/SuperInputText';
import SuperButton from '../../../../a1-main/b1-ui/common/superButton/SuperButton';

export const PasswordRestore = () => {
    const loading = useAppSelector<boolean>(state => state.app.loadingApp)
    const isSend = useAppSelector(state => state.restore.isSend)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const validations = yup.object().shape({
        email: yup.string().email('Type a right email').required('The field is required')
    })

    if (isSend) {
        navigate(PATH.CHECK_EMAIL)
    }
    if (loading) {
        return <Preloader/>
    }
    return (
        <Formik
            initialValues={{
                email: ''
            }}
            validateOnBlur
            onSubmit={(values) => {
                console.log(values)
                dispatch(sendEmailThunk(values.email))
            }}
            validationSchema={validations}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty
              }) => {
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
                                <SuperInputText
                                    onChange={handleChange}
                                    name={'email'}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>
                            <div className={s.errors}>{touched.email && errors.email ? errors.email : null}</div>
                            <SuperButton
                                onClick={() => {
                                    handleSubmit()
                                }}
                                disabled={!isValid && !dirty}
                                type={'submit'}
                            >
                                Send instructions</SuperButton>
                            <p>
                                <p className={s.text}>Did you remember your password?</p>
                                <NavLink to={PATH.LOGIN} className={s.linkToLogin}>Try logging in</NavLink>
                            </p>
                        </Frame>
                    </>
                )
            }}
        </Formik>


    )
        ;
};

