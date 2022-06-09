import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from 'react'
import SuperInputText from '../superInputText/SuperInputText'
import s from './SuperEditableSpan.module.css';


// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string


    spanProps?: DefaultSpanPropsType // пропсы для спана
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus, // игнорировать изменение этого пропса
        onBlur,
        onEnter,
        spanProps,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false) // выключить editMode при нажатии Enter

        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false) // выключить editMode при нажатии за пределами инпута

        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true) // включить editMode при двойном клике

        onDoubleClick && onDoubleClick(e)
    }

    const spanClassName = `${s.spanClassName} ${className}`

    return (
        <>
            {
                editMode
                    ? (
                        <SuperInputText
                            autoFocus // пропсу с булевым значением не обязательно указывать true
                            onBlur={onBlurCallback}
                            onEnter={onEnterCallback}

                            {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                        />
                    ) : (
                        <span
                            className={` ${!children && s.fillInField }   ${spanClassName} `}
                            onDoubleClick={onDoubleClickCallBack}

                            {...restSpanProps}
                        >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}

                            {children || restProps.value}
                            <img style={{height:'30px', padding: "0 0 0 10px"}}
                                 src="https://cdn.icon-icons.com/icons2/1744/PNG/512/3643749-edit-pen-pencil-write-writing_113397.png"
                                 alt=""/>
                    </span>
                    )
            }
        </>
    )
}

export default SuperEditableSpan