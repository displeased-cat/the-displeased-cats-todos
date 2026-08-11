import '../styles/todoBoard.css';
import TodoCard from './TodoCard';

export default function TodoBoard({ todos, onMove, onEdit, onDelete }) {
  return (
    <section className="TodoBoard" aria-label="todo board">
      {todos.map(todo => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onMove={onMove}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
