import React from 'react';
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperButton from "../../UI/SuperButton/SuperButton";
import s from './profilePage.module.css'

const ProfilePage = () => {
    return (
        <div className={s.container}>
            <span>Personal information</span>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU"
                alt="avatar"/>
            <SuperInputText/>
            <SuperInputText/>
            <div className={s.buttons}>
                <SuperButton>Cancel</SuperButton>
                <SuperButton>Save</SuperButton>
            </div>
        </div>
    );
};

export default ProfilePage;