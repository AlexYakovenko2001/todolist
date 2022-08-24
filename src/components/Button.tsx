import React from 'react';

type ButtonPropsType = {
    nickName: string
    callBack: () => void
    className?: string
}

export const Button: React.FC<ButtonPropsType> = (props) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return <button onClick={onClickHandler} className={props.className}>{props.nickName}</button>
}