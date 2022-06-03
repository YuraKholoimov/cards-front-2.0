import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from '../../../a2-features/b1-auth/login/Login';
import {Registration} from '../../../a2-features/b1-auth/registration/Registration';
import {LoadingHOC} from '../common/utilsFunc/LoadingHOC';
import Profile from '../../../a2-features/b2-profile/c1-profile/Profile';
import EditProfile from '../../../a2-features/b2-profile/c2-editProfile/EditProfile';
import NotFound from '../common/error/404';
import {PasswordRestore} from '../../../a2-features/b1-auth/password/passwordRestore/PasswordRestore';
import {CheckEmail} from '../../../a2-features/b1-auth/password/checkEmail/CheckEmail';
import {NewPassword} from '../../../a2-features/b1-auth/password/newPassword/NewPassword';
import Test from '../../../a2-features/b4-test/Test';

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/c1-profile',
    PASSWORD_RESTORE: '/password-restore',
    NEW_PASSWORD: '/new-password',
    CHECK_EMAIL: '/check-email',
    TEST: '/test',
    NOT_FOUND: '/404',
    EDIT_PROFILE: '/edit-c1-profile',
}

export const RoutesComponent = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Login/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<LoadingHOC><Profile/></LoadingHOC>}/>
                <Route path={PATH.EDIT_PROFILE} element={<EditProfile/>}/>
                <Route path={'/*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
                <Route path={PATH.NOT_FOUND} element={<NotFound/>}/>
                <Route path={PATH.PASSWORD_RESTORE} element={<PasswordRestore/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={PATH.NEW_PASSWORD + `/*`} element={<NewPassword/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
            </Routes>
        </>
    );
};

