import React from 'react';
import SuperButton from "../../UI/SuperButton/SuperButton";
import SuperInputText from "../../UI/SuperInputText/SuperInputText";
import SuperCheckbox from "../../UI/SuperCheckbox/SuperCheckbox";

import s from './Test.module.css'

const Test = () => {
    return (
        <div className={s.container}>
            <SuperInputText/>
            <SuperCheckbox/>
            <SuperButton>Click me</SuperButton>
        </div>
    );
};

export default Test;