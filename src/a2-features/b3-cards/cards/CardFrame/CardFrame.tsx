import React from 'react';
import styles from './CardFrame.module.css';
import Loading from "../../../../a1-main/b1-ui/common/loading/Loading";

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
