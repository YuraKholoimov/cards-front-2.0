import React, {memo, useState} from "react";
import { Modal } from "../Modal";
import s from './EditCardForm.module.css'
import SuperInputText from "../../superInputText/SuperInputText";
import SuperButton from "../../superButton/SuperButton";

type EditCardFormPropsType = {
    setEditClose: () => void
    isOpen: boolean
    cardId: string
    editCard: (_id: string, question: string, answer: string) => void
}
export const EditCardForm: React.FC<EditCardFormPropsType> = memo(({setEditClose, isOpen, cardId, editCard}) => {

    const [newQuestion, setNewQuestion] = useState<string>('')
    const [newAnswer, setNewAnswer] = useState<string>('')

    const onClickEditCard = () => {
        editCard(cardId, newQuestion, newAnswer)
        onClickCleanUpStates()
    }

    const onClickCleanUpStates = () => {
        setEditClose()
        setNewQuestion('')
        setNewAnswer('')
    }

    return <Modal setModalIsClose={onClickCleanUpStates} isOpen={isOpen}>

            <div className={s.editPackTitle}>Card info</div>
            <SuperInputText value={newQuestion} onChangeText={setNewQuestion} placeholder={'Enter new question'} />
            <SuperInputText value={newAnswer} onChangeText={setNewAnswer} placeholder={'Enter new answer'} />
        <div>
            <SuperButton onClick={onClickEditCard} width={114.4}>Save</SuperButton>
            <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
        </div>
    </Modal>
})


