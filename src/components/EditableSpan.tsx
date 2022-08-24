import {ChangeEvent, useState} from 'react';
import React from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.callback(newTitle)
    }

    return editMode
        ? <input value={newTitle} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}