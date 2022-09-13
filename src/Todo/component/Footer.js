import { useContext } from 'react';
import { TodosContext } from '../contexts/reducer';

function Footer() {
  const [todosState, dispatch] = useContext(TodosContext);
  const activeCount = todosState.todos.filter(
    (todo) => !todo.isCompleted
  ).length;
  const noTodosClass = todosState.todos.length === 0 ? 'hidden' : '';
  const itemsLeftText = `item${activeCount !== 1 ? 's' : ''} left`;

  const getSelectedClass = (filterName) => {
    return todosState.filter === filterName ? 'selected' : '';
  };

  const changFilter = (event, filterName) => {
    event.preventDefault();
    console.log('filter name: ', filterName);
    dispatch({ type: 'changFilter', payload: filterName });
  };

  const clearCompleted = () => {
    dispatch({ type: 'clearCompleted' });
  };
  return (
    <footer className={`footer ${noTodosClass}`}>
      <span className="todo-count">
        <strong>{activeCount}</strong> {itemsLeftText}
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={getSelectedClass('all')}
            onClick={(event) => changFilter(event, 'all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={getSelectedClass('active')}
            onClick={(event) => changFilter(event, 'active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={getSelectedClass('completed')}
            onClick={(event) => changFilter(event, 'completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
