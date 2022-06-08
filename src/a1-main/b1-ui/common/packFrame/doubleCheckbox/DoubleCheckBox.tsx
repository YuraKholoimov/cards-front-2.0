import React, {useState} from "react";
import s from './DoubleCheckbox.module.css'

import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../../b2-bll/store";
import {showMyOrAllPacks} from "../../../../b2-bll/packsReducer";





export const DoubleCheckbox = () => {
    const dispatch = useAppDispatch()
   // const myPacks = useAppSelector<boolean>(state => state.packs.myPacks);
    const isLoading = useAppSelector<boolean>(state => state.app.loadingApp)
    const userId = useAppSelector<string>(state => state.profile._id)
    const [myPacks, setMyPacks] = useState<boolean>(false)

    // const myOnClickHandler = () => {
    //     if (!isLoading) {
    //         if (!myPacks) setMyPacks(true)
    //     }
    // }
    //
    // const allOnClickHandler = () => {
    //     if (!isLoading) {
    //         if (myPacks) setMyPacks(false)
    //     }
    // }

    const showMyPacksHandler = () => {
        dispatch(showMyOrAllPacks(userId))
        setMyPacks(true)
    }
    const showAllPacksHandler = () => {
        dispatch(showMyOrAllPacks(''))
        setMyPacks(false)
    }
    return (
        <div className={s.label}>
            <div onClick={showMyPacksHandler} className={myPacks ? s.selected : s.tab}>
                <h5>My</h5>
            </div>
            <div onClick={showAllPacksHandler} className={!myPacks ? s.selected : s.tab}>
                <h5>All</h5>
            </div>
        </div>
    )
}