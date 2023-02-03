import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useFormContext } from 'react-hook-form';
import { nanoid } from 'nanoid';

interface Item {
  id: string;
  name: string;
}

interface EditableListProps {
  name: string;
  itemsProp?: string[];
}

const EditableList: React.FC<EditableListProps> = ({
  name,
  itemsProp = [],
}) => {
  const [items, setItems] = useState<Item[]>(
    itemsProp.map((item) => ({ id: nanoid(), name: item }))
  );
  const { setValue } = useFormContext();

  useEffect(() => {
    const filteredItems = items.map((item) => item.name);
    setValue(name, filteredItems);
  }, [items, name, setValue]);

  const addNewItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value !== '') {
      e.preventDefault();
      setItems([...items, { id: nanoid(), name: target.value }]);
      target.value = '';
    }
  };

  const updateItem = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }

      return item;
    });

    setItems(updatedItems);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-5">
          <input
            key={item.id}
            type="text"
            className="border border-[#ccc] border-px rounded py-2 px-3 w-4/5 focus:outline-none mt-3"
            value={item.name}
            onChange={(e) => updateItem(e, item.id)}
            placeholder="Enter a value"
          />
          <button type="button" onClick={() => removeItem(item.id)}>
            <AiFillCloseCircle size="25" className="text-red-600" />
          </button>
        </div>
      ))}
      <input
        type="text"
        className="border border-[#ccc] border-px rounded py-2 px-3 w-4/5 focus:outline-none mt-3"
        placeholder="Enter a value"
        onKeyDown={addNewItem}
      />
    </div>
  );
};

export default EditableList;
