
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Message } from "@/types/chat";
import { Database } from '@/supabase/types/database.types';

type ChatLog = Database['public']['Tables']['chat_logs']['Row'];

/**
 * Custom hook to fetch and subscribe to messages for a specific profile
 */
export const useChat = (profileId: string | undefined) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!profileId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    // Convert profileId to number
    const chatId = Number(profileId);

    // Initial fetch of messages
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("chat_logs")
          .select("*")
          .eq("chat_id", chatId)
          .order("created_at", { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        // Convert database messages to app format
        const formattedMessages = (data || []).map(
          (msg: ChatLog): Message => ({
            id: msg.id.toString(),
            content: msg.content,
            created_at: msg.created_at,
            role: msg.role as 'user' | 'assistant'
          })
        );

        setMessages(formattedMessages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch messages"));
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Subscribe to new messages for this profile
    const channel = supabase
      .channel(`msgs_${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_logs",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatLog;
          
          // Add the new message to state
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: newMessage.id.toString(),
              content: newMessage.content,
              created_at: newMessage.created_at,
              role: newMessage.role as 'user' | 'assistant'
            }
          ]);
        }
      )
      .subscribe();

    // Cleanup: unsubscribe from the channel when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [profileId]);

  // Function to send a new message
  const sendMessage = async (content: string): Promise<void> => {
    if (!profileId || !content.trim()) return;
    
    const chatId = Number(profileId);

    try {
      const { error } = await supabase.from("chat_logs").insert({
        chat_id: chatId,
        content: content.trim(),
        role: "user",
        session_id: `session_${chatId}`
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  };

  return { messages, loading, error, sendMessage };
};
