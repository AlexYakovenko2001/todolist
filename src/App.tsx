import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Cucumbers', isDone: false},
            {id: v1(), title: 'Oranges', isDone: true},
            {id: v1(), title: 'Bananas', isDone: true},
        ]
    })

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const todolist: TodolistType = {id: todolistId, title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addNewTask = (todolistId: string, title: string) => {
        const task = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }
    const changeTaskIsDone = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
      setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))
    }
    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map(tl => {
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
                            todolistId={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={filtredTasks}
                            changeTodolistTitle={changeTodolistTitle}
                            removeTodolist={removeTodolist}
                            addNewTask={addNewTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskIsDone={changeTaskIsDone}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
