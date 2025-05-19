
import { Message } from "@/utils/dummy";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Check } from "lucide-react";

type ChatBubbleProps = {
  message: Message;
};

const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 items-end",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      {!message.isUser && (
        <div className="w-8 h-8 rounded-full bg-muted/30 flex-shrink-0 mr-2 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&auto=format&fit=crop"
            alt="Bot" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3",
          message.isUser
            ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white"
            : "bg-muted/20 text-foreground border border-white/5"
        )}
      >
        <p className="break-words">{message.text}</p>
        <div className={cn(
          "text-xs mt-1.5 flex items-center justify-end gap-1",
          message.isUser ? "text-white/70" : "text-muted-foreground"
        )}>
          {format(message.timestamp, "HH:mm")}
          {message.isUser && (
            <Check className="h-3 w-3 ml-0.5" />
          )}
        </div>
      </div>
      
      {message.isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 ml-2 overflow-hidden">
          <span className="text-xs font-medium text-primary">ВЫ</span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
