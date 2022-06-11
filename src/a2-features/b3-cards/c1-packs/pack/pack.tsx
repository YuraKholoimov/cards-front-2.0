import React from 'react';
import s from "./pack.module.css";
import {deletePackThunk, updatePackThunk} from "../../../../a1-main/b2-bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../a1-main/b2-bll/store";
import {useNavigate} from "react-router-dom";

type PackType = {
    name: string
    cardsCount: number
    updated: string
    userName: string
    packId: string
    userId: string
}


const Pack: React.FC<PackType> = ({name, cardsCount, userName, updated, packId, userId}) => {
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

    const myUserID = useAppSelector(state => state.auth.userId)


    return (
        <tr className={s.tr}>
            <td className={s.cardsName}>
                <div className={s.name} onClick={redirectToPackCards}>{name}</div>
            </td>
            <td className={s.cardsCount}>
                <div>{cardsCount}</div>
            </td>
            <td className={s.cardsUpdated}>
                <div>{updated}</div>
            </td>
            <td className={s.cardsUserName}>
                <div>{userName}</div>
            </td>

            <td className={s.cardsBtn}>
                {myUserID === userId && <>
                    <button className={s.delete} onClick={deletePackHandler}>delete</button>
                    <button className={s.learn} onClick={editPackNameHandler}>edit</button>
                </>}
                <span>
                        <button className={s.learn}>learn</button>
                    </span>
            </td>
        </tr>

    );
};

export default Pack;