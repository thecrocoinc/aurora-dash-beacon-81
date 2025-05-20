
import { Database } from '@/supabase/types/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type Meal = Database['public']['Tables']['meals']['Row'] & {
  photo_file_id?: string;
  id: string;
};

export type Digest = {
  kcal: number;
  prot: number;
  fat: number;
  carb: number;
  summary_md?: string;
};

export interface ProfileWithDetails {
  id: string;
  first_name?: string | null;
  username?: string | null;
  avatar: string | null;
  watch_connected: boolean;
  kcalRatio: number;
  currentKcal: number;
  dailyGoal: number;
  prot: number;
  fat: number;
  carb: number;
  goal_type?: string | null;
  created_at?: string | null;
  last_activity?: string | null;
  streak_days?: number;
  subscription_status?: string;
  // Legacy fields for backward compatibility
  name?: string;
  avatar_url?: string;
}

export interface ProfileExtended extends Profile {
  goal_type?: string;
  subscription_status?: string;
  weight?: number;
  height?: number;
  target_weight?: number;
  avatar?: string | null;
  locale?: string;
  // Legacy fields for backward compatibility
  name?: string;
  avatar_url?: string;
}
