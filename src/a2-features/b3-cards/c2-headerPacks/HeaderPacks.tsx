import React, {useState} from 'react';
import s from './HeaderPacks.module.css'
import {useAppDispatch} from "../../../a1-main/b2-bll/store";
import {addPackThunk, setFilterNamePacks} from "../../../a1-main/b2-bll/packsReducer";
import SuperInputText from "../../../a1-main/b1-ui/common/superInputText/SuperInputText";

const HeaderPacks = () => {
    const [name, setName] = useState('')
    const [filter, setFilter] = useState(false)
    const dispatch = useAppDispatch()

    const changeFilterValue = (nameValue: string) => {
        setFilter(!filter)
        dispatch(setFilterNamePacks(+filter, nameValue))
    }


    const addPackHandler = () => {
        dispatch(addPackThunk(name))
        setName('')
    }


    return (
        <div>
            <ul className={s.headerContainer}>
                <li onClick={() => changeFilterValue('name')}>Name</li>
                <li onClick={() => changeFilterValue('cardsCount')}>cards</li>
                <li onClick={() => changeFilterValue('updated')}>Last Updated</li>
                <li>Created by</li>
                <li>Actions</li>
                <li><SuperInputText value={name} onChangeText={setName}/></li>
                <li>
                    <button onClick={addPackHandler}>add pack</button>
                </li>

            </ul>

        </div>
    );
};

export default HeaderPacks;