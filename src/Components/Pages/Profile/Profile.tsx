import React from 'react';
import SuperButton from "../../UI/SuperButton/SuperButton";
import {ThunkDispatch} from "redux-thunk";
import {AppRootReducerType} from "../../../Store/Store";
import {ActionsType, logoutThunk} from "../../../Store/LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import Preloader from "../../Preloader/Preloader";

const Profile = () => {
    const dispatch:ThunkDispatch<AppRootReducerType, unknown, ActionsType> = useDispatch()
    const isLogin = useSelector<AppRootReducerType, boolean>(state => state.auth.isInitialize)
    const logoutHandler = () => {
        dispatch(logoutThunk())
    }
    if(!isLogin) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            Profile page
            <SuperButton onClick={logoutHandler}>logout</SuperButton>

        </div>
    );
};

export default Profile;