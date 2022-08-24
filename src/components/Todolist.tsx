import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from './AddItemForm';
import {Button} from './Button';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    addNewTask: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskIsDone: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = (newTitle: string) => {
        props.addNewTask(props.todolistId, newTitle)
    }

    const onAllButtonClickHandler = () => props.changeFilter(props.todolistId, 'all')
    const onActiveButtonClickHandler = () => props.changeFilter(props.todolistId, 'active')
    const onCompletedButtonClickHandler = () => props.changeFilter(props.todolistId, 'completed')
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={changeTodolistTitleHandler}/>
                <Button nickName={'x'} callBack={removeTodolistHandler}/>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {props.tasks.map(t => {
                    const changeTaskTitleHanlder = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId, t.id, newTitle)
                    }
                    const changeTaskIsDoneHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskIsDone(props.todolistId, t.id, e.currentTarget.checked)
                    }
                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistId, t.id)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" onChange={changeTaskIsDoneHandler} checked={t.isDone}/>
                            <EditableSpan title={t.title} callback={changeTaskTitleHanlder}/>
                            <Button nickName={'x'} callBack={removeTaskHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button nickName={'All'} callBack={onAllButtonClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}/>
                <Button nickName={'Active'} callBack={onActiveButtonClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}/>
                <Button nickName={'Completed'} callBack={onCompletedButtonClickHandler} className={props.filter === 'completed' ? 'active-filter' : ''}/>
            </div>
        </div>
    );
};
