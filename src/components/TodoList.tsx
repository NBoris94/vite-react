import { FC } from 'react'
import { ITodo } from '../interfaces/todo'
import Todo from './Todo'

interface TodoListProps {
    title: string
    todoList: ITodo[]
}

const TodoList: FC<TodoListProps> = ({
    title,
    todoList,
}) => {
    if (todoList.length === 0) return null

    return (
        <ul className="todos-list">
            <li className="todos-list__title">
                <h2>{title} - <span>{todoList.length}</span></h2>
            </li>
            {todoList.map(todo => (
                <li className="todos-list__item" key={todo.id}>
                    <Todo 
                        {...todo}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TodoList