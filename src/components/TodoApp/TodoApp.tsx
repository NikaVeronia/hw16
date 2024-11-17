import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { addTodo, toggleTodo, deleteTodo, setFilter } from '../../store/todoSlice';
import './style.modules.css';
const TodoApp: React.FC = () => {
    const [task, setTask] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const filter = useSelector((state: RootState) => state.todos.filter);

    const handleAddTodo = () => {
        if (task.trim()) {
            dispatch(addTodo(task));
            setTask('');
        }
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Добавить новую задачу"
            />
            <button onClick={handleAddTodo}>Добавить</button>
            
            <div>
                <button onClick={() => dispatch(setFilter('all'))}>Все</button>
                <button onClick={() => dispatch(setFilter('completed'))}>Выполнено</button>
                <button onClick={() => dispatch(setFilter('incomplete'))}>Не выполнено</button>
            </div>

            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.id} className={`list`}>
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch(toggleTodo(todo.id))}>
                            {todo.completed ? 'Отметить как не выполнено' : 'Отметить как выполнено'}
                        </button>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
