import React from 'react';
import { LoginWrapper } from '../LoginWrapper/LoginWrapper';
import {useAppSelector} from '../../../../Store/Store';
import email from '../../../../assets/images/email2.png';
import s from './CheckEmail.module.css';

export const CheckEmail = () => {

    const emailName = useAppSelector(state => state.restore.email)

    return (
        <LoginWrapper>
            <div className={s.image}>
                <img src={email} alt=""/>
            </div>
                <h3 className={s.subtitle}>Check Email</h3>
                <p className={s.text}>We've sent an Email with instructions to <span>{emailName}</span></p>
        </LoginWrapper>
    );
};

