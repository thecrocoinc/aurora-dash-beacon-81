
import { MessageSquare } from "lucide-react";

const DialogEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium mb-1">Нет диалогов</h3>
      <p className="text-sm text-muted-foreground">Создайте новое обращение или подождите, пока клиенты не начнут общаться.</p>
    </div>
  );
};

export default DialogEmptyState;
