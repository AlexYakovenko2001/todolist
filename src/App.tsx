import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])


    const removeTask = (taskID: number) => {
        setTasks(tasks.filter((el) => el.id !== taskID))
    }

    // const filterTask = (filtredValue: string) => {
    //     setFilter(filtredValue)
    // }
    // const [filter, setFilter] = useState('all')
    // let colander = tasks
    // if (filter === 'active') {
    //     colander = tasks.filter(el => !el.isDone)
    // }
    // if (filter === 'completed') {
    //     colander = tasks.filter(el => el.isDone)
    // }
    return (
        <div className="App">
            <Todolist
                title={'what to learn'}
                tasks={tasks}
                removeTask={removeTask}/>
            {/*filterTask={filterTask}*/}
        </div>
    );
}

export default App;
