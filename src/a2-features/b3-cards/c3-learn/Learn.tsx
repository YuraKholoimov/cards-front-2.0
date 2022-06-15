import React, {ReactNode, useEffect, useState} from 'react';
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";

import s from './learn.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../a1-main/b2-bll/store";
import {PATH} from "../../../a1-main/b1-ui/routes/RoutesComponent";
import {CardsType, clearCards, learnCardsThunk, setCardsThunk} from '../../../a1-main/b2-bll/cardsReducer';
import SuperRadioSelect from "../../../a1-main/b1-ui/common/SuperRadioSelect/SuperRadioSelect";
import {CardType} from "../../../a1-main/b3-dal/cardsApi";

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
    const [first, setFirst] = useState<boolean>(true)

    const cards = useAppSelector<any>(state => state.cards.cards)
    const [card, setCard] = useState<any>();
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)

    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }

    useEffect(() => {
        if (first) {
            packId && dispatch(setCardsThunk(packId))
            setFirst(false)
        }

        // packId && dispatch(learnCardsThunk(packId))

        setCard(getCard(cards))

        return () => {
            dispatch(clearCards())
        }

    }, [])

    const onNextClick = () => {
        setIsVisible(false)
        setCard(getCard(cards))
    }

    return (
        <div className={s.wrapper}>
            <span>Learn {packName}</span>
            <p><b>Question: </b>
                {card.question}
            </p>

            {
                isVisible && <>
                    <h3>Answer:</h3>
                    <p>{card.answer}</p>
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
                <SuperButton onClick={() => navigate(PATH.PACKS)}>Cansel</SuperButton>
                {
                    isVisible
                        ? <SuperButton onClick={onNextClick} disabled={!rating}>Next</SuperButton>
                        : <SuperButton onClick={() => setIsVisible(true)}>Show answer</SuperButton>
                }
            </nav>
        </div>
    );
};
