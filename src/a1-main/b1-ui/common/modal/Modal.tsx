import React, {CSSProperties, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.css'


type ModalPropsType = {
    setModalIsClose: () => void
    isOpen: boolean
    backgroundStyle?: CSSProperties
    modalStyle?: CSSProperties
    children: ReactNode
}

export const Modal: React.FC<ModalPropsType> = ({setModalIsClose, isOpen, children,
                                                   backgroundStyle, modalStyle}) => {


    if (!isOpen) return null

    return ReactDOM.createPortal(
        <>
            <div style={{...backgroundStyle}} className={s.background} onClick={setModalIsClose}/>
            <div style={{...modalStyle}} className={`${s.modal}`}>
                <div className={s.escape}><div onClick={setModalIsClose}>✘</div></div>
                {children}
            </div>
        </>, document.body)
}

