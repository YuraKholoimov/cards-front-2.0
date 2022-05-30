import React, {useState} from 'react';
import {LoginWrapper} from '../LoginWrapper/LoginWrapper';
import s from './NewPassword.module.css'
import SuperInputText from '../../../UI/SuperInputText/SuperInputText';
import SuperButton from '../../../UI/SuperButton/SuperButton';
import {setNewPasswordTC} from '../PasswordRestore-reducer';
import {useAppSelector, useTypedDispatch} from '../../../../Store/Store';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../App/App';

export const NewPassword = () => {

    const isChangedPassword = useAppSelector((state) => state.restore.isChangedPassword)
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()
    const [password, setPassword] = useState('');

    const onClickHandler = () =>{
        dispatch(setNewPasswordTC(password))
        setPassword('')
    }

    if(isChangedPassword) {
        navigate(PATH.CHECK_EMAIL)
    }

    return (
        <LoginWrapper>
            <h3 className={s.subtitle}>Create New Password</h3>
            <div className={s.input}>
                <SuperInputText value={password} onChangeText={setPassword} placeholder={'Password'}/>
            </div>
            <p className={s.text}>Create new password and we will send you further instructions to email</p>
            <div>
                <SuperButton onClick={onClickHandler}>Create New Password</SuperButton>
            </div>
        </LoginWrapper>
    );
};

