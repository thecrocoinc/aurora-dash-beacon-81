
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format, parse } from "date-fns";

export interface ClientProfile {
  id: string;
  first_name: string | null;
  username: string | null;
  telegram_id: number;
  created_at: string | null;
}

export interface Digest {
  kcal: number | null;
  prot: number | null;
  fat: number | null;
  carb: number | null;
  for_date: string;
}

export interface Meal {
  id: number;
  dish: string;
  grams: number;
  eaten_at: string;
  kcal: number | null;
  prot: number | null;
  fat: number | null;
  carb: number | null;
}

export interface MealDraft {
  id: number;
  photo_file_id: string | null;
  message_id: number;
  created_at: string | null;
}

export const useClientDetail = (clientId: string | undefined, selectedDate: Date) => {
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
  const startOfDay = `${formattedDate} 00:00:00`;
  const endOfDay = `${formattedDate} 23:59:59`;

  // Fetch client profile
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['client', clientId],
    queryFn: async () => {
      if (!clientId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, username, telegram_id, created_at')
        .eq('id', clientId)
        .single();
      
      if (error) throw error;
      return data as ClientProfile;
    },
    enabled: !!clientId
  });

  // Fetch latest digest
  const { data: digest, isLoading: digestLoading, error: digestError } = useQuery({
    queryKey: ['digest', clientId, formattedDate],
    queryFn: async () => {
      if (!clientId) return null;
      const { data, error } = await supabase
        .from('digests')
        .select('kcal, prot, fat, carb, for_date')
        .eq('chat_id', profile?.telegram_id)
        .eq('for_date', formattedDate)
        .order('for_date', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No digest found for this date
          return null;
        }
        throw error;
      }
      
      return data as Digest;
    },
    enabled: !!profile?.telegram_id
  });

  // Fetch meals for selected date
  const { data: meals, isLoading: mealsLoading, error: mealsError } = useQuery({
    queryKey: ['meals', clientId, formattedDate],
    queryFn: async () => {
      if (!clientId || !profile?.telegram_id) return [];
      const { data, error } = await supabase
        .from('meals')
        .select('id, dish, grams, eaten_at, kcal, prot, fat, carb')
        .eq('chat_id', profile?.telegram_id)
        .gte('eaten_at', startOfDay)
        .lte('eaten_at', endOfDay)
        .order('eaten_at', { ascending: false });
      
      if (error) throw error;
      return data as Meal[];
    },
    enabled: !!profile?.telegram_id
  });

  // Fetch meal drafts (photos) for selected date
  const { data: mealDrafts, isLoading: draftsLoading, error: draftsError } = useQuery({
    queryKey: ['meal_drafts', clientId, formattedDate],
    queryFn: async () => {
      if (!clientId || !profile?.telegram_id) return [];
      const { data, error } = await supabase
        .from('meals_draft')
        .select('id, photo_file_id, message_id, created_at')
        .eq('chat_id', profile?.telegram_id)
        .gte('created_at', startOfDay)
        .lte('created_at', endOfDay)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []).filter(draft => draft.photo_file_id) as MealDraft[];
    },
    enabled: !!profile?.telegram_id
  });

  const isLoading = profileLoading || digestLoading || mealsLoading || draftsLoading;
  const error = profileError || digestError || mealsError || draftsError;

  return { 
    profile, 
    digest, 
    meals, 
    mealDrafts, 
    isLoading, 
    error 
  };
};
