import './styles.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/slice';

function Input () {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
  
    const handleAddTodo = () => {
      if (text.trim() !== "") {
        dispatch(addTodo({
           name: text,
        }));
        setText("");
      }
    };
    return <div className='text-input'>
        <input
            className='text-input__input'
            type="text"
            value={text}
            onChange={(e) => 
            setText(e.target.value)}
            placeholder="What needs to be done?"
            />
        <button className='text-input__add-button' onClick={handleAddTodo}>
            Add
        </button>
    </div>
}

export default Input;