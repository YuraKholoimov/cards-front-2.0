import React, {memo, useState} from "react";
import { Modal } from "../Modal";
import {useAppDispatch} from "../../../../b2-bll/store";
import s from './EditPackForm.module.css'
import SuperInputText from "../../superInputText/SuperInputText";
import SuperButton from "../../superButton/SuperButton";
import { updatePackThunk } from "../../../../b2-bll/packsReducer";

type EditPackFormPropsType = {
    setEditClose: () => void
    isOpen: boolean
    packId: string
}
export const EditPackForm: React.FC<EditPackFormPropsType> = memo(({setEditClose, isOpen, packId}) => {

    const [name, setName] = useState<string>('')

    const onClickEditPack = () => {
        dispatch(updatePackThunk({_id: packId, name}))
        onClickCleanUpStates()
    }

    const onClickCleanUpStates = () => {
        setEditClose()
        setName('')
    }

    const dispatch = useAppDispatch();



    return <Modal setModalIsClose={onClickCleanUpStates} isOpen={isOpen}>

            <div className={s.editPackTitle}>Edit pack title</div>
            <SuperInputText value={name} onChangeText={setName} placeholder={'Enter new title'} />
        <div>
            <SuperButton onClick={onClickEditPack} width={114.4}>Save</SuperButton>
            <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
        </div>
    </Modal>
})


