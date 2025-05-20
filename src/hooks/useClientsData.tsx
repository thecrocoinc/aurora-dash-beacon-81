
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from '@/supabase/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const useClientsData = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Fetch profiles from Supabase
  const { data: clients, isLoading, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      try {
        const { data: profilesData, error } = await supabase
          .from('profiles')
          .select('id, first_name, username, telegram_id, created_at')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching profiles:", error);
          throw error;
        }
        
        return profilesData as Profile[];
      } catch (err) {
        console.error("Error in query function:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes before data is considered stale
    refetchOnWindowFocus: false,
    retry: 1
  });

  // Function to force refresh profiles data (manually invalidate cache)
  const refreshClients = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });
  };

  return { clients, isLoading, isError, error, refreshClients };
};
