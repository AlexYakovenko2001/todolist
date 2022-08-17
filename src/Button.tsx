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
    const classForButton = props.className ? props.className : ''
    return (
        <button className={classForButton} onClick={onClickHandler}>{props.nickName}</button>
    )
}