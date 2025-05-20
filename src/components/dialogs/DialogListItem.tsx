
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export interface DialogItem {
  id: string;
  name: string;
  avatar: string;
  timestamp: Date;
  lastMessage: string;
  unread: number;
  isActive: boolean;
}

interface DialogListItemProps {
  dialog: DialogItem;
  isSelected: boolean;
  onClick: (dialogId: string) => void;
}

export const DialogListItem = ({ dialog, isSelected, onClick }: DialogListItemProps) => {
  // Format timestamp with relative time
  const formatTime = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    // Using colon format for time
    return isToday ? format(date, "HH:mm") : format(date, "dd.MM");
  };

  const initials = dialog.name
    ? dialog.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <div 
      key={dialog.id} 
      className={`h-[72px] p-4 flex items-center gap-4 hover:bg-muted/30 cursor-pointer transition-colors ${isSelected ? 'bg-muted/50' : ''}`}
      onClick={() => onClick(dialog.id)}
    >
      <div className="relative flex-shrink-0">
        <Avatar>
          <AvatarImage src={dialog.avatar} alt={dialog.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {dialog.isActive && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
        <div className="flex justify-between items-center">
          <div className="font-medium truncate max-w-[180px]">{dialog.name}</div>
          <div className="text-xs text-muted-foreground">
            {formatTime(dialog.timestamp)}
          </div>
        </div>
        <div className="text-sm text-muted-foreground truncate max-w-full">
          {dialog.lastMessage}
        </div>
        {dialog.unread > 0 && (
          <div className="flex justify-end mt-1">
            <Badge className="h-5 min-w-5 flex items-center justify-center bg-primary text-white rounded-full px-1.5 py-0">
              {dialog.unread}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};
