import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import s from './EditProfilePage.module.css'
import {editProfile, initStateProfilePage } from '../../../a1-main/b2-bll/profileReducer';
import {AppRootStateType} from '../../../a1-main/b2-bll/store';
import { logoutThunk } from '../../../a1-main/b2-bll/loginReducer';
import SuperEditableSpan from '../../../a1-main/b1-ui/common/superEditableSpan/SuperEditableSpan';
import SuperButton from '../../../a1-main/b1-ui/common/superButton/SuperButton';
import Preloader from '../../../a1-main/b1-ui/common/preloader/Preloader';
import SuperEditableImg from '../../../a1-main/b1-ui/common/superEditableImg/SuperEditableImg';
import { Frame } from '../../../a1-main/b1-ui/common/frame/Frame';


const EditProfile = () => {
    const [value, setValue] = useState<string>('')
    const profile = useSelector<AppRootStateType, initStateProfilePage>(state => state.profile)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.status)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLogin)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const avatarIni = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU';

    const formik = useFormik({
        initialValues: {
            nickname: profile.name,
            email: profile.email,
            avatar: profile.avatar
        },
        onSubmit: values => {
            console.log(values)

            dispatch(editProfile(values.nickname, values.avatar || avatarIni))
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
                <form onSubmit={formik.handleSubmit}>
                    <img
                        className={s.avatar}
                        // src={profile.avatar  avatar}
                        src={profile.avatar || avatarIni}
                        alt="avatar"/>
                    <SuperEditableImg
                        id={'avatar'}
                        type={'text'}
                        src={'https://www.svgrepo.com/show/46213/camera-front-view.svg'}

                        {...formik.getFieldProps('avatar')}
                    />
                    <div className={s.input}>
                        <label htmlFor="nickname">Nickname</label>
                        <SuperEditableSpan
                            id={'nickname'}
                            type={'text'}
                            spanProps={{
                                children: formik.values.nickname
                                    ? undefined
                                    : 'Change your nickname'
                            }}

                            {...formik.getFieldProps('nickname')}
                        />
                    </div>
                    <div className={s.input}>
                        <label htmlFor="email">Email</label>
                        <SuperEditableSpan
                            id={'email'}
                            type={'text'}
                            spanProps={{
                                children: formik.values.email
                                    ? undefined
                                    : 'Change your email'
                            }}

                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    <div className={s.buttons}>
                        <SuperButton onClick={() => navigate(-1)} >Back</SuperButton>
                        <SuperButton type="submit">Save</SuperButton>
                    </div>
                </form>
            </Frame>
        </>
    );
};

export default EditProfile;