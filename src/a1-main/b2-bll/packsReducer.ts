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
    minCardsCount: 0,
    maxCardsCount: 0,
}


export const packsReducer = (state = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {...state, cardsPack: action.payload.data.cardPacks}
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
export const setMinCards = (min: number) => ({type: 'PACKS/SET-MIN-CARDS', payload: {min}} as const)
export const setMaxCards = (max: number) => ({type: 'PACKS/SET-MAX-CARDS', payload: {max}} as const)



//---- Thunks
export const setPacksThunk = () => (dispatch: Dispatch<PacksActionsType>, getState: () => AppRootStateType) => {
    dispatch(setStatusLoadingApp(true))
    const {packName, min, max, sortPacks, page, pageCount, user_id, minCardsCount, maxCardsCount} = getState().packs
    const payload = {packName, min, max, sortPacks, page, pageCount, user_id, minCardsCount, maxCardsCount}

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
    | ReturnType<typeof setMinCards>
    | ReturnType<typeof setMaxCards>



