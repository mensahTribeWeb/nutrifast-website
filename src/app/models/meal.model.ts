// frontend/src/app/models/meal.model.ts

export interface Meal {
  tags?: string[];
  image_url?: string;
  description: string;
  portion_g?: number;
  fiber?: number;
  fdc_id?: number;
  recommendation_score?: number;
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
