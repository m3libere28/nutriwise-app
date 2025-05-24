export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  plan: string;
  status: string;
  lastVisit: string;
  goals?: string[];
  dietaryRestrictions?: string[];
  metrics?: {
    weight: number;
    height: number;
    bmi: number;
    targetWeight: number;
  };
}

export interface MealTemplate {
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
  meals?: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
}
