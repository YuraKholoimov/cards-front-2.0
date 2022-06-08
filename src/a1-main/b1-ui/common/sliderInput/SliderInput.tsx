import React, {useEffect, useState} from 'react'
import s from "./SliderInput.module.css"
import {SuperDoubleRange} from "./superDoubleRange/SuperDoubleRange";
import {useAppDispatch, useAppSelector} from "../../../b2-bll/store";
import {setMaxDotInput, setMinDotInput} from "../../../b2-bll/packsReducer";
import {useDebounce} from "../utilsFunc/useDebounceHOOK/useDebounce";


export function SliderInput() {

    const maxCards = useAppSelector((state) => state.packs.max)

    const dispatch = useAppDispatch();


    const [value1, setValue1] = useState<number>(0)
    const [value2, setValue2] = useState<number>(maxCards)

    const delayedMinValue = useDebounce(value1, 1500);
    const delayedMaxValue = useDebounce(value2, 1500);

    // const minGap = 5;
    const onChangeRangeHandler = (value: [number, number]) => {
        setValue1(value[0])
        setValue2(value[1])
    }

    useEffect(() => {
        dispatch(setMinDotInput(delayedMinValue))
        dispatch(setMaxDotInput(delayedMaxValue))
    }, [delayedMinValue, delayedMaxValue])

    // useEffect(() => {
    //
    //     setValue2(maxCards)
    // }, [maxCards])

setTimeout(()=>{
    console.log(maxCards)
    },3000)
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

