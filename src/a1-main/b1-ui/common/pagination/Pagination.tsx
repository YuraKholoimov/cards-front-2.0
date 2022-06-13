import React, {useEffect, useState} from 'react';
import s from "./pagination.module.css"
import SuperButton from "../superButton/SuperButton";

type PaginationPropsType = {
    TotalCount: number
    countPerPage: number
    currentPage: number
    selectPacksPage?: (num: number) => void
    selectCardsPage?: (num: number) => void
}


const Pagination: React.FC<PaginationPropsType> = ({
                                                       TotalCount,
                                                       countPerPage,
                                                       currentPage,
                                                       selectPacksPage,
                                                       selectCardsPage
                                                   }) => {
    const portionSize = 5;
    const pagesTotalCount = Math.ceil(TotalCount / countPerPage);
    const pageNumbers: any[] = [];
    for (let i = 1; i < pagesTotalCount; i++) {
        pageNumbers.push(i == currentPage ? {page: i, isActive: true} : {page: i, isActive: false})
    }


    const portionPagesCount = Math.ceil(pagesTotalCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    const selectPageHandler = (num: number) => {
        selectPacksPage && selectPacksPage(num)
        selectCardsPage && selectCardsPage(num)
    }
    useEffect(() => {

    }, [portionNumber])

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
                                            onClick={() => selectPageHandler(p.page)}
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