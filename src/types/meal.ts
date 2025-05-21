
export interface Meal {
  id: string;
  dish: string;
  grams: number;
  eaten_at: string;
  photo_id?: string;
  kcal?: number;
  prot?: number;
  fat?: number;
  carb?: number;
}
