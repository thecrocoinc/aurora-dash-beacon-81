
import { Database } from '@/supabase/types/database.types';

export type ChatLog = Database['public']['Tables']['chat_logs']['Row'];
export type Message = string | ChatLog;
