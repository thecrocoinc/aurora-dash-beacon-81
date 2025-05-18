
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Message } from "@/utils/dummy";
import { format } from "date-fns";

interface DatabaseMessage {
  id: number;
  profile_id: string;
  role: string;
  content: string;
  created_at: string;
}

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

    // Initial fetch of messages
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("messages")
          .select("*")
          .eq("profile_id", profileId)
          .order("created_at", { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        // Convert database messages to app format
        const formattedMessages = (data || []).map(
          (msg: DatabaseMessage): Message => ({
            id: msg.id.toString(),
            text: msg.content,
            timestamp: new Date(msg.created_at),
            isUser: msg.role === "user"
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
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `profile_id=eq.${profileId}`,
        },
        (payload) => {
          const newMessage = payload.new as DatabaseMessage;
          
          // Add the new message to state
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: newMessage.id.toString(),
              text: newMessage.content,
              timestamp: new Date(newMessage.created_at),
              isUser: newMessage.role === "user"
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

    try {
      const { error } = await supabase.from("messages").insert({
        profile_id: profileId,
        role: "user",
        content: content.trim()
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
