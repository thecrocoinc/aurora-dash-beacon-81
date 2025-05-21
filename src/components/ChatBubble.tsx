
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatBubble = ({ message, isUser, timestamp }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <p>{message}</p>
        <p className={cn(
          "text-xs mt-1", 
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {format(timestamp, "h:mm a")}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
