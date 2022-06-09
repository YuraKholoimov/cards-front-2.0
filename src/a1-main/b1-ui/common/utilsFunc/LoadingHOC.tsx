import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../b2-bll/store";
import {Navigate} from "react-router-dom";
import Preloader from '../preloader/Preloader';


type LoginWrapperPropsType = {
    children: React.ReactNode
}
export const LoadingHOC = (props: LoginWrapperPropsType) => {
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLogin)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.loadingApp)
    if (loading) {
        return <Preloader/>
    }
    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            {props.children}
        </div>
    );
};


