import "./styles.css";
import TodoItem from "../todo-item/todo-item";
import { Todo } from "../../types/types";

function TodoList({todos}: {todos: Todo[]}) {
    return <>
        <ul className="todo-list">
            {todos.length > 0 ? todos.map((item) => 
                <li key={item.id}>
                    <TodoItem item={item}/>
                </li>
            ) : null}
        </ul>
    </>
}

export default TodoList;