import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import Modal from './Modal'
import { ITodo } from '../interfaces/todo'
import { nanoid } from 'nanoid'
import useTodos from '../store/todos'

interface AddEditTodoProps {

}

interface IFormState {
    text: string
}

interface IFormErrorState {
    text: string
}

const INITIAL_FORM_STATE: IFormState = {
    text: ""
}

const INITIAL_FORM_ERROR_STATE: IFormState = {
    text: ""
}

const AddEditTodo: FC<AddEditTodoProps> = () => {
    const todo = useTodos(state => state.currentTodo)
    const isOpenAddUpdateModal = useTodos(state => state.isOpenAddUpdateModal)
    const addTodo = useTodos(state => state.addTodo)
    const updateTodo = useTodos(state => state.updateTodo)
    const closeModal = useTodos(state => state.closeModal)
    const [form, setForm] = useState<IFormState>(INITIAL_FORM_STATE)
    const [errors, setErrors] = useState<IFormErrorState>(INITIAL_FORM_ERROR_STATE)

    useEffect(() => {
        if (todo) {
            setForm(prevState => {
                return {
                    ...prevState,
                    text: todo.text
                }
            })
        }
        else {
            setForm(prevState => ({ ...prevState, text: "" }))
        }
    }, [todo])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name

        setForm(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let isValid = true

        if (form.text === '') {
            isValid = false
            setErrors(prevState => ({ ...prevState, text: "Поле не должно быть пустым" }))
        }

        if (isValid) {
            setErrors(INITIAL_FORM_ERROR_STATE)

            if (todo) {
                const editedTodo = { ...todo, text: form.text }

                updateTodo(editedTodo)
            }
            else {
                const newTodo: ITodo = {
                    id: nanoid(),
                    text: form.text,
                    isComplete: false
                }

                addTodo(newTodo)
            }

            setForm(INITIAL_FORM_STATE)
            closeModal()
        }
    }

    return (
        <Modal
            isOpen={isOpenAddUpdateModal}
            title={todo ? "Редактирование задачи" : "Добавление новой задачи"}
            onClose={closeModal}
        >
            <form 
                className="form"
                onSubmit={handleSubmit}
            >
                <div className="form__group">
                    <input 
                        className={`form__input ${errors.text ? "form__input_error" : null}`} 
                        type="text" 
                        placeholder="Текст задачи"
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                    />
                    {errors.text && <span className="form__error">{errors.text}</span>}
                </div>
                <div className="form__btns">
                    <button className="form__btn form__submit btn-reset" type="submit">Сохранить</button>
                    <button 
                        className="form__btn form__cancel btn-reset"
                        type="button"
                        onClick={closeModal}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddEditTodo