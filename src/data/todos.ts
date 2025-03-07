import { ITodo } from "../interfaces/todo";

export const INITIAL_TODO_STATE: ITodo[] = [
    {
        id: '1',
        text: 'Задача 1',
        isComplete: false
    },
    {
        id: '2',
        text: 'Задача 2',
        isComplete: true
    },
    {
        id: '3',
        text: 'Задача 3',
        isComplete: false
    }
]