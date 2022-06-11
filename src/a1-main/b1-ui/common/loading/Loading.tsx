import React from 'react';
import s from './Loading.module.css'
const Loading = () => {
    return (
        <div>
            <div className={s.loading_line}></div>
        </div>
    );
};

export default Loading;