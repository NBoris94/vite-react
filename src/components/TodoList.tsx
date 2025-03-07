import { FC } from 'react'
import { ITodo } from '../interfaces/todo'
import Todo from './Todo'

interface TodoListProps {
    title: string
    todoList: ITodo[]
    onChecked: (id: string) => void 
    onDelete: (id: string) => void 
}

const TodoList: FC<TodoListProps> = ({
    title,
    todoList,
    onChecked,
    onDelete
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
                        onChecked={onChecked}
                        onDelete={onDelete}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TodoList