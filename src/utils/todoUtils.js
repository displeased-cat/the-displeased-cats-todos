const pinPalette = ['#d23f4d', '#3f5bd2', '#d2813f', '#4e9c6c', '#b63fc4'];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomRotation() {
  return Math.floor(Math.random() * 11) - 5;
}

export function randomPinColor() {
  return randomFrom(pinPalette);
}

export function createEmptyTodo() {
  return {
    id: `new-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: '',
    details: '',
    x: 120,
    y: 120,
    rotation: randomRotation(),
    pinColor: randomPinColor(),
  };
}
