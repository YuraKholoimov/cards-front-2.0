import React, {useState} from 'react';
import {LoginWrapper} from '../LoginWrapper/LoginWrapper';
import s from './NewPassword.module.css'
import SuperButton from '../../../UI/SuperButton/SuperButton';
import {setNewPasswordTC} from '../PasswordRestore-reducer';
import {useAppSelector, useTypedDispatch} from '../../../../Store/Store';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../App/App';
import { Frame } from '../../../UI/common/Frame/Frame';
import SuperInputPassword from '../../../UI/SuperInputPassword/SuperInputPassword';

export const NewPassword = () => {

    const isChangedPassword = useAppSelector((state) => state.restore.isChangedPassword)
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onClickHandler = () =>{
        dispatch(setNewPasswordTC(password))
        setPassword('')
    }

    if(isChangedPassword) {
        navigate(PATH.CHECK_EMAIL)
    }

    return (
             <>

            <Frame>
                <span><strong>It-incubator</strong></span>
                <h2>Create New Password</h2>
                <div className={s.input}>
                    <SuperInputPassword value={password} onChangeText={setPassword} placeholder={'Password'}/>
                    <SuperInputPassword value={confirmPassword} onChangeText={setConfirmPassword} placeholder={'Confirm password'}/>
                </div>

                <SuperButton onClick={onClickHandler}>Create New Password</SuperButton>


            </Frame>
        </>
    );
};

