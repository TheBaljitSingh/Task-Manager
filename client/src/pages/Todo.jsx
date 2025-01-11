import React, { useState } from 'react';

const ItemList = () => {
  const [items, setItems] = useState([]); // State to store the list of items
  const [inputValue, setInputValue] = useState(''); // State to store the input field value

  // Handler for adding an item to the list
  const handleAddItem = () => {
    if (inputValue.trim() === '') return; // Prevent adding empty items

    setItems([...items, inputValue]); // Add the new item to the list
    setInputValue(''); // Clear the input field
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md mt-12">
      <div className='bg-blue-400 w-full h-12  flex items-center justify-center'>
        <h1 className="text-2xl text-white font-bold">Item List Manager</h1>
      </div>

      {/* Input Field */}
      <div className='mt-8'>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter an item"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-400"
        />

        {/* Add Item Button */}
        <button
          onClick={handleAddItem}
          className="w-full bg-blue-500 text-white py-2 px-4 focus:outline-none rounded hover:border-blue-400"
        >
          Add Item
        </button>
      </div>

      {/* Display the list */}
      <ul className="mt-6 list-disc pl-5">
        {items.map((item, index) => (
          <li key={index} className="text-lg">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
