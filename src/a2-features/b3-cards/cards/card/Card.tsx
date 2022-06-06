import React from 'react';
import SuperEditableSpan from "../../../../a1-main/b1-ui/common/superEditableSpan/SuperEditableSpan";
import {useFormik} from "formik";

type CardType = {
    question: string
    answer: string
    lastUpdated: string
    grade: number
    cardId: string
    deleteCard:(cardId: string)=>void
    editCard:(_id: string, question: string)=>void
}
const Card: React.FC<CardType> = ({lastUpdated,grade,question,editCard,answer,cardId,deleteCard}) => {
    const deleteCardHandler = () => {
        deleteCard(cardId)
    }
    const formik = useFormik({
        initialValues: {
            question: question
        },
        onSubmit: values => {
            editCard(cardId, values.question)
        }
    })
    return (
        <div>

            <SuperEditableSpan
                id={'question'}
                type={'text'}
                onEnter={()=>{formik.handleSubmit()}}
                // spanProps={{
                //     children: formik.values.question
                //         ? undefined
                //         : 'Change question name'
                // }}

                {...formik.getFieldProps('question')}
            />
            <div>{answer}</div>
            <div>{lastUpdated}</div>
            <div>{grade}</div>
            <button onClick={deleteCardHandler}>delete</button>


        </div>
    );
};

export default Card;