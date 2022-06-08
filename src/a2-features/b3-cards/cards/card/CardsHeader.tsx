import React, {useState} from 'react';
import s from "../../c1-packs/c2-headerPacks/HeaderPacks.module.css";
import {useAppDispatch} from "../../../../a1-main/b2-bll/store";
import {setFilterCards} from "../../../../a1-main/b2-bll/cardsReducer";

const CardsHeader = () => {

    const [filter, setFilter] = useState(false)
    const dispatch = useAppDispatch()

    const changeFilterHandler = (name: string) => {
        if (!filter) {
            setFilter(true)
        }
        if (filter) {
            setFilter(false)
        }
        dispatch(setFilterCards(+filter, name))
    }




    return (
        <div>
            <ul className={s.headerContainer}>
                <li onClick={()=>{changeFilterHandler('question')}}>Question</li>
                <li onClick={()=>{changeFilterHandler('answer')}}>Answer</li>
                <li onClick={()=>{changeFilterHandler('updated')}}>Last Updated</li>
                <li onClick={()=>{changeFilterHandler('grade')}}>Grade</li>
            </ul>

        </div>
    );
};

export default CardsHeader;