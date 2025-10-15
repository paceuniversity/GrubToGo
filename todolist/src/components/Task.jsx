


import { useState } from 'react';

export default function Task({ addItem }) {
  const [text, setText] = useState('');

  function handleClick() {
    if (text.trim()) {
      addItem(text);
      setText('');
    }
  }

  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What to do?"
      />
      <button onClick={handleClick}>+</button>
    </div>
  );
}


