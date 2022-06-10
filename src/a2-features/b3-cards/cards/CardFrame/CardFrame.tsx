import React from 'react';
import styles from './CardFrame.module.css';

type PropsType = {
    children: React.ReactNode
}
export const CardFrame = (props: PropsType) => {
    return (
        <div className={styles.cardFrame}>
            {props.children}
        </div>
    );
};
