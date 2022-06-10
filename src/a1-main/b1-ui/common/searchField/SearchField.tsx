import React, {useEffect, useState} from 'react';
import s from './SearchField.module.css'
import {AppRootActionsType, useAppDispatch} from "../../../b2-bll/store";
import {useDebounce} from "../utilsFunc/useDebounceHOOK/useDebounce";


type SearchFieldPropsType = {
    searchItemName: string
    setSearchItemName: (searchItemName: string) => AppRootActionsType
    fieldName: string
}

export const SearchField = ({
                                searchItemName,
                                setSearchItemName,
                                fieldName
                            }: SearchFieldPropsType) => {

    const dispatch = useAppDispatch();

    const [searchItem, setSearchItem] = useState<string>(searchItemName);
    const delayedSearchItem = useDebounce(searchItem, 1500);

    useEffect(() => {
            delayedSearchItem && dispatch(setSearchItemName(delayedSearchItem))},
        [delayedSearchItem]
    );

    return (
        <div className={s.searchBlock}>
            <div className={s.icon}>🔍</div>
            <input type="text" className={s.searchInput}
                   placeholder={fieldName} value={searchItem} onChange={(e) => setSearchItem(e.currentTarget.value)}/>

            {/*<button type="submit">*/}
            {/*    <i className={s.searchButton}></i>*/}
            {/*</button>*/}
        </div>
    );
};

