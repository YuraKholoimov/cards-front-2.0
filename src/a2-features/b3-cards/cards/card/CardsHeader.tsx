import React, {useState} from 'react';
import s from "../../c1-packs/c2-headerPacks/HeaderPacks.module.css";
import {useAppDispatch} from "../../../../a1-main/b2-bll/store";
import {setFilterCards} from "../../../../a1-main/b2-bll/cardsReducer";

const CardsHeader = () => {

    const [filter, setFilter] = useState(false)
    const dispatch = useAppDispatch()

    const changeFilterValue = (nameValue: string) => {
        setFilter(!filter)
        console.log(filter)
        dispatch(setFilterCards(+filter, nameValue))
    }




    return (
        <div>
            <div className={s.headerContainer}>
                <div onClick={()=>{changeFilterValue('question')}}>Question</div>
                <div onClick={()=>{changeFilterValue('answer')}}>Answer</div>
                <div onClick={()=>{changeFilterValue('updated')}}>Last Updated</div>
                <div onClick={()=>{changeFilterValue('grade')}}>Grade</div>
            </div>

        </div>
    );
};

export default CardsHeader;