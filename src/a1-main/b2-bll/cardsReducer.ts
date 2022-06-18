import {Dispatch} from "redux";
import {setLoading, setLoadingAppType, setLoadingType, setStatusLoadingApp} from "./appReducer";
import {setCatchErrorType, setError} from "./loginReducer";
import {AppRootStateType} from "./store";
import {cardsApi, GetCardsParamsType} from "../b3-dal/cardsApi";

// type InitialStateType = GetPacksParamsType & {
//     cardsPack: Array<PacksType>
// }

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

type InitialStateType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    searchCard: string
    sortCards: string
    packUserId: string
    tokenDeathTime: number
    answer: string
    question: string
    grade: number
    packId: string
}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 2,
    searchCard: '',
    sortCards: '0updated',
    packUserId: '',
    tokenDeathTime: 0,
    answer: "",
    question: '',
    grade: 0,
    packId: ''
}


export const cardsReducer = (state = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {
                ...state,
                packUserId: action.payload.data.packUserId,
                cards: action.payload.data.cards,
                cardsTotalCount: action.payload.data.cardsTotalCount

            }
        case "CARDS/ADD-CARDS":
            return {
                ...state, cards: state.cards.map(m => m._id === action.payload.cardsPack_id
                    ? {...m, question: action.payload.question, cardAnswer: action.payload.answer}
                    : m)
            }
        case "CARDS/EDIT-CARD":
            return {
                ...state,
                cards: state.cards.map(m => m._id === action.payload._id ? {
                    ...m,
                    question: action.payload.newQuestion
                } : m)
            }
        case "CARDS/SET-FILTER":
            return {...state, sortCards: `${action.payload.value}${action.payload.name}`}
        case "CARDS/SET-PACK-ID":
            return {...state, packId: action.payload.packId}
        case "CARDS/SET-QUESTION-NAME":
            return {...state, question: action.payload.question}
        case "CARDS/SET-ANSWER-NAME":
            return {...state, answer: action.payload.question}
        case "CARDS/CLEAR-QUESTION-ANSWER-NAME":
            return {...state, answer: '', question: ''}
        case "SET-CURRENT-CARDS-PAGE":
            return {...state, page: action.payload.page}
        case "CARDS/CLEAR-CARDS":
            return initialState
        case "CARDS/SET-PAGE-COUNT":
            return {...state, pageCount: action.payload.value}
        default:
            return state
    }
}


//---- Actions
export const setCards = (data: any) => ({type: 'CARDS/SET-CARDS', payload: {data}} as const)
export const addCard = (cardsPack_id: string, question: string, answer: string) => ({
    type: 'CARDS/ADD-CARDS',
    payload: {cardsPack_id, question, answer}
} as const)
export const editCard = (_id: string, newQuestion: string, comment?: string) => ({
    type: 'CARDS/EDIT-CARD',
    payload: {_id, newQuestion, comment}
} as const)
export const setFilterCards = (value: number, name: string) => ({
    type: 'CARDS/SET-FILTER',
    payload: {value, name}
} as const)
export const setPackId = (packId: string) => ({
    type: 'CARDS/SET-PACK-ID',
    payload: {packId}
} as const)
export const setQuestionName = (question: string) => ({
    type: 'CARDS/SET-QUESTION-NAME',
    payload: {question}
} as const)
export const setAnswerName = (question: string) => ({
    type: 'CARDS/SET-ANSWER-NAME',
    payload: {question}
} as const)
export const clearQuestionAnswerName = () => ({
    type: 'CARDS/CLEAR-QUESTION-ANSWER-NAME',
} as const)
export const setCurrentCardsPage = (page: number) => ({
    type: 'SET-CURRENT-CARDS-PAGE',
    payload: {page}
}as const)
export const clearCards = () => ({
    type: 'CARDS/CLEAR-CARDS'
} as const)

export const setPageCount = (value: number) => ({
    type: 'CARDS/SET-PAGE-COUNT',
    payload: {value}
}as const)

//---- Thunks
export const setCardsThunk = (packId: string) =>
    (dispatch: Dispatch<CardsActionsType>, getState: () => AppRootStateType) => {
    dispatch(setLoading(true))
    const {sortCards, answer, question, page, pageCount} = getState().cards
    const payload: GetCardsParamsType = {
        cardAnswer: answer,
        cardQuestion: question,
        cardsPack_id: packId,
        min: 0,
        max: 5,
        sortCards: sortCards,
        page: page,
        pageCount: pageCount,
    }
    cardsApi.getCards(payload)
        .then((res) => {
            debugger
            dispatch(setCards(res.data))
            console.log(res.data)
            // dispatch(setCardsThunk(packId))

        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}
export const addCardThunk = (cardsPack_id: string, question: string, answer: string) => (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
    cardsApi.addCards({cardsPack_id, question, answer})
        .then(() => {
            dispatch(setCardsThunk(cardsPack_id))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}
export const deleteCardThunk = (cardsPack_id: string, cardsId: string) => (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
    cardsApi.deleteCard(cardsId)
        .then(() => {
            dispatch(setCardsThunk(cardsPack_id))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}
export const editCardThunk = (cardsPack_id: string, _id: string, newQuestion: string, newAnswer: string, comment?: string) => (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true))
    cardsApi.editCard({_id, question: newQuestion, answer: newAnswer, comments: comment})
        .then(() => {
            dispatch(setCardsThunk(cardsPack_id))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}
export const learnCardsThunk = (packUserId: string) =>
    (dispatch: Dispatch) => {
        dispatch(setLoading(true))
        const data: GetCardsParamsType = {
            cardAnswer: "",
            cardQuestion: "",
            cardsPack_id: packUserId,
            min: 0,
            max: 0,
            sortCards: "0question",
            page: 1,
            pageCount: 1000,
        }
        cardsApi.getCards(data)
            .then((res) => {
                dispatch(setCards(res.data));
            })
            .catch(e => {
                console.log(e.message)
            })
            .finally(() => {
                dispatch(setLoading(false));
            })
    };

export type CardsActionsType =
    ReturnType<typeof setCards> |
    ReturnType<typeof addCard> |
    ReturnType<typeof editCard> |
    ReturnType<typeof setFilterCards> |
    ReturnType<typeof setPackId> |
    ReturnType<typeof setQuestionName> |
    ReturnType<typeof setAnswerName> |
    ReturnType<typeof clearQuestionAnswerName> |
    ReturnType<typeof clearCards> |
    ReturnType<typeof setCurrentCardsPage> |
    ReturnType<typeof setPageCount>
    | setCatchErrorType
    | setLoadingType




