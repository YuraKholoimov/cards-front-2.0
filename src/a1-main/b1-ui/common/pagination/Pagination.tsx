import React, {useEffect, useState} from 'react';
import s from "./pagination.module.css"
import {useAppDispatch, useAppSelector} from "../../../b2-bll/store";
import SuperButton from "../superButton/SuperButton";
import {setCurrentPage} from "../../../b2-bll/packsReducer";

const Pagination: React.FC = () => {
    const dispatch = useAppDispatch()
    const packsTotalCount = useAppSelector(state => state.packs.totalCount)
    const packsPerPage = useAppSelector(state => state.packs.pageCount)
    const currentPage = useAppSelector(state => state.packs.page)
    const cardsTotalCount = useAppSelector(state=>state.cards.cardsTotalCount)
    const cardsPerPage = useAppSelector(state=>state.cards.pageCount)
    console.log(cardsTotalCount/cardsPerPage)
    const portionSize = 5;


    const pagesTotalCount = Math.ceil(packsTotalCount / packsPerPage && cardsTotalCount/cardsPerPage);
    debugger
    const pageNumbers: any[] = [];
    for (let i = 1; i < pagesTotalCount; i++) {
        pageNumbers.push(i == currentPage ? {page: i, isActive: true} : {page: i, isActive: false})
    }

    const paginate = (num: number) => {
        dispatch(setCurrentPage(num))
    }


    const portionPagesCount = Math.ceil(pagesTotalCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    useEffect(() => {

    },[portionNumber])

    return (
        <div>


            <nav className={s.pagination}>
                <ul>
                    {/*----- Back to the Future portion -----*/}
                    {
                        portionNumber > 1
                        && <li>
                            <SuperButton
                                className={s.btn}
                                onClick={() => setPortionNumber(state => state - 1)}>{"<"}
                            </SuperButton>
                        </li>
                    }
                    {
                        pageNumbers
                            .filter(p => p.page >= leftPortionPageNumber && p.page <= rightPortionPageNumber)
                            .map((p: any) => {
                                return (
                                    <li key={p.page}>
                                        <SuperButton
                                            className={`${p.isActive && s.active} ${s.btn}`}
                                            onClick={() => paginate(p.page)}
                                        >{p.page}
                                        </SuperButton>
                                    </li>
                                )
                            })
                    }
                    {/*----- Forward portion -----*/}
                    {
                        portionPagesCount > portionNumber
                        && <li>
                            <SuperButton
                                className={s.btn}
                                onClick={() => setPortionNumber(state => state + 1)}>{">"}
                            </SuperButton>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;