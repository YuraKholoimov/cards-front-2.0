import React, {useEffect, useState} from 'react';
import SuperEditableSpan from "../../../../a1-main/b1-ui/common/superEditableSpan/SuperEditableSpan";
import {useFormik} from "formik";
import {useAppSelector} from "../../../../a1-main/b2-bll/store";
import s from "./Card.module.css";
import SuperButton from "../../../../a1-main/b1-ui/common/superButton/SuperButton";
import {DeleteCardForm} from "../../../../a1-main/b1-ui/common/modal/DeleteCardForm/DeleteCardForm";
import {EditCardForm} from "../../../../a1-main/b1-ui/common/modal/EditCardForm/EditCardForm";


type CardType = {
    question: string
    answer: string
    lastUpdated: string
    cardId: string
    deleteCard: (cardId: string) => void
    editCard: (_id: string, question: string, answer: string) => void
    userId: string
}

const Card: React.FC<CardType> = ({lastUpdated, question, editCard, answer, cardId, deleteCard, userId}) => {
    const myUserId = useAppSelector(state => state.auth.userId)
    const grade = useAppSelector(state => state.cards.grade)
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [isEditeOpen, setIsEditeOpen] = useState<boolean>(false)
    let rating = +grade.toFixed(0)
    const finalClass1 = `${1 <= rating ? `${s.active}` : ``}`
    const finalClass2 = `${2 <= rating ? `${s.active}` : ``}`
    const finalClass3 = `${3 <= rating ? `${s.active}` : ``}`
    const finalClass4 = `${4 <= rating ? `${s.active}` : ``}`
    const finalClass5 = `${5 <= rating ? `${s.active}` : ``}`



    // const deleteCardHandler = () => {
    //     deleteCard(cardId)
    // }
    // const editCardHandler = () => {
    //     formik.handleSubmit()
    // }
    const formik = useFormik({
        initialValues: {
            question: question
        },
        onSubmit: values => {

        }
    })
    //    формик кеширует, перезапрашиваем
    useEffect(() => {
        formik.setValues({question})
    }, [question])

    return (

        <div className={s.card}>

            <div>
                <SuperEditableSpan
                    id={'question'}
                    type={'text'}
                    onEnter={() => {
                        formik.handleSubmit()
                    }}

                    {...formik.getFieldProps('question')}
                />
            </div>
            <div>{answer}</div>
            <div>{lastUpdated}</div>
            <div className={s.rating_result}>

                <span className={finalClass1}> </span>
                <span className={finalClass2}> </span>
                <span className={finalClass3}> </span>
                <span className={finalClass4}> </span>
                <span className={finalClass5}> </span>
            </div>
            <div>{myUserId === userId &&
                <div>
                    <SuperButton className={s.deleteBtn} onClick={() => setDeleteOpen(true)}>delete</SuperButton>
                    <SuperButton className={s.editBtn} onClick={() => setIsEditeOpen(true)}>edit</SuperButton>
                    <DeleteCardForm isOpen={isDeleteOpen} setDeleteClose={() => setDeleteOpen(false)} cardId={cardId} deleteCard={deleteCard}/>
                    <EditCardForm isOpen={isEditeOpen} setEditClose={() => setIsEditeOpen(false)} cardId={cardId} editCard={editCard}/>
                </div>
            }
            </div>
        </div>
    );
};

export default Card;