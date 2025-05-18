
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useChat } from "@/hooks/useChat";

type ChatInterfaceProps = {
  loading?: boolean;
  profileId?: string;
};

const ChatInterface = ({ loading: externalLoading = false, profileId }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const { messages, loading: messagesLoading, sendMessage } = useChat(profileId);
  
  const isLoading = externalLoading || messagesLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && profileId) {
      try {
        await sendMessage(message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex w-full mb-4 ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
            <Skeleton className={`h-20 ${i % 2 === 0 ? "w-3/4 ml-auto" : "w-2/3"}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-12">
            No messages yet. Start the conversation!
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="resize-none"
          disabled={!profileId}
        />
        <Button type="submit" disabled={!profileId}>Send</Button>
      </form>
    </div>
  );
};

export default ChatInterface;
