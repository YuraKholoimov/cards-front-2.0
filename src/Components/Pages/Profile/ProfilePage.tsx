import React from 'react';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperButton from "../../UI/SuperButton/SuperButton";
import s from './profilePage.module.css'
import {editProfile, initStateProfilePage} from "./profilePageReducer";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from '../../../Store/Store';
import {Frame} from '../../UI/common/Frame/Frame';
import Preloader from '../../UI/common/Preloader/Preloader';
import {logoutThunk} from '../../../Store/LoginReducer';

const ProfilePage = () => {
    const profile = useSelector<AppRootStateType, initStateProfilePage>(state => state.profilePage)
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

    const logoutHandler = () => {
        dispatch(logoutThunk())
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
                    <label>
                        Nikname
                    </label>
                    <SuperInputText id={'nickname'}
                                    type={'text'}
                                    {...formik.getFieldProps('nickname')}/>
                </div>
                <div className={s.input}>
                    <label htmlFor="email">Email</label>
                    <SuperInputText
                        id={'email'}
                        type={'text'}

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

export default ProfilePage;