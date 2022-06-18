import {instance} from './settings';


export type CardType = {
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

export type CardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: ''
}


export const cardsApi = {
    getCards(params: GetCardsParamsType) {
        return instance.get<CardsResponseType>('/cards/card', {params: {...params}})
    },
    addCards(card: { cardsPack_id: string, question: string, answer: string }) {
        return instance.post<CardsResponseType>('/cards/card', {card})
    },
    deleteCard(cardId: string) {
        return instance.delete<CardsResponseType>(`/cards/card?id=${cardId}`)
    },
    editCard(card:{_id: string, question: string, answer: string, comments?: string}) {
        return instance.put<CardsResponseType>(`/cards/card`, {card})
    },
}


export type GetCardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string // обязательно!
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}