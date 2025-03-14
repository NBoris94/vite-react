import { INITIAL_TODO_STATE } from "../data/todos"
import { ITodo } from "../interfaces/todo"

export interface TodoReducerState {
    todos: ITodo[]
    currentTodo?: ITodo
    isOpenAddUpdateModal: boolean
}

export type TodoReducerActionType = 
{
    type: 'checked',
    payload: string
} |
{
    type: 'delete',
    payload: string
} |
{
    type: 'add',
    payload: ITodo
} |
{
    type: 'update',
    payload: ITodo
} |
{
    type: 'open_update_modal',
    payload: string
} |
{
    type: 'open_add_modal'
} |
{
    type: 'close_modal'
}

const initialTodoReducerState: TodoReducerState = {
    todos: INITIAL_TODO_STATE,
    isOpenAddUpdateModal: false
}

const todoReducer = (state: TodoReducerState, action: TodoReducerActionType): TodoReducerState => {
    switch (action.type) {
        case 'checked':
            const updatedTodos = state.todos.map(todo => {
                const editedTodo: ITodo = {...todo}
                if (editedTodo.id === action.payload) editedTodo.isComplete = !editedTodo.isComplete
    
                return editedTodo
            })
            return { ...state, todos: updatedTodos }
        
        case 'delete':
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) }

        case 'add':
            return { ...state, todos: [ ...state.todos, action.payload ]}

        case 'update':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return action.payload
                    }
        
                    return todo
                })
            }

        case 'open_add_modal':
            return {
                ...state,
                currentTodo: undefined,
                isOpenAddUpdateModal: true
            }

        case 'open_update_modal':
            return {
                ...state,
                currentTodo: state.todos.find(todo => todo.id === action.payload),
                isOpenAddUpdateModal: true
            }

        case 'close_modal':
            return {
                ...state,
                isOpenAddUpdateModal: false
            }
    }
}

export { initialTodoReducerState, todoReducer }