import React from 'react';
import { NavLink } from 'react-router-dom';

export const PasswordRestore = () => {
    return (
        <div>
            <h2>it-incubator</h2>
            <h3>Forgot Your password?</h3>
            <input type="text"/>
            <span>Enter your email address and we will send you further instruction</span>
            <button>Send instructions</button>
            <span>Did you remember your password?</span>
            <NavLink to='/login'>Try logging in</NavLink>
        </div>
    );
};

