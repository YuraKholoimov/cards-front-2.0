import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Components/Pages/Login/Login";
import NotFound from "../Components/Pages/404/404";
import Test from '../Components/Pages/Test/Test';
import {Registration} from "../Components/Pages/Registration/Registration";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../Store/Store";
import ProfilePage from "../Components/Pages/Profile/ProfilePage";
import React, {useEffect} from "react";
import {PasswordRestore} from '../Components/Pages/Password_Restore/PasswordRestore';
import {CheckEmail} from '../Components/Pages/Password_Restore/CheckEmail/CheckEmail';
import {NewPassword} from '../Components/Pages/Password_Restore/NewPassword/NewPassword';
import {initializeAppThunk } from '../Store/AppReducer';
import Preloader from '../Components/UI/common/Preloader/Preloader';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RESTORE: '/password-restore',
    NEW_PASSWORD: '/new-password',
    CHECK_EMAIL: '/check-email',
    TEST: '/test',
    NOT_FOUND: '/404',
}

function App() {

    const dispatch = useAppDispatch();

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppThunk())
    }, [])


    if (!isInitialized) {
        return <Preloader/>
    }
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Login/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<ProfilePage/>}/>
                <Route path={'/*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
                <Route path={PATH.NOT_FOUND} element={<NotFound/>}/>
                <Route path={PATH.PASSWORD_RESTORE} element={<PasswordRestore/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
            </Routes>
        </div>
    );
}

export default App;
