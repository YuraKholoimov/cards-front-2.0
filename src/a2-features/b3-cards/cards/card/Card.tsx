import React, {useEffect} from 'react';
import SuperEditableSpan from "../../../../a1-main/b1-ui/common/superEditableSpan/SuperEditableSpan";
import {useFormik} from "formik";
import {useAppSelector} from "../../../../a1-main/b2-bll/store";

type CardType = {
    question: string
    answer: string
    lastUpdated: string
    grade: number
    cardId: string
    deleteCard: (cardId: string) => void
    editCard: (_id: string, question: string) => void
    userId: string
}
const Card: React.FC<CardType> = ({lastUpdated, grade, question, editCard, answer, cardId, deleteCard, userId}) => {
    const myUserId = useAppSelector(state => state.auth.userId)
    const deleteCardHandler = () => {
        deleteCard(cardId)
    }
    const editCardHandler = () => {
        formik.handleSubmit()
    }
    const formik = useFormik({
        initialValues: {
            question: question
        },
        onSubmit: values => {
            editCard(cardId, values.question)
        }
    })
    //    формик кеширует, перезапрашиваем
    useEffect(() => {
        formik.setValues({question})
    }, [question])

    return (
        <div>
            <SuperEditableSpan
                id={'question'}
                type={'text'}
                onEnter={() => {
                    formik.handleSubmit()
                }}

                {...formik.getFieldProps('question')}
            />
            <div>{answer}</div>
            <div>{lastUpdated}</div>
            <div>{grade}</div>
            <div>{myUserId === userId &&
                <div>
                    <button onClick={deleteCardHandler}>delete</button>
                    <button onClick={editCardHandler}>edit</button>
                </div>
            }

            </div>


        </div>
    );
};

export default Card;