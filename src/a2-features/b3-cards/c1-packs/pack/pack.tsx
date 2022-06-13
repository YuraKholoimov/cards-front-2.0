import React, {useState} from 'react';
import s from "./pack.module.css";
import {deletePackThunk, updatePackThunk} from "../../../../a1-main/b2-bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../a1-main/b2-bll/store";
import {useNavigate} from "react-router-dom";
import SuperButton from "../../../../a1-main/b1-ui/common/superButton/SuperButton";
import {PATH} from "../../../../a1-main/b1-ui/routes/RoutesComponent";
import {DeletePackForm} from "../../../../a1-main/b1-ui/common/modal/DeletePackForm/DeletePackForm";
import {EditPackForm} from "../../../../a1-main/b1-ui/common/modal/EditPackForm/EditPackForm";

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

    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [isEditeOpen, setIsEditeOpen] = useState<boolean>(false)

    const redirectToPackCards = () => {
        navigate(`/cards/${packId}`)
    }

    const redirectToLearnCard = () => {
        navigate(PATH.LEARN + `/${packId}`)
    }

    const myUserID = useAppSelector(state => state.auth.userId)
    return (
        <div>
            <div className={s.pack}>
                <div className={s.name} onClick={redirectToPackCards}>{name}</div>
                <div>{cardsCount}</div>
                <div>{updated}</div>
                <div>{userName}</div>
                <div className={s.btn} >
                    {myUserID === userId && <div className={s.btn}>
                        <SuperButton className={s.deleteBtn} onClick={() => setDeleteOpen(true)}>delete</SuperButton>
                        <SuperButton className={s.editBtn} onClick={() => setIsEditeOpen(true)}>edit</SuperButton>
                    </div>}
                    <button className={s.learn} onClick={redirectToLearnCard}>learn</button>
                </div>
                <DeletePackForm isOpen={isDeleteOpen} setDeleteClose={() => setDeleteOpen(false)} packId={packId} packName={name}/>
                <EditPackForm isOpen={isEditeOpen} setEditClose={() => setIsEditeOpen(false)}  packId={packId}/>
            </div>
        </div>
    );
};

export default Pack;