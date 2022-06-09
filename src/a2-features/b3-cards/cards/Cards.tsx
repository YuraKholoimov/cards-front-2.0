import React, {useEffect} from 'react';
import CardsHeader from "./card/CardsHeader";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import {
    addCardThunk,
    CardsType,
    deleteCardThunk,
    editCardThunk,
    setCardsThunk
} from "../../../a1-main/b2-bll/cardsReducer";
import Card from "./card/Card";
import {useNavigate, useParams} from "react-router-dom";
import {PacksType} from "../../../a1-main/b3-dal/packsApi";
import {useSelector} from "react-redux";
import Preloader from "../../../a1-main/b1-ui/common/preloader/Preloader";

const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams<'*'>()
    const token = params['*'] as string
    const filterValue = useAppSelector<string>(state => state.cards.sortCards)
    const cards = useAppSelector<Array<CardsType>>(state => state.cards.cards)
    const cardPacks = useAppSelector<Array<PacksType> >(state => state.packs.cardsPack)
    const myUserId = useAppSelector(state => state.auth.userId)
    const loading = useSelector<AppRootStateType, boolean>(state => state.app.loadingApp)


    const userPackId = cardPacks.find(p => p._id === token)?.user_id

    useEffect(() => {
        dispatch(setCardsThunk(token))
    }, [filterValue])
    if (loading) {
        return <Preloader/>
    }
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
            {myUserId === userPackId && <button onClick={addCardHandler}>add card</button>}
            <button onClick={() => navigate(-1)}>назад к пакам</button>
            {cards.map(m => {

                return (
                    <Card key={m._id}
                          deleteCard={deleteCardHandler}
                          editCard={editCardHandler}
                          cardId={m._id}
                          userId={userPackId ?? ''}
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