import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import {useAppDispatch} from "../../../b2-bll/store";
import {setPacksCount} from "../../../b2-bll/packsReducer";
import s from "./SuperSelect.module.css";
import {setCurrentCardsPage, setPageCount} from "../../../b2-bll/cardsReducer";

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: any) => void
    onChangeCardsOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange,
        onChangeOption,
        onChangeCardsOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = [options?.map((o, i) => {
        return <option key={i} value={o}>{o}</option>
    })];
    const dispatch = useAppDispatch()

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // onChange, onChangeOption
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
        dispatch(setPacksCount(+e.currentTarget.value))
        onChangeCardsOption && onChangeCardsOption(e.currentTarget.value)
        dispatch(setPageCount(+e.currentTarget.value))

    }

    return (
        <select className={s.select} onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect