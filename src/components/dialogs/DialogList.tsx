
import { CardContent } from "@/components/ui/card";
import { DialogItem, DialogListItem } from "./DialogListItem";
import DialogEmptyState from "./DialogEmptyState";

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
    <CardContent className="p-0">
      {showEmptyState ? (
        <DialogEmptyState onAction={onPingBot} />
      ) : showNoResultsEmptyState ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h3 className="text-lg font-medium mb-1">Нет результатов</h3>
          <p className="text-sm text-muted-foreground">Попробуйте изменить поисковый запрос.</p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
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
