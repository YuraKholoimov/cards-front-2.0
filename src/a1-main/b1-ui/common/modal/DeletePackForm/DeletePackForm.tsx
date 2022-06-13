import React, {memo} from "react";
import { Modal } from "../Modal";
import {useAppDispatch} from "../../../../b2-bll/store";
import SuperButton from "../../superButton/SuperButton";
import {deletePackThunk} from "../../../../b2-bll/packsReducer";
import s from './DeletePackForm.module.css'

type DeletePackFormPropsType = {
    setDeleteClose: () => void
    isOpen: boolean
    packId: string
    packName: string
}
export const DeletePackForm: React.FC<DeletePackFormPropsType> = memo(({setDeleteClose, isOpen, packId, packName}) => {

    const dispatch = useAppDispatch();

    const deletePackHandler = () => {
        dispatch(deletePackThunk(packId))
        setDeleteClose()
    }

    return <Modal setModalIsClose={setDeleteClose} isOpen={isOpen}>
            <div className={s.deleteForm}>
                <div className={s.deleteFormTitle}>Do you really want to delete pack <br/>{packName}?</div>
                <div>
                    <SuperButton onClick={deletePackHandler}>Delete</SuperButton>
                    <SuperButton onClick={setDeleteClose}>Cancel</SuperButton>
                </div>

            </div>

    </Modal>
})


