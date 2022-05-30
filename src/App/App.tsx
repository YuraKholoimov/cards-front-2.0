import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Components/Pages/Login/Login";
import NotFound from "../Components/Pages/404/404";
import Test from '../Components/Pages/Test/Test';
import Home from "../Components/Pages/Home/Home";
import Profile from "../Components/Pages/Profile/Profile";
import {Registration} from "../Components/Pages/Registration/Registration";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../Store/Store";
import {useEffect} from "react";
import Preloader from "../Components/UI/common/Preloader/Preloader";
import {initializeAppTC} from "../Store/AppReducer";
import ProfilePage from "../Components/Pages/Profile/ProfilePage";
import React, {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AppRootReducerType} from "../Store/Store";
import {ActionsType} from "../Store/LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Components/Preloader/Preloader";
import {initializeAppThunk} from "../Store/AppReducer";
import {PasswordRestore} from '../Components/Pages/Password_Restore/PasswordRestore';
import {CheckEmail} from '../Components/Pages/Password_Restore/CheckEmail/CheckEmail';
import { NewPassword } from '../Components/Pages/Password_Restore/NewPassword/NewPassword';

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
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <Preloader/>
    }
    const isInitialize = useSelector<AppRootReducerType, boolean>(state => state.app.isInitialized)
    const dispatch:ThunkDispatch<AppRootReducerType, unknown, ActionsType> = useDispatch()
    useEffect(() => {
        dispatch(initializeAppThunk())


    }, [])
if(!isInitialize) {
    return    <Preloader/>
}
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
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
