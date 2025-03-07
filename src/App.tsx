import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import { ITodo } from './interfaces/todo'
import { INITIAL_TODO_STATE } from './data/todos'
import AddEditTodo from './components/AddEditTodo'

function App() {
    const [todos, setTodos] = useState<ITodo[]>(INITIAL_TODO_STATE)

    const handleChecked = (id: string) => {
        setTodos(prevState => prevState.map(todo => {
            const editedTodo: ITodo = {...todo}
            if (editedTodo.id === id) editedTodo.isComplete = !editedTodo.isComplete

            return editedTodo
        }))
    }

    const handleDelete = (id: string) => {
        setTodos(prevState => prevState.filter(todo => todo.id !== id))
    }

    return (
        <main className="todos">
            <div className="container">
                <h1 className="todos__title">Список задач</h1>

                <AddEditTodo />

                <div className="todos__group">

                    <a className="todos__add btn-reset" href="/add-task.html">
                        <span>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <rect x="15" width="25" height="5" rx="2.5" transform="rotate(90 15 0)" />
                                <rect y="10" width="25" height="5" rx="2.5" />
                            </svg>
                        </span>
                        Добавить задачу
                    </a>

                </div>

                <TodoList 
                    title='Задачи'
                    todoList={todos.filter(todo => !todo.isComplete)}
                    onChecked={handleChecked}
                    onDelete={handleDelete}
                />

                <TodoList 
                    title='Выполненные задачи'
                    todoList={todos.filter(todo => todo.isComplete)}
                    onChecked={handleChecked}
                    onDelete={handleDelete}
                />
            </div>
        </main>
    )
}

export default App
