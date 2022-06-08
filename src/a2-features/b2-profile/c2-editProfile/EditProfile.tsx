import React from 'react';
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import s from './EditProfilePage.module.css'
import {editProfileThunk, initStateProfilePage} from '../../../a1-main/b2-bll/profileReducer';
import {useAppDispatch, useAppSelector} from '../../../a1-main/b2-bll/store';
import SuperEditableSpan from '../../../a1-main/b1-ui/common/superEditableSpan/SuperEditableSpan';
import SuperButton from '../../../a1-main/b1-ui/common/superButton/SuperButton';
import SuperEditableImg from '../../../a1-main/b1-ui/common/superEditableImg/SuperEditableImg';
import {Frame} from '../../../a1-main/b1-ui/common/frame/Frame';


const EditProfile = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector<initStateProfilePage>(state => state.profile)
    const navigate = useNavigate()

    const avatarIni = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU';

    const formik = useFormik({
        initialValues: {
            nickname: profile.name,
            email: profile.email,
            avatar: profile.avatar
        },
        onSubmit: values => {
            dispatch(editProfileThunk(values.nickname, values.avatar || avatarIni))
        }
    })
    return (
        <>
            <Frame>
                <span><strong>Personal information</strong></span>
                <h2>Edit profile</h2>
                <form onSubmit={formik.handleSubmit}>
                    <img
                        className={s.avatar}
                        src={profile.avatar || avatarIni}
                        alt="avatar"/>
                    <SuperEditableImg
                        id={'avatar'}
                        type={'text'}

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