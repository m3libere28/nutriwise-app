'use client';

import { useState } from 'react';
import { Plus, Calendar, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { MealTemplate } from '../types';
import { MealForm } from './MealForm';

interface MealPlannerProps {
  template?: MealTemplate | null;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface Meal {
  id: string;
  name: string;
  type: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
}

interface DayPlan {
  date: string;
  meals: Meal[];
}

const createMeal = (name: string, type: MealType): Meal => ({
  id: Math.random().toString(),
  name,
  type,
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  ingredients: [],
  instructions: ''
});

const mockMeals = [
  createMeal('Greek Yogurt Parfait', 'breakfast'),
  createMeal('Grilled Chicken Salad', 'lunch'),
  createMeal('Salmon with Quinoa', 'dinner')
] as const;

export function MealPlanner({ template }: MealPlannerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState<{ [key: string]: Meal[] }>(() => {
    if (template?.meals) {
      const initialMeals: { [key: string]: Meal[] } = {};
      const weekDates = getWeekDates(new Date());
      
      weekDates.forEach((date) => {
        const dateStr = date.toISOString().split('T')[0];
        const typedMeals: Meal[] = [
          ...(template.meals.breakfast?.map(name => createMeal(name, 'breakfast')) || []),
          ...(template.meals.lunch?.map(name => createMeal(name, 'lunch')) || []),
          ...(template.meals.dinner?.map(name => createMeal(name, 'dinner')) || []),
          ...(template.meals.snacks?.map(name => createMeal(name, 'snack')) || [])
        ];
        initialMeals[dateStr] = typedMeals;
      });
      
      return initialMeals;
    }
    
    return {};
  });
  const [showMealForm, setShowMealForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  };

  const weekDates = getWeekDates(selectedDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Meal Planner</h2>
          <button
            onClick={() => setShowMealForm(true)}
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus size={20} />
            <span>Add Meal</span>
          </button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={20} className="text-gray-500" />
          </button>
          <div className="flex gap-1">
            {weekDates.map((date, index) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] ${
                  date.toDateString() === selectedDate.toDateString()
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-xs font-medium">{daysOfWeek[index]}</span>
                <span className={`text-sm ${isToday(date) ? 'font-bold' : ''}`}>
                  {formatDate(date)}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Meal Grid */}
      <div className="p-6">
        <div className="grid grid-cols-[100px_1fr] gap-4">
          {/* Time slots */}
          <div className="space-y-4">
            {mealTypes.map((type) => (
              <div key={type} className="h-[120px] flex items-center">
                <span className="text-sm font-medium text-gray-500 capitalize">
                  {type}
                </span>
              </div>
            ))}
          </div>

          {/* Meals */}
          <div className="space-y-4">
            {mealTypes.map((type) => (
              <div
                key={type}
                className="bg-gray-50 rounded-lg h-[120px] p-3 border-2 border-dashed border-gray-200 hover:border-emerald-200 transition-colors"
              >
                {mockMeals.find((meal) => meal.type === type) ? (
                  <div className="h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {mockMeals.find((meal) => meal.type === type)?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {mockMeals.find((meal) => meal.type === type)?.calories} cal
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const meal = mockMeals.find((m) => m.type === type);
                          if (meal) {
                            setEditingMeal(meal);
                            setShowMealForm(true);
                          }
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>
                    </div>
                    <div className="mt-2 flex gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-500">P:</span>
                        <span className="text-xs text-gray-900">
                          {mockMeals.find((meal) => meal.type === type)?.protein}g
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-500">C:</span>
                        <span className="text-xs text-gray-900">
                          {mockMeals.find((meal) => meal.type === type)?.carbs}g
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-500">F:</span>
                        <span className="text-xs text-gray-900">
                          {mockMeals.find((meal) => meal.type === type)?.fat}g
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingMeal(null);
                      setShowMealForm(true);
                    }}
                    className="w-full h-full flex items-center justify-center text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Plus size={24} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meal Form Modal */}
      {showMealForm && (
        <MealForm
          onClose={() => {
            setShowMealForm(false);
            setEditingMeal(null);
          }}
          onSubmit={(data) => {
            console.log('New meal data:', data);
            setShowMealForm(false);
            setEditingMeal(null);
          }}
          initialData={editingMeal || undefined}
        />
      )}
    </div>
  );
}
