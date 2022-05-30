import React from 'react';
import s from './LoginWrapper.module.css'


type LoginWrapperPropsType = {
    children: React.ReactNode
}

export const LoginWrapper = (props: LoginWrapperPropsType) => {
    return (
        <div className={s.loginWrapper}>
            <div className={s.frame}>
                <h2 className={s.title}>It-incubator</h2>
                {props.children}
            </div>
        </div>
    );
};

