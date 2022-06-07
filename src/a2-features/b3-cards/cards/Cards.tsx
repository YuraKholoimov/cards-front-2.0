import React, {useEffect} from 'react';
import CardsHeader from "./card/CardsHeader";
import {useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import {
    addCardThunk,
    CardsType,
    deleteCardThunk,
    editCardThunk,
    setCardsThunk
} from "../../../a1-main/b2-bll/cardsReducer";
import Card from "./card/Card";
import {useNavigate, useParams} from "react-router-dom";

const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams<'*'>()
    const token = params['*'] as string
    const filterValue = useAppSelector<string>(state => state.cards.sortCards)
    const cards = useAppSelector<Array<CardsType>>(state => state.cards.cards)

    useEffect(() => {
            dispatch(setCardsThunk(token))
    }, [filterValue])
    const addCardHandler = () => {
        const question = prompt('Введите вопрос')
        const answer = prompt('Введите Ответ')

        if (token && question && answer)
            dispatch(addCardThunk(token, question, answer))
    }

    const deleteCardHandler = (cardId: string) => {

            dispatch(deleteCardThunk(token, cardId))
    }
    const editCardHandler = (_id: string, question: string) => {

            dispatch(editCardThunk(token, _id, question))

    }

    return (
        <div>
            <CardsHeader/>
            <button onClick={addCardHandler}>add card</button>
            <button onClick={() => navigate(-1)}>назад к пакам</button>
            {cards.map(m => {
                debugger
                return (
                    <Card key={m._id}
                          deleteCard={deleteCardHandler}
                          editCard={editCardHandler}
                          cardId={m._id}
                          question={m.question}
                          answer={m.answer}
                          lastUpdated={m.updated}
                          grade={m.grade}/>
                )
            })}
        </div>
    );
};

export default Cards;