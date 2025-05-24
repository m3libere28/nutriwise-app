'use client';

import { useState } from 'react';
import { Check, Plus, X, ShoppingCart, Download } from 'lucide-react';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
}

interface GroceryListProps {
  mealIngredients?: string[];
}

const categories = [
  'Produce',
  'Meat & Seafood',
  'Dairy & Eggs',
  'Grains & Pasta',
  'Pantry',
  'Other'
];

export function GroceryList({ mealIngredients }: GroceryListProps) {
  const [items, setItems] = useState<GroceryItem[]>([
    {
      id: '1',
      name: 'Greek Yogurt',
      category: 'Dairy & Eggs',
      quantity: '32 oz',
      checked: false,
    },
    {
      id: '2',
      name: 'Chicken Breast',
      category: 'Meat & Seafood',
      quantity: '2 lbs',
      checked: false,
    },
    {
      id: '3',
      name: 'Mixed Berries',
      category: 'Produce',
      quantity: '12 oz',
      checked: false,
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    category: categories[0],
    quantity: '',
  });

  const addItem = () => {
    if (newItem.name.trim() === '') return;

    setItems([
      ...items,
      {
        id: Math.random().toString(),
        name: newItem.name,
        category: newItem.category,
        quantity: newItem.quantity,
        checked: false,
      },
    ]);

    setNewItem({
      name: '',
      category: categories[0],
      quantity: '',
    });
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const exportList = () => {
    const text = items
      .sort((a, b) => a.category.localeCompare(b.category))
      .reduce((acc, item) => {
        return acc + `${item.checked ? '✓' : '☐'} ${item.name} (${item.quantity}) - ${item.category}\n`;
      }, 'Grocery List:\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery-list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-emerald-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Grocery List</h2>
          </div>
          <button
            onClick={exportList}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <Download size={20} />
            <span>Export List</span>
          </button>
        </div>

        {/* Add Item Form */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Add item..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            placeholder="Quantity"
            className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={addItem}
            className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="p-6">
        <div className="space-y-6">
          {categories.map((category) => {
            if (!itemsByCategory[category]?.length) return null;

            return (
              <div key={category}>
                <h3 className="font-medium text-gray-900 mb-3">{category}</h3>
                <div className="space-y-2">
                  {itemsByCategory[category].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`w-5 h-5 rounded flex items-center justify-center border ${
                            item.checked
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {item.checked && <Check size={12} />}
                        </button>
                        <span
                          className={`${
                            item.checked ? 'text-gray-400 line-through' : 'text-gray-900'
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.quantity && (
                          <span className="text-sm text-gray-500">({item.quantity})</span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
