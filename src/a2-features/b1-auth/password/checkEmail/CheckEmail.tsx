import React from 'react';
import {useAppSelector} from '../../../../a1-main/b2-bll/store';
import s from './CheckEmail.module.css';
import { Frame } from '../../../../a1-main/b1-ui/common/frame/Frame';
import MailImage from './MailImage';


export const CheckEmail = () => {

    const emailName = useAppSelector(state => state.restore.email)

    return (
        <>
            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Check Email</h2>
                <div>
                    
            <MailImage/>

                </div>
                <p className={s.text}>We've sent an Email with instructions to <span>{emailName}</span></p>

            </Frame>
        </>
    );
};

