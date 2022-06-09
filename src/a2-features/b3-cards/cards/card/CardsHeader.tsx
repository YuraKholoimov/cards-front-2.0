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
            <ul className={s.headerContainer}>
                <li onClick={()=>{changeFilterValue('question')}}>Question</li>
                <li onClick={()=>{changeFilterValue('answer')}}>Answer</li>
                <li onClick={()=>{changeFilterValue('updated')}}>Last Updated</li>
                <li onClick={()=>{changeFilterValue('grade')}}>Grade</li>
            </ul>

        </div>
    );
};

export default CardsHeader;