import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../contexts/reducer';
import { enterCode, escCode } from '../helpers/keycodes';

function TodoItem({ todo, isEditing, setEditingId }) {
  const inputRef = useRef(null);
  const [, dispatch] = useContext(TodosContext);
  const [editText, setEditText] = useState(todo.text);
  const editingClass = isEditing ? 'editing' : '';
  const completedClass = todo.isCompleted ? 'completed' : '';
  const toggleTodo = () => {
    dispatch({ type: 'toggleTodo', payload: todo.id });
  };
  const setTodoInEditingMode = () => {
    setEditingId(todo.id);
  };

  const changeEdit = (event) => {
    setEditText(event.target.value);
  };
  const cancelEdit = () => {
    setEditText(todo.text);
    setEditingId(null);
  };
  const editingUpdate = (event) => {
    if (event.keyCode === enterCode) {
      dispatch({
        type: 'editTodo',
        payload: { id: todo.id, text: event.target.value },
      });
      setEditingId(null);
    }
    if (event.keyCode === escCode) {
      cancelEdit();
    }
  };
  const destroy = () => {
    dispatch({ type: 'destroy', payload: todo.id });
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  });
  return (
    <li className={`${editingClass} ${completedClass}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={toggleTodo}
          checked={todo.isCompleted}
        />
        <label onDoubleClick={setTodoInEditingMode}>{todo.text}</label>
        <button className="destroy" onClick={destroy}></button>
      </div>
      {isEditing && (
        <input
          ref={inputRef}
          className="edit"
          value={editText}
          onChange={changeEdit}
          onKeyUp={editingUpdate}
          onBlur={cancelEdit}
        />
      )}
    </li>
  );
}

export default TodoItem;
