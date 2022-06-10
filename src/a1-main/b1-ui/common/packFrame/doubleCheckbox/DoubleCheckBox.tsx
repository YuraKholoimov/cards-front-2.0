import React, {useEffect, useState} from "react";
import s from './DoubleCheckbox.module.css'

import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../../b2-bll/store";
import {showMyOrAllPacks} from "../../../../b2-bll/packsReducer";
import {Navigate, useNavigate} from 'react-router-dom';
import {logoutThunk} from "../../../../b2-bll/loginReducer";
import {PATH} from "../../../routes/RoutesComponent";

type DoubleCheckboxPropsType = {
    firstName: string
    secondName: string
}


export const DoubleCheckbox = (props: DoubleCheckboxPropsType) => {
    const dispatch = useAppDispatch()
    // const myPacks = useAppSelector<boolean>(state => state.packs.myPacks);
    const isLoading = useAppSelector<boolean>(state => state.app.loadingApp)
    const userId = useAppSelector<string>(state => state.profile._id)
    const [myPacks, setMyPacks] = useState<boolean>(false)
    let navigate = useNavigate()

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
    const redirectToProfile = () => {
        return navigate('/edit-c1-profile')
    }
    const logOut = () => {
          dispatch(logoutThunk())

        return   navigate('/login')
    }

    return (
        <div className={s.label}>
            <div onClick={props.firstName === 'Edit profile' ? redirectToProfile : showMyPacksHandler}
                 className={myPacks ? s.selected : s.tab}>
                <h5>{props.firstName}</h5>
            </div>

            <div onClick={props.secondName === 'Log out' ? logOut : showAllPacksHandler}
                 className={!myPacks ? s.selected : s.tab}>
                <h5>{props.secondName}</h5>
            </div>

        </div>
    )
}