import { FC, FormEvent, useState } from 'react'
import { ITodo } from '../interfaces/todo'
import Modal from './Modal'
import useTodos from '../store/todos'

interface TodoProps extends ITodo {
}

const Todo: FC<TodoProps> = ({
    id,
    text,
    isComplete
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const deleteTodo = useTodos(state => state.deleteTodo)
    const setCheckedTodo = useTodos(state => state.setCheckedTodo)
    const openUpdateModal = useTodos(state => state.openUpdateModal)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        deleteTodo(id)
    }

    return (
        <>
            <Modal 
                isOpen={isOpen}
                title="Удалить задачу"
                onClose={() => setIsOpen(false)}
            >
                <form 
                    className="form"
                    onSubmit={handleSubmit}
                >
                    <p className="form__text">Вы действительно хотите удалить задачу "{id}"?</p>
                    <div className="form__btns">
                        <button 
                            className="form__btn form__submit btn-reset" 
                            type="submit"
                        >
                            Да
                        </button>
                        <button 
                            className="form__btn form__cancel btn-reset" 
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </Modal>
            <div className="todo-card">
                <div className="todo-card__group">
                    <input 
                        className="todo-card__input" 
                        type="checkbox" 
                        name="todos" 
                        id={`todo-${id}`} 
                        checked={isComplete}
                        onChange={() => setCheckedTodo(id)}
                    />
                    <label className="todo-card__label" htmlFor={`todo-${id}`}>
                        <span>{text}</span>
                    </label>
                </div>
                <div className="todo-card__btns">
                    <button
                        className="todo-card__edit" 
                        type="button"
                        onClick={() => openUpdateModal(id)}
                    >
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="64px" height="64px">
                            <path d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z" />
                        </svg>
                    </button>
                    <button 
                        className="todo-card__remove" 
                        type="button"
                        onClick={() => setIsOpen(true)}
                    >
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="black" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15" width="25" height="5" rx="2.5" transform="rotate(90 15 0)" />
                            <rect y="10" width="25" height="5" rx="2.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Todo