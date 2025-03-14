import { create } from "zustand"
import { ITodo } from "../interfaces/todo"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"

interface State {
    todos: ITodo[]
    currentTodo?: ITodo
    isOpenAddUpdateModal: boolean
}

interface Actions {
    setCheckedTodo: (id: string) => void
    deleteTodo: (id: string) => void
    addTodo: (todo: ITodo) => void
    updateTodo: (editedTodo: ITodo) => void
    openAddModal: () => void
    openUpdateModal: (id: string) => void
    closeModal: () => void
}

const initialState: State = {
    todos: [],
    isOpenAddUpdateModal: false
}

const useTodos = create<State & Actions>()(
    persist(
        immer(
            (set) => ({
                ...initialState,
                setCheckedTodo: (id) => set((state) => {
                    const todo = state.todos.find(todo => todo.id === id)
    
                    if (todo) {
                        todo.isComplete = !todo.isComplete
                    }
                }),
                deleteTodo: (id) => set((state) => {
                    state.todos = state.todos.filter(todo => todo.id !== id)
                }),
                addTodo: (todo) => set((state) => {
                    state.todos.push(todo)
                }),
                updateTodo: (editedTodo) => set((state) => {
                    const todo = state.todos.find(todo => todo.id === editedTodo.id)
    
                    if (todo) {
                        state.todos = state.todos.filter(todo => todo.id !== editedTodo.id)
                        state.todos.push(editedTodo)
                    }
                }),
                openAddModal: () => set((state) => {
                    state.currentTodo = undefined
                    state.isOpenAddUpdateModal = true
                }),
                openUpdateModal: (id) => set((state) => {
                    state.currentTodo = state.todos.find(todo => todo.id === id)
                    state.isOpenAddUpdateModal = true
                }),
                closeModal: () => set((state) => {
                    state.isOpenAddUpdateModal = false
                })
            })
        ),
        {
            name: "todos"
        }
    )
)

export default useTodos