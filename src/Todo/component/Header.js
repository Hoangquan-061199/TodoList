import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/reducer';
import { enterCode } from '../helpers/keycodes';

function Header() {
  const [text, setText] = useState('');
  const [, dispatch] = useContext(TodosContext);
  const changeText = (event) => {
    setText(event.target.value);
  };
  const addText = (event) => {
    const isEnter = event.keyCode === enterCode;
    const newText = text.trim();
    const isTextPresent = newText.length > 0;
    if (isEnter && isTextPresent) {
      dispatch({ type: 'addJob', payload: newText });
      setText('');
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={text}
        onChange={changeText}
        onKeyUp={addText}
      />
    </header>
  );
}

export default Header;
