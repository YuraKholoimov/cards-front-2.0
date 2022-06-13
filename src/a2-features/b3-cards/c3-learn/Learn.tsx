import React, {ReactNode, useEffect, useState} from 'react';
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";

import s from './learn.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../a1-main/b2-bll/store";
import {PATH} from "../../../a1-main/b1-ui/routes/RoutesComponent";
import {learnCardsThunk, setCardsThunk} from '../../../a1-main/b2-bll/cardsReducer';
import SuperRadioSelect from "../../../a1-main/b1-ui/common/SuperRadioSelect/SuperRadioSelect";

type PropsType = {
    children?: ReactNode
}

export const Learn: React.FC<PropsType> = ({children}) => {

    const grades = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const {packId} = useParams<{ packId: string }>()
    const packName = useAppSelector<string>(state => state.packs.cardsPack.filter((p: any) => p._id === packId)[0]?.name)
    const [isVisible, setIsVisible] = useState(false)
    const [rating, setRating] = useState("")

    const cards = useAppSelector<any>(state => state.cards.cards)
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)

    useEffect(() => {
        packId && dispatch(setCardsThunk(packId))
        packId && dispatch(learnCardsThunk(packId))

    }, [])

    const onNextClick = () => {
        console.log('onNextClick')
    }

    return (
        <div className={s.wrapper}>
            <span>Learn {packName}</span>
            <p><b>Question: </b>
                {cards[0].question}
            </p>

            {
                isVisible && <>
                    <h3>Answer:</h3>
                    <p>{cards[0].answer}</p>
                    <h3>Rate yourself:</h3>
                    <SuperRadioSelect
                        name={'radio'}
                        options={grades}
                        value={rating}
                        onChangeOption={setRating}
                    />
                </>
            }

            <nav>
                <SuperButton onClick={() => navigate(PATH.PROFILE)}>Cansel</SuperButton>
                {
                    isVisible
                        ? <SuperButton onClick={onNextClick} disabled={!rating}>Next</SuperButton>
                        : <SuperButton onClick={() => setIsVisible(true)}>Show answer</SuperButton>
                }
            </nav>
        </div>
    );
};
