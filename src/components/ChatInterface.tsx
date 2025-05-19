
import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useChat } from "@/hooks/useChat";
import { Send, Smile, Paperclip, Mic } from "lucide-react";

type ChatInterfaceProps = {
  loading?: boolean;
  profileId?: string;
};

const ChatInterface = ({ loading: externalLoading = false, profileId }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const { messages, loading: messagesLoading, sendMessage } = useChat(profileId);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex w-full mb-4 ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
            <Skeleton className={`h-20 rounded-2xl ${i % 2 === 0 ? "w-3/4 ml-auto" : "w-2/3"}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10"
      >
        {messages.length > 0 ? (
          messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Нет сообщений. Начните беседу!
            </p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-background flex gap-2 items-end">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            className="resize-none min-h-[60px] pr-12 pt-3 bg-muted/10 border-white/10 focus-visible:ring-1 focus-visible:ring-primary/40"
            disabled={!profileId}
          />
          <div className="absolute right-2 bottom-2 flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            >
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={!profileId || !message.trim()} 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-[60px] px-4"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
