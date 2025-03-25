import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/types";

const initialState: {todos: Todo[]} = {
    todos: [],
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            let lastId = 0;
            if (state.todos.length > 0) {
                lastId = state.todos[state.todos.length - 1].id;
            }
            state.todos.push({id: lastId + 1, name: action.payload.name, completed: false})
        },
        changeCompleted: (state, action) => {
            const index = state.todos.findIndex((item) => item.id === action.payload.id);
            state.todos[index].completed = !state.todos[index].completed;
        },
        removeTodo: (state, action) => {
            const index = state.todos.findIndex((item) => item.id === action.payload.id);
            if(index !== -1) {
                state.todos = [...state.todos.slice(0, index), ...state.todos.slice(index + 1)];
            }
        }
    }
});

export const {addTodo, removeTodo, changeCompleted} = todoSlice.actions;
export default todoSlice.reducer;