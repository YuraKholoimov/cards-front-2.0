import React, {useEffect, useState} from 'react';
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import {clearFilterPackName, setCurrentPage, setPacksThunk} from "../../../a1-main/b2-bll/packsReducer";
import {PacksType} from "../../../a1-main/b3-dal/packsApi";
import HeaderPacks from "./c2-headerPacks/HeaderPacks";
import Pack from "./pack/pack";
import s from './Packs.module.css'
import {useSelector} from "react-redux";
import Pagination from "../../../a1-main/b1-ui/common/pagination/Pagination";
import SuperSelect from "../../../a1-main/b1-ui/common/seperSelect/SuperSelect";
import Loading from "../../../a1-main/b1-ui/common/loading/Loading";


const Packs = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector<Array<PacksType>>(state => state.packs.cardsPack)
    const packsPerPage = useAppSelector<number>(state => state.packs.pageCount)
    const sortPacks = useAppSelector<string>(state => state.packs.sortPacks)
    const id = useAppSelector<string>(state => state.packs.user_id)
    const packName = useAppSelector<string>(state => state.packs.packName)
    const min = useAppSelector((state) => state.packs.min)
    const max = useAppSelector((state) => state.packs.max)
    const page = useAppSelector(state => state.packs.page)
    const packsTotalCount = useAppSelector(state => state.packs.totalCount)
    const arrValue = ['5', '10', '15', '20']
    const [value, setValue] = useState(arrValue[0])
    useEffect(() => {
        dispatch(setPacksThunk())
    }, [packsPerPage, sortPacks, id, packName, min, max, page])

    useEffect(() => {
        return () => {
            dispatch(clearFilterPackName())
        }
    }, [])
    const paginate = (num: number) => {
        dispatch(setCurrentPage(num))
    }

    const loading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    return (
        <div className={s.table}>
            <HeaderPacks/>
            <table className={s.packs}>
                {loading && <Loading/>}
                {packs.length > 0 ? packs.map(pack => {
                    return (
                        <Pack key={pack._id}
                              packId={pack._id}
                              name={pack.name}
                              cardsCount={pack.cardsCount}
                              updated={pack.updated}
                              userName={pack.user_name}
                              userId={pack.user_id}
                        />
                    )
                }): <div style={{padding: '16px 24px'}}>Ничего не найдено</div>}
            </table>
            <div className={s.pagination}>

                <Pagination TotalCount={packsTotalCount} countPerPage={packsPerPage} currentPage={page} selectPacksPage={paginate}/>
                <SuperSelect value={value} options={arrValue} onChangeOption={setValue}/>
            </div>
        </div>
    );
};

export default Packs;