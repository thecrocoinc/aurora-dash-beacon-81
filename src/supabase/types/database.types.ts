
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_logs: {
        Row: {
          chat_id: number
          content: string
          created_at: string
          first_name: string | null
          id: number
          metadata: Json | null
          role: string | null
          session_id: string
          username: string | null
        }
        Insert: {
          chat_id: number
          content: string
          created_at?: string
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id: string
          username?: string | null
        }
        Update: {
          chat_id?: number
          content?: string
          created_at?: string
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id?: string
          username?: string | null
        }
        Relationships: []
      }
      digests: {
        Row: {
          carb: number | null
          chat_id: number
          created_at: string | null
          fat: number | null
          for_date: string
          kcal: number | null
          meals_json: Json | null
          msg_id: number | null
          prot: number | null
          summary_md: string | null
        }
        Insert: {
          carb?: number | null
          chat_id: number
          created_at?: string | null
          fat?: number | null
          for_date: string
          kcal?: number | null
          meals_json?: Json | null
          msg_id?: number | null
          prot?: number | null
          summary_md?: string | null
        }
        Update: {
          carb?: number | null
          chat_id?: number
          created_at?: string | null
          fat?: number | null
          for_date?: string
          kcal?: number | null
          meals_json?: Json | null
          msg_id?: number | null
          prot?: number | null
          summary_md?: string | null
        }
        Relationships: []
      }
      meals: {
        Row: {
          carb: number | null
          chat_id: number
          deleted: boolean | null
          dish: string
          eaten_at: string
          fat: number | null
          grams: number
          id: number
          kcal: number | null
          prot: number | null
        }
        Insert: {
          carb?: number | null
          chat_id: number
          deleted?: boolean | null
          dish: string
          eaten_at?: string
          fat?: number | null
          grams: number
          id?: number
          kcal?: number | null
          prot?: number | null
        }
        Update: {
          carb?: number | null
          chat_id?: number
          deleted?: boolean | null
          dish?: string
          eaten_at?: string
          fat?: number | null
          grams?: number
          id?: number
          kcal?: number | null
          prot?: number | null
        }
        Relationships: []
      }
      meals_draft: {
        Row: {
          candidates: Json | null
          chat_id: number
          chosen_name: string | null
          created_at: string | null
          grams_pred: number | null
          id: number
          message_id: number
          photo_file_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          candidates?: Json | null
          chat_id: number
          chosen_name?: string | null
          created_at?: string | null
          grams_pred?: number | null
          id?: number
          message_id: number
          photo_file_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          candidates?: Json | null
          chat_id?: number
          chosen_name?: string | null
          created_at?: string | null
          grams_pred?: number | null
          id?: number
          message_id?: number
          photo_file_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          locale: string | null
          telegram_id: number
          username: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          locale?: string | null
          telegram_id: number
          username?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          locale?: string | null
          telegram_id?: number
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      meals_clean: {
        Row: {
          carb: number | null
          chat_id: number | null
          deleted: boolean | null
          dish: string | null
          eaten_at: string | null
          fat: number | null
          grams: number | null
          id: number | null
          kcal: number | null
          prot: number | null
        }
      }
    }
    Functions: {
      get_current_summary: {
        Args: { _chat_id: number }
        Returns: Json
      }
      upsert_digest: {
        Args: {
          _chat_id: number
          _for_date: string
          _kcal: number
          _prot: number
          _fat: number
          _carb: number
          _meals_json: Json
          _summary_md: string
          _msg_id: number
        }
        Returns: undefined
      }
    }
    Enums: {}
    CompositeTypes: {}
  }
}
