import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskIsDone: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
}

export const Todolist: React.FC<TodolistPropsType> = ({
                                                          id,
                                                          title,
                                                          tasks,
                                                          filter,
                                                          removeTodolist,
                                                          addTask,
                                                          removeTask,
                                                          changeTaskIsDone,
                                                          changeFilter
                                                      }) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addTask(newTitle, id)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onAllButtonClickHandler = () => changeFilter(id, 'all')
    const onActiveButtonClickHandler = () => changeFilter(id, 'active')
    const onCompletedButtonClickHandler = () => changeFilter(id, 'completed')

    const buttonAllClassName = filter === 'all' ? 'active-filter' : '';
    const buttonActiveClassName = filter === 'active' ? 'active-filter' : '';
    const buttonCompletedClassName = filter === 'completed' ? 'active-filter' : '';

    return (
        <div>
            <h3>{title}<Button nickName={'x'} callBack={removeTodolistHandler}/></h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onInputChangeHandler}
                    onKeyDown={onPressEnterHandler}
                    className={error ? 'error' : ''}
                />
                <Button nickName={'+'} callBack={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks.map(t => {
                    const changeTaskIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskIsDone(id, t.id, e.currentTarget.checked)
                    }
                    const removeTaskHandler = () => {
                        removeTask(t.id, id)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskIsDoneHandler}/>
                            <span>{t.title}</span>
                            <Button nickName={'x'} callBack={removeTaskHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button nickName={'All'} callBack={onAllButtonClickHandler} className={buttonAllClassName}/>
                <Button nickName={'Active'} callBack={onActiveButtonClickHandler} className={buttonActiveClassName}/>
                <Button nickName={'Completed'} callBack={onCompletedButtonClickHandler}
                        className={buttonCompletedClassName}/>
            </div>
        </div>
    )
}