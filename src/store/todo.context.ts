import { ActionDispatch, createContext } from "react"
import { initialTodoReducerState, TodoReducerActionType, TodoReducerState } from "../reducers/todo.reducer"

export const TodosContext = createContext<TodoReducerState>(initialTodoReducerState)
export const TodosDispatchContext = createContext<ActionDispatch<[action: TodoReducerActionType]>>(() => null)