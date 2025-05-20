
import { Database } from '@/supabase/types/database.types';

export type Message = string | Database['public']['Tables']['chat_logs']['Row'];
