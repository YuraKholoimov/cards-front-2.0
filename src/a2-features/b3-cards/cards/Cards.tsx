import React, {useEffect, useState} from 'react';
import CardsHeader from "./card/CardsHeader";
import {useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import {
    CardsType, clearQuestionAnswerName,
    deleteCardThunk,
    editCardThunk,
    setAnswerName,
    setCardsThunk, setCurrentCardsPage, setQuestionName
} from "../../../a1-main/b2-bll/cardsReducer";
import Card from "./card/Card";
import {useNavigate, useParams} from "react-router-dom";
import {PacksType} from "../../../a1-main/b3-dal/packsApi";
import backPage from '../../../a3-assets/images/backPage.svg';
import s from './Cards.module.css';
import {CardFrame} from "./CardFrame/CardFrame";
import SuperButton from "../../../a1-main/b1-ui/common/superButton/SuperButton";
import {SearchField} from "../../../a1-main/b1-ui/common/searchField/SearchField";
import Pagination from "../../../a1-main/b1-ui/common/pagination/Pagination";
import SuperSelect from "../../../a1-main/b1-ui/common/seperSelect/SuperSelect";
import Loading from "../../../a1-main/b1-ui/common/loading/Loading";
import {AddCardForm} from "../../../a1-main/b1-ui/common/modal/AddCardForm/AddCardForm";


const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams<'*'>()
    const token = params['*'] as string
    const filterValue = useAppSelector<string>(state => state.cards.sortCards)
    const cards = useAppSelector<Array<CardsType>>(state => state.cards.cards)
    const cardPacks = useAppSelector<Array<PacksType>>(state => state.packs.cardsPack)
    const myUserId = useAppSelector(state => state.auth.userId)
    const loading = useAppSelector<boolean>(state => state.app.isLoading)
    const cardsQuestion = useAppSelector((state) => state.cards.question)
    const cardsAnswer = useAppSelector((state) => state.cards.answer)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const cardsPerPage = useAppSelector(state => state.cards.pageCount)
    const currentPage = useAppSelector(state => state.cards.page)
    const pageCardsCount = useAppSelector(state => state.cards.pageCount)

    console.log('cardsTotalCount', cardsTotalCount)
    console.log('cardsPerPage', cardsPerPage)
    console.log('currentPage', currentPage)
    console.log('pageCardsCount', pageCardsCount)

    const arrCardsValue = ['5', '10', '15', '20']
    const [cardsValue, setCardsValue] = useState(arrCardsValue[0])
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false)

    useEffect(() => {
        dispatch(setCardsThunk(token))
    }, [filterValue, cardsQuestion, cardsAnswer, currentPage, pageCardsCount])

    useEffect(() => {
        return () => {
            dispatch(clearQuestionAnswerName())
        }
    }, [])

    const paginate = (num: number) => {
        dispatch(setCurrentCardsPage(num))
    }

    const userPackId = cardPacks.find(p => p._id === token)?.user_id

    const deleteCardHandler = (cardId: string) => {
        dispatch(deleteCardThunk(token, cardId))
    }
    const editCardHandler = (_id: string, newQuestion: string, newAnswer: string) => {
        dispatch(editCardThunk(token, _id, newQuestion, newAnswer))
    }
    return (
        <div >
            <CardFrame>
                <div className={s.main}>

                    <div className={s.backBtn}>

                        <SuperButton onClick={() => navigate(-1)}><img src={backPage} alt={"backPage"}/></SuperButton>
                        <div className={s.searchFields}>

                            <SearchField searchItemName={cardsQuestion} setSearchItemName={setQuestionName}
                                         fieldName={'Search cards by question...'}/>
                            <SearchField searchItemName={cardsAnswer} setSearchItemName={setAnswerName}
                                         fieldName={'Search cards by answer...'}/>
                            {myUserId === userPackId && <SuperButton onClick={() => setIsAddingOpen(true)}>add card</SuperButton>}
                            <AddCardForm isOpen={isAddingOpen} setIsAddingClose={() => {
                                setIsAddingOpen(false)
                            }} token={token}/>
                        </div>

                    </div>


                    <CardsHeader/>

                    <div className={s.loadingDiv}>

                    </div>

                    {loading && <Loading/>}
                    <div className={s.cards}>
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
                                />
                            )
                        })}
                    </div>
                </div>
                <div className={s.pagination}>
                    <Pagination TotalCount={cardsTotalCount} countPerPage={cardsPerPage} currentPage={currentPage}
                                selectCardsPage={paginate}/>
                    <SuperSelect value={cardsValue} options={arrCardsValue} onChangeCardsOption={setCardsValue}/>
                </div>
            </CardFrame>
        </div>
    );
};

export default Cards;