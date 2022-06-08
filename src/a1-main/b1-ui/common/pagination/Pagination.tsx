import React, {useEffect, useState} from 'react';
import SuperButton from "../superButton/SuperButton";

import s from "./pagination.module.css"
import {packsApi} from "../../../b3-dal/packsApi";
import Preloader from "../preloader/Preloader";

type PropsType = {
    // totalCount: number
    // pageSize: number
    // currentPage: number
    // onPageChange: (n: number) => void
}

const Pagination: React.FC<PropsType> = (props) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [packsPerPage, setPacksPerPage] = useState<number>(10)
    const [packsTotalCount, setPacksTotalCount] = useState<number>(0)
    const [packs, setPacks] = useState<[] | null>([])
    const portionSize = 5;

    useEffect(() => {
        setPacks(null)
        packsApi.getPacks(currentPage, packsPerPage)
            .then(res => {
                // console.log(res.data)
                setPacksTotalCount(res.data.cardPacksTotalCount)
                setPacks(res.data.cardPacks)
            })
            .catch(rej => console.error(rej))
    }, [currentPage]);

    const pagesTotalCount = Math.ceil(packsTotalCount / packsPerPage);

    const pageNumbers: any[] = [];
    for (let i = 1; i < pagesTotalCount; i++) {
        pageNumbers.push(i == currentPage ? {page: i, isActive: true} : {page: i, isActive: false})
    }

    const paginate = (num: number) => setCurrentPage(num)

    const portionPagesCount = Math.ceil(pagesTotalCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div>
            {packs ? packs.map((p: any) => <li>{p.user_name}</li>) : <Preloader/>}

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