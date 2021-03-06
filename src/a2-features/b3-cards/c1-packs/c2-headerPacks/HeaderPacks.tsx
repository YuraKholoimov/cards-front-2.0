import React, {useState} from 'react';
import s from './HeaderPacks.module.css'
import {useAppDispatch, useAppSelector} from "../../../../a1-main/b2-bll/store";
import {
    setFilteredPackName,
    setFilterNamePacks
} from "../../../../a1-main/b2-bll/packsReducer";
import {SearchField} from "../../../../a1-main/b1-ui/common/searchField/SearchField";
import SuperButton from "../../../../a1-main/b1-ui/common/superButton/SuperButton";
import {AddPackForm} from "../../../../a1-main/b1-ui/common/modal/AddPackForm/AddPackForm";



const HeaderPacks = () => {
    const name = useAppSelector<string>(state => state.profile.name)
    const packName = useAppSelector((state) => state.packs.packName);
    const [filter, setFilter] = useState(false)
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const changeFilterValue = (nameValue: string) => {
        setFilter(!filter)
        dispatch(setFilterNamePacks(+!filter, nameValue))
    }

    return (
        <div>
                <h2 >Packs list {name}'s</h2>
            <div className={s.search}>
                <SearchField searchItemName={packName} setSearchItemName={setFilteredPackName}
                             fieldName={'Search packs...'}/>
                <SuperButton onClick={() => setIsAddingOpen(true)}>add pack</SuperButton>
                <AddPackForm  isOpen={isAddingOpen} setIsAddingClose={() => {setIsAddingOpen(false)}}/>
            </div>

            <ul className={s.headerContainer}>
                <div onClick={() => changeFilterValue('name')}>Name</div>
                <div onClick={() => changeFilterValue('cardsCount')}>cards</div>
                <div onClick={() => changeFilterValue('updated')}>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
            </ul>
        </div>
    );
};

export default HeaderPacks;