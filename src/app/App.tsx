import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Todo } from '../types/types';
import Input from '../components/input/input';
import TodoList from '../components/todo-list/todo-list';
import Radio from '../components/radio/radio';
import './App.css';

function App() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [isChecked, setIsChecked] = useState({all: true, done: false, active: false});
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const handleAllFilter = () => {
    setFilteredTodos(todos);
    setIsChecked({all: true, done: false, active: false});
  };

  const handleActiveFilter = () => {
    const filtered = todos.filter((item) => !item.completed);
    setFilteredTodos(filtered);
    setIsChecked({all: false, done: false, active: true});
  };

  const handleDoneFilter = () => {
    const filtered = todos.filter((item) => item.completed);
    setFilteredTodos(filtered);
    setIsChecked({all: false, done: true, active: false});
  };

  useEffect(() => {
    if(isChecked.all) {
      handleAllFilter();
    }
    if(isChecked.active) {
      handleActiveFilter();
    }
    if(isChecked.done) {
      handleDoneFilter();
    }
    
  }, [todos])

  return (
    <div className="App">
      <main>
        <h1>todos</h1>
        <Input />
        <TodoList todos={filteredTodos} />
        <div className="filter">
          <Radio onChange={handleAllFilter} id='all' text='All' isChecked={isChecked.all} />
          <Radio onChange={handleActiveFilter} id='active' text='Active' isChecked={isChecked.active} />
          <Radio onChange={handleDoneFilter} id='done' text='Done' isChecked={isChecked.done} />
        </div>
      </main>
    </div>
  );
}

export default App;
