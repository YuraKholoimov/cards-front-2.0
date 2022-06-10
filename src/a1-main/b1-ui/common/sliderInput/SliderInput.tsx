import {useAppDispatch, useAppSelector} from "../../../b2-bll/store";
import {setMaxDotInput, setMinDotInput} from '../../../b2-bll/packsReducer';
import { useDebounce } from '../utilsFunc/useDebounceHOOK/useDebounce';
import React, {useEffect, useState} from "react";
import { SuperDoubleRange } from "./superDoubleRange/SuperDoubleRange";
import s from "./SliderInput.module.css";

export function SliderInput() {
    const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
    const dispatch = useAppDispatch();

    const [value1, setValue1] = useState<number>(0)
    const [value2, setValue2] = useState<number>(maxCardsCount)

    const onChangeRangeHandler = (value: [number, number]) => {
        setValue1(value[0])
        setValue2(value[1])
    }

    // const [value, setValue] = React.useState<number[]>([0, 103]);

    const delayedMinValue = useDebounce(value1, 1500);
    const delayedMaxValue = useDebounce(value2, 1500);

    useEffect(() => {

        dispatch(setMinDotInput(delayedMinValue))
        // dispatch(setMaxCards(delayedMaxValue))
        if(value2 !== maxCardsCount) {
            dispatch(setMaxDotInput(delayedMaxValue))
        }
    }, [delayedMinValue, delayedMaxValue])

    useEffect(() => {
        setValue2(maxCardsCount)
    },[maxCardsCount])

    // const handleChange = (event: Event, newValue: number | number[]) => {
    //     setValue(newValue as number[]);
    // };
    //
    // function valuetext(value: number) {
    //     return `${value}°C`;
    // }

    return (
        <div>
            <div className={s.range}>
                <div className={s.values}>
                    <span className={s.values1}>{value1}</span>
                    <span className={s.values2}>{value2}</span>
                </div>

                <SuperDoubleRange
                    commonValue={[value1, value2]}
                    onChangeRange={onChangeRangeHandler}
                    max={maxCardsCount}
                    // сделать так чтоб value1 и value2 изменялось
                />

            </div>
        </div>
        // <Box sx={{ width: 300 }}>
        //     <Slider
        //         getAriaLabel={() => 'Temperature range'}
        //         value={value}
        //         onChange={handleChange}
        //         valueLabelDisplay="auto"
        //         getAriaValueText={valuetext}
        //         max={maxCardsCount}
        //     />
        // </Box>
    )
}

