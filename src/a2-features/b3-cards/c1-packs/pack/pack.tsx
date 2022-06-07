import React, {useState} from 'react';
import s from "./pack.module.css";
import {deletePackThunk, updatePackThunk} from "../../../../a1-main/b2-bll/packsReducer";
import {useAppDispatch} from "../../../../a1-main/b2-bll/store";
import {useNavigate} from "react-router-dom";

type PackType = {
    name: string
    cardsCount: number
    updated: string
    userName: string
    packId: string
}


const Pack: React.FC<PackType> = ({name, cardsCount, userName, updated, packId}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deletePackHandler = () => {
        dispatch(deletePackThunk(packId))
    }

    const editPackNameHandler = () => {
        let newPackName = prompt('Название пака')
        if (newPackName)
            dispatch(updatePackThunk({_id: packId, name: newPackName}))
    }
    const redirectToPackCards = () => {
        navigate(`/cards/${packId}`)
    }


    return (
        <div>
            <div className={s.item}>
                <div onClick={redirectToPackCards}>{name}</div>
                <div>{cardsCount}</div>
                <div>{updated}</div>
                <div>{userName}</div>
                <div>
                    <button onClick={deletePackHandler}>delete</button>
                    <button onClick={editPackNameHandler}> edit</button>
                    <button>learn</button>
                </div>
            </div>
        </div>
    );
};

export default Pack;