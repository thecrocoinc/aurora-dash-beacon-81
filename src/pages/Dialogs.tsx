
import { useState, useCallback, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import DialogHeader from "@/components/dialogs/DialogHeader";
import DialogList from "@/components/dialogs/DialogList";
import DialogDrawer from "@/components/dialogs/DialogDrawer";
import { DialogItem } from "@/components/dialogs/DialogListItem";

// Mock data for dialog placeholders
const mockDialogs: DialogItem[] = [
  {
    id: "1",
    name: "Анна Смирнова",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 19, 9, 23),
    lastMessage: "Спасибо за рекомендацию по ужину, я попробовала это блюдо!",
    unread: 2,
    isActive: true
  },
  {
    id: "2",
    name: "Иван Петров",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 14, 15),
    lastMessage: "Я хочу скорректировать свой рацион на следующую неделю",
    unread: 0,
    isActive: false
  },
  {
    id: "3",
    name: "Ольга Козлова",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 18, 10, 5),
    lastMessage: "Бот предложил мне интересный план питания на основе моих тренировок",
    unread: 1,
    isActive: true
  },
  {
    id: "4",
    name: "Дмитрий Сидоров",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 20, 30),
    lastMessage: "Я загрузил данные со своих Apple Watch, но не вижу их в приложении",
    unread: 0,
    isActive: false
  },
  {
    id: "5",
    name: "Елена Иванова",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
    timestamp: new Date(2025, 4, 17, 18, 42),
    lastMessage: "Как мне добавить в трекер блюда, которых нет в базе данных?",
    unread: 0,
    isActive: false
  }
];

const Dialogs = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter dialogs based on search query
  const filteredDialogs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return mockDialogs;
    
    return mockDialogs.filter(dialog => 
      dialog.name.toLowerCase().includes(query) || 
      dialog.lastMessage.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  const handleDialogClick = useCallback((dialogId: string) => {
    setSelectedDialog(dialogId);
    setOpenDrawer(true);
  }, []);
  
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  const handlePingBot = useCallback(() => {
    toast({
      title: "Бот активирован",
      description: "Бот начал работу с новым клиентом.",
      className: "bg-primary/10 border-primary/20 text-foreground",
    });
  }, []);

  // Auto-highlight first dialog when filtering
  useEffect(() => {
    if (filteredDialogs.length > 0 && searchQuery && !selectedDialog) {
      setSelectedDialog(filteredDialogs[0].id);
    }
  }, [filteredDialogs, searchQuery, selectedDialog]);

  const selectedDialogData = mockDialogs.find(dialog => dialog.id === selectedDialog);
  const isFiltering = searchQuery.trim().length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Диалоги</h1>
        <p className="text-muted-foreground mt-2">
          Управляйте беседами между клиентами и ботом
        </p>
      </div>
      
      <Card className="glass-morphism border-white/10 overflow-hidden transition-all duration-300 hover:shadow-default">
        <DialogHeader 
          title="Недавние беседы" 
          description="Просмотр и управление диалогами клиентов с ботом"
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <DialogList 
          dialogs={mockDialogs}
          filteredDialogs={filteredDialogs}
          selectedDialogId={selectedDialog}
          onDialogClick={handleDialogClick}
          isFiltering={isFiltering}
          onPingBot={handlePingBot}
        />
      </Card>

      <DialogDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        selectedDialog={selectedDialogData}
        selectedDialogId={selectedDialog}
      />
    </div>
  );
};

export default Dialogs;
