import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const idTodolist1 = v1();
    const idTodolist2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: idTodolist1, title: 'What to learn', filter: 'all'},
        {id: idTodolist2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState({
        [idTodolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [idTodolist2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Ice cream', isDone: true},
            {id: v1(), title: 'Cucumber', isDone: false},
        ]
    })

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTasks = tasks[todolistId]
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...newTasks]
        setTasks({...tasks})
    }
    const removeTask = (taskId: string, todolistId: string) => {
        const newTasks = tasks[todolistId];
        tasks[todolistId] = newTasks.filter(t => t.id !== taskId);
        setTasks({...tasks})
    }
    const changeTaskIsDone = (todolistId: string, taskId: string, isDone: boolean) => {
        const newTasks = tasks[todolistId]
        const task = newTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const newFilter = todolists.find(tl => tl.id === todolistId)
        if (newFilter) {
            newFilter.filter = value
            setTodolists([...todolists])
        }
    }
    return (
        <div className="App">
            {todolists.map(tl => {
                let filtredTasks = tasks[tl.id]
                if (tl.filter === 'active') {
                    filtredTasks = filtredTasks.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    filtredTasks = filtredTasks.filter(t => t.isDone)
                }
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filtredTasks}
                        removeTodolist={removeTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskIsDone={changeTaskIsDone}
                        changeFilter={changeFilter}
                    />
                )
            })}
        </div>
    );
}

export default App;
