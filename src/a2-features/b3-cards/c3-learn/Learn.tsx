import React, {ReactNode, useEffect, useState} from 'react';
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";

import s from './learn.module.css'
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {cardsApi} from "../../../a1-main/b3-dal/cardsApi";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "../../../a1-main/b2-bll/store";
import {PATH} from "../../../a1-main/b1-ui/routes/RoutesComponent";
import {CardsType, learnCardsThunk, setCards, setCardsThunk} from '../../../a1-main/b2-bll/cardsReducer';
import Preloader from "../../../a1-main/b1-ui/common/preloader/Preloader";

type PropsType = {
    children?: ReactNode
}
export const Learn: React.FC<PropsType> = ({children}) => {
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const {packId} = useParams<{packId: string}>()
    console.log(packId)
    const packName = useAppSelector<string>(state => state.packs.cardsPack.filter((p: any) => p._id === packId)[0]?.name)
    const [isVisible, setIsVisible] = useState(false)

    const cards = useAppSelector<any>(state => state.cards.cards)
    console.log(cards)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)

    useEffect(() => {
        packId && dispatch(setCardsThunk(packId))
        packId && dispatch(learnCardsThunk(packId))

    }, [])

    return (
        <div className={s.wrapper}>
            <span>Learn {packName}</span>
                <p><b>Question: </b>
                    {cards[0].question}
                </p>

            <nav>
                <SuperButton onClick={() => navigate(PATH.PACKS)}>Cansel</SuperButton>
                <SuperButton onClick={() => setIsVisible(true)}>Show answer</SuperButton>
            </nav>
        </div>
    );
};
