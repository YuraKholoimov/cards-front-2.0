import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import SuperInputText from '../../UI/SuperInputText/SuperInputText';
import SuperButton from '../../UI/SuperButton/SuperButton';
import {useAppSelector, useTypedDispatch} from '../../../Store/Store';
import {PATH} from '../../../App/App';
import {passwordForgotTC} from './PasswordRestore-reducer';

export const PasswordRestore = () => {

    const isSend = useAppSelector<boolean>((state) => state.restore.isSend)

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')

    const onClickHandler = () => {
        dispatch(passwordForgotTC(email))
    }


    if (isSend) {
        navigate(PATH.LOGIN)
    }


    return (
        <div>
            <h2>it-incubator</h2>
            <h3>Forgot Your password?</h3>
            <div>
                <label>Email</label>
                <SuperInputText value={email} onChangeText={setEmail}/>
            </div>
            <p>Enter your email address and we will send you further instruction</p>
            <SuperButton onClick={onClickHandler}>Send instructions</SuperButton>
            <p>Did you remember your password?</p>
            <NavLink to='/login'>Try logging in</NavLink>
        </div>
    );
};

