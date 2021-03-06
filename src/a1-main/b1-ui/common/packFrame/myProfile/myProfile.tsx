import React from 'react'
import {PackFrame} from "../packFrame/PackFrame";
import noAvatar from './noAvatar.png'
import {useAppSelector} from "../../../../b2-bll/store";
import s from "./myProfile.module.css"
import {SliderInput} from "../../sliderInput/SliderInput";
import Packs from '../../../../../a2-features/b3-cards/c1-packs/Packs';
import {DoubleCheckbox} from "../doubleCheckbox/DoubleCheckBox";


const MyProfile = () => {
    const avatar = useAppSelector<string | undefined>(state => state.profile.avatar)
    const name = useAppSelector<string>(state => state.profile.name)


    return <div>

        <PackFrame>

            <div className={s.myProf}>
                <DoubleCheckbox firstName={'My'} secondName={'All'}/>
                <div className={s.items}>

                    <div className={s.avatar}>
                        <img src={avatar ? avatar : noAvatar}
                             alt="avatar"/>
                    </div>
                    <div className={s.text}>
                        <h2>{name}</h2>
                        <div>Front-end developer</div>
                    </div>

                    <div className={s.edit}>
                        <DoubleCheckbox firstName={'Edit profile'} secondName={'Log out'}/>
                    </div>

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