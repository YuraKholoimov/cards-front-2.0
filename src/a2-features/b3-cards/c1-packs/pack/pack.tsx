import React, {useState} from 'react';
import s from "./pack.module.css";
import {useAppSelector} from "../../../../a1-main/b2-bll/store";
import {useNavigate} from "react-router-dom";
import {DeletePackForm} from '../../../../a1-main/b1-ui/common/modal/DeletePackForm/DeletePackForm';
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

    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [isEditeOpen, setIsEditeOpen] = useState<boolean>(false)

    const redirectToPackCards = () => {
        navigate(`/cards/${packId}`)
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
                        <button onClick={() => setDeleteOpen(true)}>delete</button>
                        <button onClick={() => setIsEditeOpen(true)}>edit</button>
                    </div>}
                    <button className={s.learn}>learn</button>
                </div>
                <DeletePackForm isOpen={isDeleteOpen} setDeleteClose={() => setDeleteOpen(false)} packId={packId} packName={name}/>
                <EditPackForm isOpen={isEditeOpen} setEditClose={() => setIsEditeOpen(false)}  packId={packId}/>
            </div>
        </div>
    );
};

export default Pack;