import { createContext, useReducer } from 'react';

const initalState = {
  todos: [],
  filter: 'all',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addJob':
      const newJob = {
        id: Math.random().toString(),
        text: action.payload,
        isCompleted: false,
      };
      return {
        ...state,
        todos: [...state.todos, newJob],
      };
    case 'toggleAll': {
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        isCompleted: action.payload,
      }));
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'changFilter': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case 'toggleTodo': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'editTodo': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'destroy': {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case 'clearCompleted': {
      const clearCompleted = state.todos.filter(state.todos.isCompleted);
      return clearCompleted;
    }

    default:
      return state;
  }
};

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const value = useReducer(reducer, initalState);
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
