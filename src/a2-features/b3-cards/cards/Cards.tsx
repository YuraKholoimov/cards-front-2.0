import React, {useEffect, useState} from 'react';
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
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {PacksType} from "../../../a1-main/b3-dal/packsApi";
import Preloader from "../../../a1-main/b1-ui/common/preloader/Preloader";
import backPage from '../../../a3-assets/images/backPage.svg';
import s from './Cards.module.css';
import {CardFrame} from "./CardFrame/CardFrame";
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";
import {SearchField} from "../../../a1-main/b1-ui/common/searchField/SearchField";
import Pagination from "../../../a1-main/b1-ui/common/pagination/Pagination";
import SuperSelect from "../../../a1-main/b1-ui/common/seperSelect/SuperSelect";

const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams<'*'>()
    const token = params['*'] as string
    const filterValue = useAppSelector<string>(state => state.cards.sortCards)
    const cards = useAppSelector<Array<CardsType>>(state => state.cards.cards)
    const cardPacks = useAppSelector<Array<PacksType>>(state => state.packs.cardsPack)
    const myUserId = useAppSelector(state => state.auth.userId)
    const loading = useAppSelector<boolean>(state => state.app.loadingApp)

    const arrValue = ['5', '10', '15', '20']
    const [value, setValue] = useState(arrValue[0])

    useEffect(() => {
        dispatch(setCardsThunk(token))
    }, [filterValue])
    if (loading) {
        return <Preloader/>

    }


    const userPackId = cardPacks.find(p => p._id === token)?.user_id

    const addCardHandler = () => {
        const question = prompt('Введите вопрос')
        const answer = prompt('Введите Ответ')
        if (token && question && answer)
            dispatch(addCardThunk(token, question, answer))
    }

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCardThunk(token, cardId))
    }
    const editCardHandler = (_id: string) => {
        const newQuestion = prompt('Введите новый вопрос')
        newQuestion && dispatch(editCardThunk(token, _id, newQuestion))
    }
    return (
        <div >
            <CardFrame>
                <div className={s.main}>
                    <div className={s.search}>
                        <SuperButton onClick={() => navigate(-1)}><img src={backPage} alt={"backPage"}/></SuperButton>
                        <div className={s.field}>
                            <SearchField/>
                        </div>

                    </div>


                    <CardsHeader/>

                    {myUserId === userPackId && <button onClick={addCardHandler}>add card</button>}

                    {cards.map(m => {
                        return (
                            <div className={s.cards}>
                                <Card key={m._id}
                                      deleteCard={deleteCardHandler}
                                      editCard={editCardHandler}
                                      cardId={m._id}
                                      userId={userPackId ?? ''}
                                      question={m.question}
                                      answer={m.answer}
                                      lastUpdated={m.updated}
                                />

                            </div>

                        )
                    })}
                </div>
                <div className={s.pagination}>
                    <Pagination/>
                    <SuperSelect value={value} options={arrValue} onChangeOption={setValue}/>
                </div>
            </CardFrame>
        </div>
    );
};

export default Cards;