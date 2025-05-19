
import { Message } from "@/utils/dummy";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type ChatBubbleProps = {
  message: Message;
};

const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          message.isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <p>{message.text}</p>
        <p className={cn(
          "text-xs mt-1", 
          message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {format(message.timestamp, "h:mm a")}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
