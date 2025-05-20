
import { CardContent } from "@/components/ui/card";
import { DialogItem, DialogListItem } from "./DialogListItem";
import DialogEmptyState from "./DialogEmptyState";

interface DialogListProps {
  dialogs: DialogItem[];
  selectedDialogId: string | null;
  onDialogClick: (dialogId: string) => void;
}

const DialogList = ({ dialogs, selectedDialogId, onDialogClick }: DialogListProps) => {
  return (
    <CardContent className="p-0">
      <div className="divide-y divide-white/5">
        {dialogs.map((dialog) => (
          <DialogListItem 
            key={dialog.id}
            dialog={dialog} 
            isSelected={dialog.id === selectedDialogId}
            onClick={onDialogClick}
          />
        ))}
      </div>
      
      {dialogs.length === 0 && <DialogEmptyState />}
    </CardContent>
  );
};

export default DialogList;
