import React, {useEffect, useState} from 'react';
import SuperButton from "../../UI/SuperButton/SuperButton";
import {editProfile, initStateProfilePage} from "./editProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from '../../../Store/Store';
import {Frame} from '../../UI/common/Frame/Frame';
import Preloader from '../../UI/common/Preloader/Preloader';
import {logoutThunk} from '../../../Store/LoginReducer';
import SuperEditableSpan from "../../UI/SuperEditableSpan/SuperEditableSpan";

import s from './editProfilePage.module.css'

const EditProfile = () => {

    const profile = useSelector<AppRootStateType, initStateProfilePage>(state => state.profilePage)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.status)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isInitialize)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU';

    const formik = useFormik({
        initialValues: {
            nickname: profile.name,
            email: profile.email,
        },
        onSubmit: values => {
            console.log(values)
            dispatch(editProfile(values.nickname, avatar))
        }
    })
    if (loading) {
        return <Preloader/>
    }
    const logoutHandler = () => {
        dispatch(logoutThunk())
    }
    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Frame>
                <span><strong>Personal information</strong></span>
                <h2>Edit profile</h2>
                <img
                    src={profile.avatar || avatar}
                    alt="avatar"/>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.input}>
                        <label>Nickname</label>
                        <SuperEditableSpan
                            id={'nickname'}
                            type={'text'}
                            spanProps={{children: formik.values.nickname
                                    ? formik.values.nickname
                                    : 'Change your nickname ✒️'}}

                            {...formik.getFieldProps('nickname')}
                        />
                    </div>
                    <div className={s.input}>
                        <label htmlFor="email">Email</label>
                        <SuperEditableSpan
                            id={'email'}
                            type={'text'}
                            spanProps={{children: formik.values.email
                                    ? formik.values.email
                                    : 'Change your email ✒️'}}

                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    <div className={s.buttons}>
                        <SuperButton>Cancel</SuperButton>
                        <SuperButton type="submit">Save</SuperButton>

                    </div>
                    <div>
                        <SuperButton onClick={logoutHandler}>logout</SuperButton>
                    </div>
                </form>
            </Frame>
        </>
    );
};

export default EditProfile;