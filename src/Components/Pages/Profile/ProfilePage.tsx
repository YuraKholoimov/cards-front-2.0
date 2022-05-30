import React, {useEffect} from 'react';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperButton from "../../UI/SuperButton/SuperButton";
import s from './profilePage.module.css'
import {editProfile, initStateProfilePage} from "./profilePageReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducer} from "../../../Store/Store";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    const profile = useSelector<AppRootReducer, initStateProfilePage>(state => state.profilePage)
    const isInitialized = useSelector<AppRootReducer, boolean>(state => state.app.isInitialized)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU';

    useEffect(() => {
        if (!isInitialized) {
            navigate('/profile')
        } else {
            navigate('/login')
        }

    }, [])

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

    return (
        <div className={s.container}>
            <span>Personal information</span>
            <img
                src={profile.avatar || avatar}
                alt="avatar"/>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="Nickname">Nickname</label>
                <SuperInputText
                    id={'nickname'}
                    type={'text'}
                    {...formik.getFieldProps('nickname')}

                />
                <label htmlFor="email">Email</label>
                <SuperInputText
                    id={'email'}
                    type={'text'}

                    {...formik.getFieldProps('email')}
                />
                <div className={s.buttons}>
                    <SuperButton>Cancel</SuperButton>
                    <SuperButton type="submit">Save</SuperButton>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;