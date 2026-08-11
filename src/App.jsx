import { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import TodoBoard from './components/TodoBoard';
import TodoForm from './components/TodoForm';
import { createEmptyTodo, randomPinColor, randomRotation } from './utils/todoUtils';

const storageKey = 'displeased-cats-todos';

const initialTodos = [
  {
    id: 'todo-1',
    title: 'Feed the displeased cat',
    details: 'Offer tuna and a saucer of cream before it becomes more irritated.',
    x: 100,
    y: 140,
    rotation: -2,
    pinColor: '#d23f4d',
  },
];

function App() {
  const [todos, setTodos] = useState(() => {
    if (typeof window === 'undefined') return initialTodos;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) return initialTodos;
      return JSON.parse(stored).map(todo => ({
        ...todo,
        rotation:
          typeof todo.rotation === 'number'
            ? Math.max(-5, Math.min(5, todo.rotation))
            : randomRotation(),
        pinColor: typeof todo.pinColor === 'string' ? todo.pinColor : randomPinColor(),
      }));
    } catch {
      return initialTodos;
    }
  });
  const [editorTodo, setEditorTodo] = useState(null);
  const nextTodoId = useMemo(
    () => () => `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    []
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(todos));
    } catch {
      // Ignore storage errors.
    }
  }, [todos]);

  function handleAddTodo() {
    setEditorTodo(createEmptyTodo());
  }

  function handleEditTodo(id) {
    const todo = todos.find(item => item.id === id);
    if (todo) {
      setEditorTodo(todo);
    }
  }

  function handleDeleteTodo(id) {
    setTodos(current => current.filter(todo => todo.id !== id));
  }

  function handleMoveTodo(id, x, y) {
    setTodos(current => current.map(todo => (todo.id === id ? { ...todo, x, y } : todo)));
  }

  function handleSaveTodo(updatedTodo) {
    setTodos(current => {
      if (current.some(todo => todo.id === updatedTodo.id)) {
        return current.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
      }
      return [...current, { ...updatedTodo, id: nextTodoId() }];
    });
    setEditorTodo(null);
  }

  function handleCancelEdit() {
    setEditorTodo(null);
  }

  return (
    <div className="AppShell">
      <aside className="AppSidebar">
        <div className="AppTitle">
          <span className="AppLabel">the displeased cats</span>
          <h1>todos</h1>
          <span>by Luca</span>
        </div>
        <button className="addButton" type="button" onClick={handleAddTodo}>
          <span className="buttonIcon">＋</span>
          Add todo
        </button>
        <p className="AppDescription">Drag each note freely across the board. Edit or remove any todo as needed.</p>
      </aside>

      <main className="AppMain">
        <TodoBoard todos={todos} onMove={handleMoveTodo} onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
      </main>

      {editorTodo && <TodoForm todo={editorTodo} onSave={handleSaveTodo} onCancel={handleCancelEdit} />}
    </div>
  );
}

export default App;
