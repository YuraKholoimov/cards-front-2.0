import {Dispatch} from "redux";
import {setLoadingAppType, setStatusLoadingApp} from "./appReducer";
import {GetPacksParamsType, packsApi, PacksResponseType, PacksType} from "../b3-dal/packsApi";
import {setCatchErrorType, setError} from "./loginReducer";
import {AppRootStateType} from "./store";

type InitialStateType = GetPacksParamsType & {
    cardsPack: Array<PacksType>
}

const initialState: InitialStateType = {
    cardsPack: [],
    packName: '',
    min: 0,
    max: 0,
    sortPacks: "0updated",
    page: 0,
    pageCount: 5,
    user_id: '',
    totalCount: 0,
    maxCardsCount: 0
}


export const packsReducer = (state = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {...state,
                cardsPack: action.payload.data.cardPacks,
                maxCardsCount: action.payload.data.maxCardsCount,
                totalCount: action.payload.data.cardPacksTotalCount
            }
        case "PACKS/SET-FILTER-PACKS":
            return {...state, sortPacks: `${action.payload.value}${action.payload.nameValue}`}
        case "PACKS/SET-PACKS-COUNT" :
            return {...state, pageCount: action.payload.value}
        case "PACKS/SHOW-MY-PACK":
            return {...state, user_id: action.payload.userId}
        case "PACKS/UPDATE-PACK":
            return {...state, packName: action.payload.data.name}
        case "PACKS/SET-FILTERED-PACK-NAME":
            return {...state, ...action.payload}
        case "PACKS/SET-MAX-CARDS":
            return {...state, max: action.payload.max}
        case "PACKS/SET-MIN-CARDS":
            return {...state, min: action.payload.min}
        case "PACKS/SET-TOTAL-CARDS-COUNT":
            return {...state, totalCount: action.payload.totalCount}
        case "PACKS/SET-CURRENT-PAGE":
            return {...state, page: action.payload.page}

        default:
            return state
    }
}


//---- Actions
export const setPacks = (data: PacksResponseType) => ({type: 'PACKS/SET-PACKS', payload: {data}} as const)
export const setFilterNamePacks = (value: number, nameValue: string) => ({
    type: 'PACKS/SET-FILTER-PACKS',
    payload: {value, nameValue}
} as const)
export const setPacksCount = (value: number) => ({type: 'PACKS/SET-PACKS-COUNT', payload: {value}} as const)
export const showMyOrAllPacks = (userId: string) => ({type: 'PACKS/SHOW-MY-PACK', payload: {userId}} as const)
export const updatePack = (data: UpdateDataType) => ({type: 'PACKS/UPDATE-PACK', payload: {data}} as const)
export const setFilteredPackName = (packName: string) => ({
    type: 'PACKS/SET-FILTERED-PACK-NAME',
    payload: {packName}
} as const)

export const setMinDotInput = (min: number) => ({type: 'PACKS/SET-MIN-CARDS', payload: {min}} as const)
export const setMaxDotInput = (max: number) => ({type: 'PACKS/SET-MAX-CARDS', payload: {max}} as const)
export const setTotalCardsCount = (totalCount: number) => ({
    type: 'PACKS/SET-TOTAL-CARDS-COUNT',
    payload: {totalCount}
} as const)
export const setCurrentPage = (page: number) => ({
    type: 'PACKS/SET-CURRENT-PAGE',
    payload: {page}
} as const)


//---- Thunks
export const setPacksThunk = () => (dispatch: Dispatch<PacksActionsType>, getState: () => AppRootStateType) => {
    dispatch(setStatusLoadingApp(true))
    const {
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id,
        totalCount
    } = getState().packs
    const payload = {packName, min, max, sortPacks, page, pageCount, user_id, totalCount}
    packsApi.getPacks(payload)
        .then((res) => {
            dispatch(setPacks(res.data))

        })

        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })
}
export const addPackThunk = (name: string) => (dispatch: Dispatch<any>) => {
    dispatch(setStatusLoadingApp(true))
    packsApi.addNewPack({name})
        .then(() => {
            dispatch(setPacksThunk())

        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })
}
export const deletePackThunk = (id: string) => (dispatch: Dispatch<any>) => {
    dispatch(setStatusLoadingApp(true))
    debugger
    packsApi.deletePack(id)
        .then(() => {
            dispatch(setPacksThunk())
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })
}
export const updatePackThunk = (data: UpdateDataType) => (dispatch: Dispatch<any>) => {
    dispatch(setStatusLoadingApp(true))
    packsApi.updatePack(data)
        .then(() => {
            dispatch(setPacksThunk())
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
        .finally(() => {
            dispatch(setStatusLoadingApp(false))
        })
}
type UpdateDataType = {
    _id: string
    name: string
}


//---- Types
export type PacksActionsType =
    setCatchErrorType
    | setLoadingAppType
    | ReturnType<typeof setPacks>
    | ReturnType<typeof setFilterNamePacks>
    | ReturnType<typeof setPacksCount>
    | ReturnType<typeof showMyOrAllPacks>
    | ReturnType<typeof updatePack>
    | ReturnType<typeof setFilteredPackName>
    | ReturnType<typeof setMinDotInput>
    | ReturnType<typeof setMaxDotInput>
    | ReturnType<typeof setTotalCardsCount>
    | ReturnType<typeof setCurrentPage>





