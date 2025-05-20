
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DialogEmptyStateProps {
  onAction?: () => void;
}

const DialogEmptyState = ({ onAction }: DialogEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-muted/30 p-4 rounded-full mb-4">
        <MessageSquare className="h-12 w-12 text-primary/70" />
      </div>
      <h3 className="text-lg font-medium mb-1.5 text-foreground">Нет диалогов</h3>
      <p className="text-sm text-muted-foreground max-w-[280px] text-center">
        Создайте новое обращение или подождите, пока клиенты не начнут общаться.
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction} 
          variant="outline" 
          size="sm" 
          className="mt-5 bg-primary/10 text-primary hover:bg-primary/20"
        >
          Активировать бота
        </Button>
      )}
    </div>
  );
};

export default DialogEmptyState;
