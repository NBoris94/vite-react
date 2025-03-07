import { ChangeEvent, FC, useState } from 'react'
import Modal from './Modal'
import { ITodo } from '../interfaces/todo'

interface AddEditTodoProps {
    todo?: ITodo
}

const AddEditTodo: FC<AddEditTodoProps> = ({
    todo
}) => {
    const [text, setText] = useState(todo ? todo.text : "")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return (
        <Modal
            title={todo ? "Редактирование задачи" : "Добавление новой задачи"}
        >
            <form className="form">
                <div className="form__group">
                    <input 
                        className="form__input form__input_error" 
                        type="text" 
                        placeholder="Текст задачи"
                        value={text}
                        onChange={handleChange}
                    />
                    <span className="form__error">Ошибка</span>
                </div>
                <div className="form__btns">
                    <button className="form__btn form__submit btn-reset" type="submit" disabled>Сохранить</button>
                    <a className="form__btn form__cancel btn-reset" href="/">Отмена</a>
                </div>
            </form>
        </Modal>
    )
}

export default AddEditTodo