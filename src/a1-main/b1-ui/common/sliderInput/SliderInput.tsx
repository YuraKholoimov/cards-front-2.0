import React, {useEffect, useState} from 'react'
import s from "./SliderInput.module.css"
import {SuperDoubleRange} from "./superDoubleRange/SuperDoubleRange";
import {useAppDispatch, useAppSelector} from "../../../b2-bll/store";
import {setMaxCards, setMinCards} from "../../../b2-bll/packsReducer";
import {useDebounce} from "../utilsFunc/useDebounceHOOK/useDebounce";

export function SliderInput() {

    const min = useAppSelector((state) => state.packs.min)
    const max = useAppSelector((state) => state.packs.max)
    const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setMaxCards(maxCardsCount))
    }, [maxCardsCount])

    const [value1, setValue1] = useState<number>(0)
    const [value2, setValue2] = useState<number>(0)
    //
    const delayedMinValue = useDebounce(value1, 1500);
    const delayedMaxValue = useDebounce(value2, 1500);

    // const minGap = 5;

    const onChangeRangeHandler = (value: [number, number]) => {
        setValue1(value[0])
        setValue2(value[1])
        delayedMinValue !== min && dispatch(setMinCards(delayedMinValue))
        delayedMaxValue !== max && dispatch(setMaxCards(delayedMaxValue))
    }



    return (
        <div>
            <hr/>
            homeworks 11

            {/*should work (должно работать)*/}

            <div className={s.wrapper}>
                <span>{value1}</span>-
                <SuperDoubleRange
                    commonValue={[value1, value2]}
                    onChangeRange={onChangeRangeHandler}
                    max={maxCardsCount}
                    // сделать так чтоб value1 и value2 изменялось
                />
                <span>{value2}</span>
            </div>

            <hr/>
            {/*для личного творчества, могу проверить*/}
            {/*<AlternativeSuperRange/>*/}
            {/*<AlternativeSuperDoubleRange/>*/}
            <hr/>
        </div>
    )
}

