import React, {useState} from 'react';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperCheckbox from "../../UI/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../UI/SuperButton/SuperButton";
import s from './Login.module.css'
import {useSelector} from "react-redux";
import {AppRootReducerType} from "../../../Store/Store";

const Login = () => {
    // const dispatch:ThunkDispatch<AppRootReducerType, unknown, ActionsType> = useDispatch()
    const isLogin = useSelector<AppRootReducerType, boolean>(state => state.auth.isLoggedIn)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    // const loginHandler = () => {
    //     const data = {
    //         login,
    //         password,
    //         rememberMe: checked,
    //     };
    //     dispatch(loginThunk(data))
    // }
    return (
        <div>
            <h3>It-incubator</h3>
            <h3>Sign in</h3>
            <div>

                <SuperInputText value={login} onChangeText={setLogin}/>

            </div>

            <div>

                <SuperInputText type={'password'} value={password} onChangeText={setPassword}/>

            </div>

            <div>

                <SuperCheckbox
                    onChangeChecked={setChecked} checked={checked}/> Forgot Password


            </div>

            <div className={s.btnLogin}>

                <SuperButton onClick={() => {
                    console.log(login, password, checked)
                }}>login</SuperButton>

            </div>

            <div>

                Don't have an account?

            </div>

            <div>

                Sign up

            </div>

        </div>
    );
};
//test branch
export default Login;