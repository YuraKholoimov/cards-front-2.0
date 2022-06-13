import React, {memo, useState} from "react";
import {useAppDispatch} from "../../../../b2-bll/store";
import { Modal } from "../Modal";
import SuperInputText from "../../superInputText/SuperInputText";
import SuperCheckbox from "../../superCheckbox/SuperCheckbox";
import SuperButton from "../../superButton/SuperButton";
import { addPackThunk } from "../../../../b2-bll/packsReducer";
import s from './AddCardForm.module.css'
import {addCardThunk} from "../../../../b2-bll/cardsReducer";

type AddPackFormPropsType = {
    setIsAddingClose: () => void
    isOpen: boolean
    token: string
}
export const AddCardForm: React.FC<AddPackFormPropsType> = memo(({setIsAddingClose, isOpen, token}) => {

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')


    const dispatch = useAppDispatch()

    const onClickAddPack = () => {
            dispatch(addCardThunk(token, question, answer))
        onClickCleanUpStates()
    }

    const onClickCleanUpStates = () => {
        setIsAddingClose()
        setQuestion('')
        setAnswer('')
    }

    return <Modal setModalIsClose={onClickCleanUpStates} isOpen={isOpen}>

        <div className={s.formTitle}>Add new pack</div>

        <SuperInputText value={question} placeholder={'Enter question'}
                        onChangeText={setQuestion}/>
        <SuperInputText value={answer} placeholder={'Enter answer'}
                        onChangeText={setAnswer}/>
        <div>
            <SuperButton onClick={onClickAddPack} width={114.4}>Save</SuperButton>
            <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
        </div>
    </Modal>
})


