import React, {useState} from 'react';
import s from './HeaderPacks.module.css'
import {useAppDispatch} from "../../../a1-main/b2-bll/store";
import {addPackThunk, setFilterNamePacks} from "../../../a1-main/b2-bll/packsReducer";
import SuperInputText from "../../../a1-main/b1-ui/common/superInputText/SuperInputText";
import {SearchField} from "../../../a1-main/b1-ui/common/searchField/SearchField";

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
            <div className={s.search}>
                <SearchField/>
            </div>
            <ul className={s.headerContainer}>
                <div onClick={() => changeFilterValue('name')}>Name</div>
                <div onClick={() => changeFilterValue('cardsCount')}>cards</div>
                <div onClick={() => changeFilterValue('updated')}>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
                {/*<div><SuperInputText value={name} onChangeText={setName}/></div>*/}
                {/*<div>*/}
                {/*    <button onClick={addPackHandler}>add pack</button>*/}
                {/*</div>*/}

            </ul>

        </div>
    );
};

export default HeaderPacks;