
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export type ChatLog = Database['public']['Tables']['chat_logs']['Row'];
