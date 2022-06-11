import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";
import {logoutThunk} from "../../../a1-main/b2-bll/loginReducer";
import {Frame} from "../../../a1-main/b1-ui/common/frame/Frame";
import s from "./Profile.module.css";
import {NavLink} from "react-router-dom";
import editImage from "../../../a3-assets/images/edit.png"
import Packs from "../../b3-cards/c1-packs/Packs";
import {SearchField} from "../../../a1-main/b1-ui/common/searchField/SearchField";
import {SliderInput} from "../../../a1-main/b1-ui/common/sliderInput/SliderInput";
import Pagination from "../../../a1-main/b1-ui/common/pagination/Pagination";
import SuperSelect from "../../../a1-main/b1-ui/common/seperSelect/SuperSelect";


const Profile = () => {
    const dispatch = useAppDispatch()
    const name = useAppSelector<string>(state => state.profile.name)
    const email = useAppSelector<string>(state => state.profile.email)
    const id = useAppSelector<string>(state => state.profile._id)
    const avatar = useAppSelector<string | undefined>(state => state.profile.avatar)
    const arrValue = ['5','10','15','20']
    const [value, setValue] = useState(arrValue[0])
    const logoutHandler = () => {
        dispatch(logoutThunk())
    }

    return (
        <>
            <div className={s.profileContainers}>
                <Frame>
                    {/*<SearchField/>*/}
                    <SliderInput/>
                    <span><strong>It-incubator <NavLink to={'/packs'}>УДАЛИТЬ</NavLink></strong></span>
                    <h2>Profile info<NavLink className={s.link} to={'/edit-c1-profile'}><img className={s.img}
                                                                                             src={editImage}
                                                                                             alt=""/></NavLink></h2>

                    <div><img src={avatar} alt=""/></div>
                    <div className={s.text}><strong>NickName: </strong>
                        <div>{name}</div>
                    </div>
                    <div className={s.text}><strong>Email: </strong>
                        <div> {email}</div>
                    </div>
                    <div className={s.text}><strong>userID: </strong>
                        <div>{id}</div>
                    </div>

                    <SuperButton className={s.btn} onClick={logoutHandler}>Logout</SuperButton>


                </Frame>
                <div className={s.packsContainer}>
                    <Packs/>
                    {/*<Pagination/>*/}

                    <SuperSelect value={value} options={arrValue} onChangeOption={setValue}/>
                </div>

            </div>

        </>
    );
};

export default Profile;