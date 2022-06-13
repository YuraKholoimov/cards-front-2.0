import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    light?: boolean
    width?: number
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, light, className, width,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${red ? s.red : s.default}  ${light ? s.light : s.default} ${className}`

    return (
        <button
            className={finalClassName}
            style={{width}}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
};

export default SuperButton;
