import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import { ITodo } from './interfaces/todo'
import { INITIAL_TODO_STATE } from './data/todos'
import AddEditTodo from './components/AddEditTodo'

function App() {
    const [todos, setTodos] = useState<ITodo[]>(INITIAL_TODO_STATE)
    const [isOpen, setIsOpen] = useState(false)
    const [currentTodo, setCurrentTodo] = useState<ITodo>()

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

    const handleOpenModalUpdate = (id: string) => {
        setCurrentTodo(todos.find(todo => todo.id === id))
        setIsOpen(true)
    }

    const handleOpenModalAdd = () => {
        if (currentTodo) setCurrentTodo(undefined)
        setIsOpen(true)
    }

    const handleAddTodo = (todo: ITodo) => {
        setTodos(prevState => [ ...prevState, todo ])
    }

    const handleUpdateTodo = (editedTodo: ITodo) => {
        setTodos(prevState => (prevState.map(todo => {
            if (todo.id === editedTodo.id) {
                return editedTodo
            }

            return todo
        })))
    }

    return (
        <main className="todos">
            <div className="container">
                <h1 className="todos__title">Список задач</h1>

                <AddEditTodo
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    todo={currentTodo}
                    onAddTodo={handleAddTodo}
                    onUpdateTodo={handleUpdateTodo}
                />

                <div className="todos__group">

                    <button 
                        className="todos__add btn-reset" 
                        type="button"
                        onClick={handleOpenModalAdd}
                    >
                        <span>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <rect x="15" width="25" height="5" rx="2.5" transform="rotate(90 15 0)" />
                                <rect y="10" width="25" height="5" rx="2.5" />
                            </svg>
                        </span>
                        Добавить задачу
                    </button>

                </div>

                <TodoList 
                    title='Задачи'
                    todoList={todos.filter(todo => !todo.isComplete)}
                    onChecked={handleChecked}
                    onDelete={handleDelete}
                    onOpenModalUpdate={handleOpenModalUpdate}
                />

                <TodoList 
                    title='Выполненные задачи'
                    todoList={todos.filter(todo => todo.isComplete)}
                    onChecked={handleChecked}
                    onDelete={handleDelete}
                    onOpenModalUpdate={handleOpenModalUpdate}
                />
            </div>
        </main>
    )
}

export default App
