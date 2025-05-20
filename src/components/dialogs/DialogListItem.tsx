
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/utils/dateUtils";

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
  const initials = dialog.name
    ? dialog.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <div 
      key={dialog.id} 
      className={`group h-[72px] p-4 flex items-center gap-4 hover:bg-muted/40 cursor-pointer transition-colors duration-200 ${
        isSelected ? 'bg-muted/60 border-l-2 border-primary' : 'border-l-2 border-transparent'
      }`}
      onClick={() => onClick(dialog.id)}
      role="button"
      aria-selected={isSelected}
      tabIndex={0}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10 ring-2 ring-background">
          <AvatarImage src={dialog.avatar} alt={dialog.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {dialog.isActive && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background animate-pulse"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center space-y-0.5">
        <div className="flex justify-between items-center">
          <div className="font-medium truncate max-w-[180px] text-sm">
            {dialog.name}
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {formatTime(dialog.timestamp)}
          </div>
        </div>
        <div className="text-sm text-muted-foreground truncate max-w-full leading-5 opacity-90">
          {dialog.lastMessage}
        </div>
      </div>
      
      {dialog.unread > 0 && (
        <Badge 
          className="h-5 min-w-5 flex items-center justify-center bg-primary text-white rounded-full px-1.5 py-0 ml-1 transition-all duration-200 group-hover:scale-110"
          aria-label={`${dialog.unread} непрочитанных сообщений`}
        >
          {dialog.unread}
        </Badge>
      )}
    </div>
  );
};
