import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Components/Pages/Login/Login";
import NotFound from "../Components/Pages/404/404";
import Test from '../Components/Pages/Test/Test';
import Home from "../Components/Pages/Home/Home";
import Registration from "../Components/Pages/Registration/Registration";
import Profile from "../Components/Pages/Profile/Profile";
import React, {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AppRootReducerType} from "../Store/Store";
import {ActionsType} from "../Store/LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Components/Preloader/Preloader";
import {initializeAppThunk} from "./AppReducer";

function App() {
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
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
                <Route path={'/404'} element={<NotFound/>}/>
                <Route path={'/password_restore'} element={<div>Restore your password</div>}/>
                <Route path={'/password_new'} element={<div>Your new password</div>}/>
                <Route path={'/test'} element={<Test/>}/>
            </Routes>
        </div>
    );
}

export default App;
