import React from 'react';
import s from './NewPassword.module.css'
import SuperButton from '../../../UI/SuperButton/SuperButton';
import {setNewPasswordTC} from '../PasswordRestore-reducer';
import {useAppSelector, useTypedDispatch} from '../../../../Store/Store';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../App/App';
import {Frame} from '../../../UI/common/Frame/Frame';
import SuperInputPassword from '../../../UI/SuperInputPassword/SuperInputPassword';
import {Formik} from 'formik';
import * as yup from 'yup';

export const NewPassword = () => {

    const isChangedPassword = useAppSelector((state) => state.restore.isChangedPassword)
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    const validations = yup.object().shape({
        password: yup.string().typeError('Must be a string').required('The field is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'The passwords do not match').required('The field is required')
    })


    if (isChangedPassword) {
        navigate(PATH.CHECK_EMAIL)
    }

    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: ''
            }}
            validateOnBlur
            onSubmit={(values) => {
                console.log(values)
                dispatch(setNewPasswordTC(values.password))
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
                debugger
                return (
                    <>
                        <Frame>
                            <span><strong>It-incubator</strong></span>
                            <h2>Create New Password</h2>
                            <div className={s.input}>
                                <SuperInputPassword value={values.password} onChange={handleChange} name={'password'}
                                                    onBlur={handleBlur} placeholder={'New password'} className={s.input}/>
                                <div className={s.errors}>{touched.password && errors.password ? errors.password : null}</div>

                                <SuperInputPassword value={values.confirmPassword} onChange={handleChange} name={'confirmPassword'}
                                                    onBlur={handleBlur} placeholder={'Confirm new password'}/>
                                <div className={s.errors}>{touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}</div>
                            </div>
                            <SuperButton
                                onClick={() => {handleSubmit()}}
                                disabled={!isValid && !dirty} type={'submit'}
                            >Create New Password</SuperButton>
                        </Frame>
                    </>
                )
            }}
        </Formik>
    );
};
