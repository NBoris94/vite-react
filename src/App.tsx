import './App.css'
import TodoList from './components/TodoList'
import AddEditTodo from './components/AddEditTodo'
import useTodos from './store/todos'

function App() {
    const todos = useTodos(state => state.todos)
    const openAddModal = useTodos(state => state.openAddModal)

    return (
        <main className="todos">
            <div className="container">
                <h1 className="todos__title">Список задач</h1>

                <AddEditTodo />

                <div className="todos__group">

                    <button
                        className="todos__add btn-reset"
                        type="button"
                        onClick={openAddModal}
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
                />

                <TodoList
                    title='Выполненные задачи'
                    todoList={todos.filter(todo => todo.isComplete)}
                />
            </div>
        </main>
    )
}

export default App
