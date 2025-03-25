import "./styles.css"
import { useDispatch } from 'react-redux';
import { removeTodo, changeCompleted } from '../../store/slice';
import { Todo } from "../../types/types";

function TodoItem ({item}: {item: Todo}) {
    const dispatch = useDispatch();
    
    const handleRemoveTodo = (id: number) => {
        dispatch(removeTodo({
            id: id,
        }));
    }

    const handleCompleteChange = (id: number) => {
        dispatch(changeCompleted({
            id: id,
        }));
    }

    return <div className="todo-item">
        <label className="todo-item__checkbox">
              <input type="checkbox" id="status" name="status" onChange={() => handleCompleteChange(item.id)} checked={item.completed}/>
              {item.name}
        </label>
        <button className="todo-item__remove-button" onClick={() => handleRemoveTodo(item.id)}>
            Remove
        </button>
    </div>
}

export default TodoItem;