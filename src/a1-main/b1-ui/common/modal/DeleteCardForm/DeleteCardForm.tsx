import React, {FC, memo} from "react";
import { Modal } from "../Modal";
import SuperButton from "../../superButton/SuperButton";
import s from './DeleteCardForm.module.css'

type DeleteCardFormPropsType = {
    setDeleteClose: () => void
    isOpen: boolean
    cardId: string
    deleteCard: (cardId: string) => void
}
export const DeleteCardForm: FC<DeleteCardFormPropsType> = memo(({setDeleteClose, isOpen, cardId, deleteCard}) => {

    const deleteCardHandler = () => {
        deleteCard(cardId)
        setDeleteClose()
    }

    return <Modal setModalIsClose={setDeleteClose} isOpen={isOpen}>
            <div className={s.deleteForm}>
                <div className={s.deleteFormTitle}>Do you really want to delete this card?</div>
                <div>
                    <SuperButton onClick={deleteCardHandler}>Delete</SuperButton>
                    <SuperButton onClick={setDeleteClose}>Cancel</SuperButton>
                </div>

            </div>

    </Modal>
})


