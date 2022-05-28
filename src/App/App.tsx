import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Components/Pages/Login/Login";
import NotFound from "../Components/Pages/404/404";
import Test from '../Components/Pages/Test/Test';
import Home from "../Components/Pages/Home/Home";
import Registration from "../Components/Pages/Registration/Registration";
import Profile from "../Components/Pages/Profile/Profile";
import {PasswordRestore} from '../Components/Pages/Password_Restore/PasswordRestore';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RESTORE: '/password-restore',
    NEW_PASSWORD: '/new-password',
    TEST: '/test',
    NOT_FOUND: '/404',
}

function App() {
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
                <Route path={PATH.NEW_PASSWORD} element={<div>Your new password</div>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
            </Routes>
        </div>
    );
}

export default App;
