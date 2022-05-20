import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Components/Pages/Login/Login";
import NotFound from "../Components/Pages/404/404";
import Test from '../Components/Pages/Test/Test';
import Home from "../Components/Pages/Home/Home";
import Registration from "../Components/Pages/Registration/Registration";
import Profile from "../Components/Pages/Profile/Profile";

function App() {
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
