import {instance} from "./settings";


export type PacksType = {
    cardsCount: number
    created: string
    deckCover: null
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type PacksResponseType = {
    cardPacks: Array<PacksType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}


export const packsApi = {
    getPacks(params: Partial<GetPacksParamsType>) {
        return instance.get<PacksResponseType>('/cards/pack', {params: {...params}})
    },
    addNewPack(cardsPack: { name: string }) {
        return instance.post('/cards/pack', {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(cardsPack: { _id: string, name: string }) {
        return instance.put('/cards/pack', {cardsPack})
    }
}

export type GetPacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
    totalCount: number
    maxCardsCount: number
}
