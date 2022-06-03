import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../a1-main/b2-bll/store";
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";
import {logoutThunk} from "../../../a1-main/b2-bll/loginReducer";
import {Frame} from "../../../a1-main/b1-ui/common/frame/Frame";
import s from "./Profile.module.css";
import {NavLink} from "react-router-dom";
import editImage from "../../../a3-assets/images/edit.png"

const Profile = () => {
    const dispatch = useDispatch<any>()
    const name = useSelector<AppRootStateType, string>(state => state.profile.name)
    const email = useSelector<AppRootStateType, string>(state => state.profile.email)
    const id = useSelector<AppRootStateType, string>(state => state.profile._id)
    const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.avatar)


    const logoutHandler = () => {
        dispatch(logoutThunk())
    }

    return (
        <>
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Profile info<NavLink className={s.link} to={'/edit-c1-profile'}><img className={s.img} src={editImage} alt=""/></NavLink></h2>

                <div><img src={avatar} alt=""/></div>
                <div className={s.text}><strong>NickName: </strong>
                    <div>{name}</div>
                </div>
                <div className={s.text}><strong>Email: </strong>
                    <div> {email}</div>
                </div>
                <div className={s.text}><strong>userID: </strong>
                    <div>{id}</div>
                </div>

                <SuperButton className={s.btn} onClick={logoutHandler}>Logout</SuperButton>
            </Frame>
        </>
    );
};

export default Profile;