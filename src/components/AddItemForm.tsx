import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onInputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.callback(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input value={title} onChange={onInputChangeHandler} onKeyDown={onKeyDownHandler} className={error ? 'error' : ''} />
            <Button nickName={'+'} callBack={addItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}