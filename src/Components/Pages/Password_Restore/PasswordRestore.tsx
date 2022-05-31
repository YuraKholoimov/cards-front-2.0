import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import SuperInputText from '../../UI/SuperInputText/SuperInputText';
import SuperButton from '../../UI/SuperButton/SuperButton';
import {useAppSelector, useTypedDispatch} from '../../../Store/Store';
import {PATH} from '../../../App/App';
import {sendEmailTC} from './PasswordRestore-reducer';
import s from './PasswordRestore.module.css'
import {Frame} from '../../UI/common/Frame/Frame';
import Preloader from '../../UI/common/Preloader/Preloader';
import {Formik} from 'formik';
import * as yup from 'yup'

export const PasswordRestore = () => {
    const loading = useAppSelector<boolean>(state => state.app.status)
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
                dispatch(sendEmailTC(values.email))
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

