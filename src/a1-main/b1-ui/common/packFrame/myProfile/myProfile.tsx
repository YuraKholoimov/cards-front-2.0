import React, {useState} from 'react'
import {PackFrame} from "../packFrame/PackFrame";
import noAvatar from './noAvatar.png'
import {useAppSelector} from "../../../../b2-bll/store";
import s from "./myProfile.module.css"
import {Frame} from "../../frame/Frame";
import {SliderInput} from "../../sliderInput/SliderInput";
import Packs from '../../../../../a2-features/b3-cards/c1-packs/Packs';
import {DoubleCheckbox} from "../doubleCheckbox/DoubleCheckBox";
import {SearchField} from "../../searchField/SearchField";
import {NavLink} from "react-router-dom";
import Pagination from "../../pagination/Pagination";
import SuperSelect from "../../seperSelect/SuperSelect";
import SuperButton from "../../superButton/SuperButton";
import {SuperRange} from "../../sliderInput/superRange/SuperRange";


const MyProfile = () => {
    const avatar = useAppSelector<string | undefined>(state => state.profile.avatar)
    const name = useAppSelector<string>(state => state.profile.name)


    return <div>

        <PackFrame>

            <div className={s.myProf}>
                <DoubleCheckbox/>
                <div className={s.items}>

                    <div className={s.avatar}>
                        <img src={avatar ? avatar : noAvatar}
                             alt="avatar"/>
                    </div>
                    <div className={s.text}>
                        <h2>{name}</h2>
                        <div>Front-end developer</div>
                    </div>
                    <NavLink className={s.edit} to={'/edit-c1-profile'}>
                        <button className={s.button}>Edit profile</button>
                    </NavLink>

                </div>
                <SliderInput/>
            </div>

            <div className={s.packs}>
                <Packs/>
            </div>

        </PackFrame>
    </div>
}
export default MyProfile