
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/supabase/types/database.types';

// Since we have a Supabase integration, we can use the client from there
import { supabase as existingClient } from "@/integrations/supabase/client";

// We'll just re-export the existing client
export const supabase = existingClient;
