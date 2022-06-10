import React, {useEffect, useState} from 'react';
import s from './SearchField.module.css'
import {setFilteredPackName} from "../../../b2-bll/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../b2-bll/store";
import {useDebounce} from "../utilsFunc/useDebounceHOOK/useDebounce";

export const SearchField = () => {
    const packName = useAppSelector((state) => state.packs.packName);
    const dispatch = useAppDispatch();

    const [searchItem, setSearchItem] = useState<string>(packName);
    const delayedSearchItem = useDebounce(searchItem, 1500);

    useEffect(
        () => {delayedSearchItem && dispatch(setFilteredPackName(delayedSearchItem))},
        [delayedSearchItem]

    );

    return (
        <div className={s.searchBlock}>
            <div className={s.icon}>🔍</div>
            <input type="text" className={s.searchInput}
                   placeholder="Search..." value={searchItem} onChange={(e) => setSearchItem(e.currentTarget.value)} />

            {/*<button type="submit">*/}
            {/*    <i className={s.searchButton}></i>*/}
            {/*</button>*/}
        </div>
    );
};

