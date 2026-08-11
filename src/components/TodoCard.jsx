import { useEffect, useRef, useState } from 'react';
import '../styles/todoCard.css';

export default function TodoCard({ todo, onMove, onEdit, onDelete }) {
  const [position, setPosition] = useState({ x: todo.x, y: todo.y });
  const [dragging, setDragging] = useState(false);
  const pointerData = useRef({ startX: 0, startY: 0, startLeft: 0, startTop: 0 });

  useEffect(() => {
    setPosition({ x: todo.x, y: todo.y });
  }, [todo.x, todo.y]);

  function handlePointerDown(event) {
    if (event.button !== 0) return;
    if (event.target.closest('button')) return;
    pointerData.current = {
      startX: event.clientX,
      startY: event.clientY,
      startLeft: position.x,
      startTop: position.y,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!dragging) return;
    const deltaX = event.clientX - pointerData.current.startX;
    const deltaY = event.clientY - pointerData.current.startY;
    setPosition({
      x: pointerData.current.startLeft + deltaX,
      y: pointerData.current.startTop + deltaY,
    });
  }

  function handlePointerUp() {
    if (!dragging) return;
    setDragging(false);
    onMove(todo.id, position.x, position.y);
  }

  const rotation = todo.rotation ?? 0;
  const transformValue = dragging
    ? `translateY(-4px) rotate(${rotation}deg)`
    : `rotate(${rotation}deg)`;

  return (
    <article
      className={`TodoCard ${dragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: transformValue,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="button"
      tabIndex={0}
    >
      <span
        className="TodoCard-pin"
        style={{
          background: `radial-gradient(circle at 35% 35%, #fff, ${todo.pinColor ?? '#d23f4d'} 70%)`,
        }}
        aria-hidden="true"
      />
      <header className="TodoCard-headline">
        <h2>{todo.title || 'Untitled todo'}</h2>
      </header>

      <p className="TodoCard-text">{todo.details || 'No additional details yet.'}</p>

      <div className="TodoCard-actions">
        <button
          type="button"
          className="iconButton"
          onClick={event => {
            event.stopPropagation();
            onEdit(todo.id);
          }}
          aria-label="Edit todo"
        >
          ✎
        </button>
        <button
          type="button"
          className="iconButton danger"
          onClick={event => {
            event.stopPropagation();
            onDelete(todo.id);
          }}
          aria-label="Delete todo"
        >
          🗑️
        </button>
      </div>
    </article>
  );
}
