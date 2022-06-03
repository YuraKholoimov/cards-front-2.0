import React from 'react';
import {useDispatch} from "react-redux";
import {AppRootStateType, useAppSelector} from "../../../a1-main/b2-bll/store";
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";
import {ActionsType, logoutThunk} from "../../../a1-main/b2-bll/loginReducer";
import {Frame} from "../../../a1-main/b1-ui/common/frame/Frame";
import s from "./Profile.module.css";
import {NavLink} from "react-router-dom";
import editImage from "../../../a3-assets/images/edit.png"
import {ThunkDispatch} from "redux-thunk";

const Profile = () => {
    const dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType> = useDispatch()
    const name = useAppSelector<string>(state => state.profile.name)
    const email = useAppSelector<string>(state => state.profile.email)
    const id = useAppSelector<string>(state => state.profile._id)
    const avatar = useAppSelector<string | undefined>(state => state.profile.avatar)


    const logoutHandler = () => {
        dispatch(logoutThunk())
    }

    return (
        <>
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Profile info<NavLink className={s.link} to={'/edit-c1-profile'}><img className={s.img}
                                                                                         src={editImage}
                                                                                         alt=""/></NavLink></h2>

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