import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Store/Store";
import {Navigate} from "react-router-dom";
import Preloader from "../Components/UI/common/Preloader/Preloader";

type LoginWrapperPropsType = {
    children: React.ReactNode
}
export const LoadingHOC = (props: LoginWrapperPropsType) => {
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLogin)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.status)
    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }
    if (loading) {
        return <Preloader/>
    }
    return (
        <div>
            {props.children}
        </div>
    );
};


