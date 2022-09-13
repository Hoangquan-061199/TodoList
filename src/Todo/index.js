import './css/style.css';
import './css/base.css';
import Header from './component/Header';
import TodoList from './component/TodoList';
import Footer from './component/Footer';
import { TodosProvider } from './contexts/reducer';

function Todo() {
  return (
    <TodosProvider>
      <section className="todoapp">
        <Header />
        <TodoList />
        <Footer />
      </section>
    </TodosProvider>
  );
}

export default Todo;
