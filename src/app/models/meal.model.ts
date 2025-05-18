// frontend/src/app/models/meal.model.ts

export interface Meal {
  /** your database will usually return an id */
  id?: number;

  /** the name of the meal */
  name: string;

  /** total calories */
  calories: number;

  /** grams of protein (optional) */
  protein?: number;

  /** grams of carbs (optional) */
  carbs?: number;

  /** grams of fat (optional) */
  fat?: number;
}
