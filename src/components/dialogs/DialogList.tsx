
import { CardContent } from "@/components/ui/card";
import { DialogItem, DialogListItem } from "./DialogListItem";
import DialogEmptyState from "./DialogEmptyState";
import { LayoutGrid, MessageSquareX } from "lucide-react";

interface DialogListProps {
  dialogs: DialogItem[];
  filteredDialogs: DialogItem[];
  selectedDialogId: string | null;
  onDialogClick: (dialogId: string) => void;
  isFiltering: boolean;
  onPingBot?: () => void;
}

const DialogList = ({ 
  dialogs, 
  filteredDialogs, 
  selectedDialogId, 
  onDialogClick,
  isFiltering,
  onPingBot
}: DialogListProps) => {
  // Show empty state when no dialogs or filtered results
  const showEmptyState = dialogs.length === 0;
  const showNoResultsEmptyState = isFiltering && filteredDialogs.length === 0;
  const displayedDialogs = isFiltering ? filteredDialogs : dialogs;

  return (
    <CardContent className="p-0 max-h-[70vh] overflow-y-auto overflow-x-hidden">
      {showEmptyState ? (
        <DialogEmptyState onAction={onPingBot} />
      ) : showNoResultsEmptyState ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
          <div className="bg-muted/30 p-4 rounded-full mb-4">
            <MessageSquareX className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Нет результатов</h3>
          <p className="text-sm text-muted-foreground max-w-[280px]">
            Попробуйте изменить поисковый запрос или проверить правильность написания.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border/30">
          {displayedDialogs.map((dialog) => (
            <DialogListItem 
              key={dialog.id}
              dialog={dialog} 
              isSelected={dialog.id === selectedDialogId}
              onClick={onDialogClick}
            />
          ))}
        </div>
      )}
    </CardContent>
  );
};

export default DialogList;
