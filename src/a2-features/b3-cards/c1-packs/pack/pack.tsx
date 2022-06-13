import React from 'react';
import s from "./pack.module.css";
import {deletePackThunk, updatePackThunk} from "../../../../a1-main/b2-bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../a1-main/b2-bll/store";
import {useNavigate} from "react-router-dom";
import { PATH } from '../../../../a1-main/b1-ui/routes/RoutesComponent';

type PackType = {
    name: string
    cardsCount: number
    updated: string
    userName: string
    packId: string
    userId: string
}


const Pack: React.FC<PackType> = ({name, cardsCount, userName, updated, packId,userId}) => {
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

    const redirectToLearnCard = () => {
        navigate(PATH.LEARN + `/${packId}`)
    }

    const myUserID = useAppSelector(state => state.auth.userId)


    return (
        <div>
            <div className={s.cards}>
                <div className={s.name} onClick={redirectToPackCards}>{name}</div>
                <div>{cardsCount}</div>
                <div>{updated}</div>
                <div>{userName}</div>
                <div>
                    {myUserID === userId && <div>
                        <button onClick={deletePackHandler}>delete</button>
                        <button onClick={editPackNameHandler}>edit</button>
                    </div>}
                    <button className={s.learn} onClick={redirectToLearnCard}>learn</button>
                </div>
            </div>
        </div>
    );
};

export default Pack;