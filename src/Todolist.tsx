import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler()
    }

    const tsarFooHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button callBack={addTaskHandler} nickName={'+'}/>
            </div>
            <ul>
                {props.tasks.map((t) => {
                            const removeTask = () => {
                                props.removeTask(t.id)
                            }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <Button callBack={removeTask} nickName={'X'}/>
                                </li>
                            )
                        })}
            </ul>
            <div>
                <Button callBack={() => tsarFooHandler('all')} nickName={'All'}/>
                <Button callBack={() => tsarFooHandler('active')} nickName={'Active'}/>
                <Button callBack={() => tsarFooHandler('completed')} nickName={'Completed'}/>
            </div>
        </div>)
}
