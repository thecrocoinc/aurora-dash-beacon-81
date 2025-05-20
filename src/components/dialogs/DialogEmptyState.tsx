
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DialogEmptyStateProps {
  onAction?: () => void;
}

const DialogEmptyState = ({ onAction }: DialogEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="relative">
        <div className="bg-primary/10 p-6 rounded-full mb-6 animate-pulse-glow">
          <MessageSquare className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background opacity-20"></div>
      </div>
      <h3 className="text-xl font-medium mb-3 text-foreground">Нет диалогов</h3>
      <p className="text-sm text-muted-foreground max-w-[280px] mb-6">
        Создайте новое обращение или подождите, пока клиенты не начнут общаться с вашим ботом.
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction} 
          variant="outline" 
          className="bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105"
        >
          Активировать бота
        </Button>
      )}
    </div>
  );
};

export default DialogEmptyState;
