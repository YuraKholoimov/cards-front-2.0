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

function App() {

    const dispatch = useAppDispatch();

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <Preloader/>
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
