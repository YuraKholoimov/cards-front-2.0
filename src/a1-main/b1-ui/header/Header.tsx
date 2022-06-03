import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/RoutesComponent';
import s from './Header.module.css'

export const Header = () => {
    return (
        <div className={s.header}>
            {/*<NavLink to={'/'}>Main</NavLink>*/}
            <NavLink className={s.link} to={PATH.LOGIN}>Login</NavLink>
            <NavLink className={s.link} to={PATH.REGISTRATION}>Registration</NavLink>
            <NavLink className={s.link} to={PATH.PASSWORD_RESTORE}>Restore password</NavLink>
            <NavLink className={s.link} to={PATH.PROFILE}>Profile</NavLink>
            <NavLink className={s.link} to={PATH.NEW_PASSWORD}>Set new password</NavLink>
            {/*<NavLink className={s.link} to={PATH.NOT_FOUND}>404 Not found</NavLink>*/}
        </div>
    );
};

