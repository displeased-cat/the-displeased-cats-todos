import { useEffect, useState } from 'react';

export default function TodoForm({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [details, setDetails] = useState(todo.details);

  useEffect(() => {
    setTitle(todo.title);
    setDetails(todo.details);
  }, [todo]);

  function handleSubmit(event) {
    event.preventDefault();
    onSave({
      ...todo,
      title: title.trim() || 'Untitled todo',
      details: details.trim(),
    });
  }

  return (
    <div className="TodoFormOverlay" role="dialog" aria-modal="true">
      <form className="TodoForm" onSubmit={handleSubmit}>
        <div className="TodoForm-header">
          <h2>{todo.id.startsWith('new-') ? 'Create new todo' : 'Edit todo'}</h2>
        </div>

        <label>
          Headline
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </label>

        <label>
          Details
          <textarea
            value={details}
            onChange={event => setDetails(event.target.value)}
            placeholder="More information about the task"
            rows={5}
          />
        </label>

        <div className="TodoForm-actions">
          <button type="button" className="secondaryButton" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primaryButton">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
