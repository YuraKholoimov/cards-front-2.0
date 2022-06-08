import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../a1-main/b2-bll/store";
import {setPacksCount, setPacksThunk, showMyOrAllPacks} from "../../../a1-main/b2-bll/packsReducer";
import {PacksType} from "../../../a1-main/b3-dal/packsApi";
import HeaderPacks from "../c2-headerPacks/HeaderPacks";
import Pack from "./pack/pack";
import s from './Packs.module.css'

const Packs = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector<Array<PacksType>>(state => state.packs.cardsPack)
    const packsPerPage = useAppSelector<number>(state => state.packs.pageCount)
    const sortPacks = useAppSelector<string>(state => state.packs.sortPacks)
    const userId = useAppSelector<string>(state => state.profile._id)
    const id = useAppSelector<string>(state => state.packs.user_id)
    const packName = useAppSelector<string>(state => state.packs.packName)

    useEffect(() => {
        dispatch(setPacksThunk())
        dispatch(setPacksCount(20))

    }, [packsPerPage, sortPacks, id, packName, dispatch])

    // const showMorePacks = () => {
    //     dispatch(setPacksCount(20))
    // }
    // const showMyPacksHandler = () => {
    //     dispatch(showMyOrAllPacks(userId))
    // }
    // const showAllPacksHandler = () => {
    //     dispatch(showMyOrAllPacks(''))
    // }

    return (
        <div className={s.table}>
            {/*<div className={s.buttons}>*/}
            {/*    <button>user</button>*/}
            {/*    <button onClick={showMorePacks}>выводить на страницу по 10</button>*/}
            {/*    <button onClick={showMyPacksHandler}>Показать мои паки</button>*/}
            {/*    <button onClick={showAllPacksHandler}>Показать все паки</button>*/}
            {/*</div>*/}
            <div className={s.packs}>
                <HeaderPacks/>
                <ul>
                    {packs.map(pack => {
                        return (
                            <Pack key={pack._id}
                                  packId={pack._id}
                                  name={pack.name}
                                  cardsCount={pack.cardsCount}
                                  updated={pack.updated}
                                  userName={pack.user_name}/>

                        )
                    })}
                </ul>
            </div>


        </div>
    );
};

export default Packs;