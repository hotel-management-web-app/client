import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

const defaultItems = [
  {
    id: 1,
    name: 'Coding',
  },
  {
    id: 2,
    name: 'Reading',
  },
  {
    id: 3,
    name: 'Listening',
  },
];

const EditableList = () => {
  const [items, setItems] = useState(defaultItems);

  const addNewItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setItems([...items, { id: Date.now(), name: e.target.value }]);
      e.target.value = '';
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      {items.map((item) => (
        <div className="flex items-center gap-5">
          <input
            key={item.id}
            type="text"
            className="border border-px rounded-lg py-2 px-3 w-4/5 focus:outline-none mt-3"
            value={item.name}
            placeholder="Enter a value"
          />
          <button type="button" onClick={() => removeItem(item.id)}>
            <AiFillCloseCircle size="25" className="text-red-600" />
          </button>
        </div>
      ))}
      <input
        type="text"
        className="border border-px rounded-lg py-2 px-3 w-4/5 focus:outline-none mt-3"
        placeholder="Enter a value"
        onKeyDown={addNewItem}
      />
    </div>
  );
};

export default EditableList;
