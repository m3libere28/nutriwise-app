'use client';

import { useState } from 'react';
import { Plus, ChevronRight, Sparkles } from 'lucide-react';

interface MealTemplate {
  id: string;
  name: string;
  description: string;
  targetGoals: string[];
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
}

const mockTemplates: MealTemplate[] = [
  {
    id: '1',
    name: 'Weight Loss Plan',
    description: 'A balanced, calorie-controlled plan focused on lean proteins and vegetables.',
    targetGoals: ['Weight Loss', 'Fat Reduction', 'Muscle Maintenance'],
    dailyCalories: 1800,
    macros: {
      protein: 130,
      carbs: 180,
      fat: 60,
    },
    meals: {
      breakfast: ['Greek Yogurt Parfait', 'Egg White Omelette', 'Protein Smoothie'],
      lunch: ['Grilled Chicken Salad', 'Turkey Wrap', 'Quinoa Bowl'],
      dinner: ['Baked Salmon', 'Lean Steak', 'Tofu Stir-Fry'],
      snacks: ['Apple with Almond Butter', 'Protein Bar', 'Carrot Sticks with Hummus'],
    },
  },
  {
    id: '2',
    name: 'Muscle Gain Plan',
    description: 'High-protein meal plan designed for muscle growth and recovery.',
    targetGoals: ['Muscle Gain', 'Strength', 'Recovery'],
    dailyCalories: 3000,
    macros: {
      protein: 200,
      carbs: 350,
      fat: 85,
    },
    meals: {
      breakfast: ['Protein Oatmeal', 'Egg and Toast', 'Mass Gainer Smoothie'],
      lunch: ['Chicken Rice Bowl', 'Tuna Pasta', 'Turkey Sandwich'],
      dinner: ['Salmon with Sweet Potato', 'Beef and Rice', 'Chicken Pasta'],
      snacks: ['Protein Shake', 'Trail Mix', 'Greek Yogurt with Berries'],
    },
  },
  {
    id: '3',
    name: 'Vegetarian Plan',
    description: 'Plant-based nutrition plan rich in proteins and essential nutrients.',
    targetGoals: ['Health', 'Sustainability', 'Weight Management'],
    dailyCalories: 2200,
    macros: {
      protein: 100,
      carbs: 280,
      fat: 70,
    },
    meals: {
      breakfast: ['Tofu Scramble', 'Overnight Oats', 'Green Smoothie'],
      lunch: ['Buddha Bowl', 'Lentil Soup', 'Chickpea Salad'],
      dinner: ['Black Bean Burger', 'Tempeh Stir-Fry', 'Quinoa Curry'],
      snacks: ['Mixed Nuts', 'Edamame', 'Fruit and Nut Bar'],
    },
  },
];

interface MealPlanTemplatesProps {
  onSelectTemplate: (template: MealTemplate) => void;
  clientGoals?: string[];
}

export function MealPlanTemplates({ onSelectTemplate, clientGoals }: MealPlanTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const getTemplateMatch = (template: MealTemplate) => {
    if (!clientGoals) return 0;
    return template.targetGoals.filter(goal => 
      clientGoals.some(clientGoal => 
        clientGoal.toLowerCase().includes(goal.toLowerCase())
      )
    ).length;
  };

  const sortedTemplates = [...mockTemplates].sort((a, b) => {
    const aMatch = getTemplateMatch(a);
    const bMatch = getTemplateMatch(b);
    return bMatch - aMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Meal Plan Templates</h2>
        <button className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
          <Plus size={16} />
          <span>Create Template</span>
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedTemplates.map((template) => {
          const matchScore = getTemplateMatch(template);
          const isRecommended = matchScore > 0 && clientGoals;

          return (
            <div
              key={template.id}
              className={`border rounded-xl p-4 hover:border-emerald-200 transition-colors ${
                selectedTemplate === template.id ? 'border-emerald-500' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
                {isRecommended && (
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <Sparkles size={12} />
                    <span>Recommended</span>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Daily Calories</span>
                  <span className="font-medium text-gray-900">{template.dailyCalories} kcal</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Protein</span>
                  <span className="font-medium text-gray-900">{template.macros.protein}g</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Carbs</span>
                  <span className="font-medium text-gray-900">{template.macros.carbs}g</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Fat</span>
                  <span className="font-medium text-gray-900">{template.macros.fat}g</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {template.targetGoals.map((goal) => (
                    <span
                      key={goal}
                      className="inline-block text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
