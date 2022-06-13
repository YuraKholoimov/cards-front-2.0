import React, {memo, useState} from "react";
import {useAppDispatch} from "../../../../b2-bll/store";
import { Modal } from "../Modal";
import SuperInputText from "../../superInputText/SuperInputText";
import SuperCheckbox from "../../superCheckbox/SuperCheckbox";
import SuperButton from "../../superButton/SuperButton";
import { addPackThunk } from "../../../../b2-bll/packsReducer";
import s from './AddPackForm.module.css'

type AddPackFormPropsType = {
    setIsAddingClose: () => void
    isOpen: boolean
}
export const AddPackForm: React.FC<AddPackFormPropsType> = memo(({setIsAddingClose, isOpen}) => {

    const [name, setName] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const onClickAddPack = () => {
        dispatch(addPackThunk(name, isPrivate))
        onClickCleanUpStates()
    }

    const onClickCleanUpStates = () => {
        setIsAddingClose()
        setName('')
        setIsPrivate(false)
    }

    return <Modal setModalIsClose={onClickCleanUpStates} isOpen={isOpen}>

        <div className={s.formTitle}>Add new pack</div>

        <SuperInputText value={name} placeholder={'Enter pack name'}
                        onChangeText={setName}/>
        <SuperCheckbox checked={isPrivate} onChangeChecked={setIsPrivate}>
            Make private
        </SuperCheckbox>
        <div>
            <SuperButton onClick={onClickAddPack} width={114.4}>Save</SuperButton>
            <SuperButton onClick={onClickCleanUpStates}>Cancel</SuperButton>
        </div>
    </Modal>
})


