import React from 'react';
import SuperButton from '../../a1-main/b1-ui/common/superButton/SuperButton';
import SuperCheckbox from '../../a1-main/b1-ui/common/superCheckbox/SuperCheckbox';
import SuperInputText from '../../a1-main/b1-ui/common/superInputText/SuperInputText';


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