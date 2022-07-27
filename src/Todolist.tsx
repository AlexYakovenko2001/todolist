import React, {useState} from 'react';

type TodolistPropsType={
    title: string
    tasks: Array<InArrayProps>
    removeTask: (taskID:number)=>void
    //filterTask: (filtredValue:string) => void
}

type InArrayProps={
    id: number
    title: string
    isDone: boolean
}
export const Todolist=(props: TodolistPropsType)=>{

     const filterTask = (filtredValue: string) => {
        setFilter(filtredValue)
    }
    const [filter, setFilter] = useState('all')
    let colander = props.tasks
    if (filter === 'active') {
        colander = props.tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        colander = props.tasks.filter(el => el.isDone)
    }

    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {colander.map((el)=>{
                    return (

                        <li key={el.id}>
                            <button onClick={()=>{props.removeTask(el.id)}}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>{filterTask('all')}}>All</button>
                <button onClick={()=>{filterTask('active')}}>Active</button>
                <button onClick={()=>{filterTask('completed')}}>Completed</button>
            </div>
        </div>
    )
}