
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DialogItem } from "./DialogListItem";
import ChatBubble from "@/components/ChatBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { ChatLog, Message } from "@/types/chat";

interface DialogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDialog: DialogItem | undefined;
  selectedDialogId: string | null;
}

interface ChatMessage {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

const DialogDrawer = ({ 
  open, 
  onOpenChange, 
  selectedDialog,
  selectedDialogId
}: DialogDrawerProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch messages when dialog changes - mock implementation
  useEffect(() => {
    if (selectedDialogId) {
      setLoading(true);
      // Simulate loading messages from chat_logs
      setTimeout(() => {
        const mockMessages: ChatMessage[] = [
          {
            id: "1",
            role: "user",
            content: "Привет! Я хотел бы узнать, как улучшить свой рацион для набора мышечной массы.",
            created_at: new Date(2025, 4, 18, 10, 0).toISOString()
          },
          {
            id: "2",
            role: "assistant",
            content: "Здравствуйте! Для набора мышечной массы важно увеличить потребление белка до 1.6-2.2г на кг веса и обеспечить калорийный профицит около 10-20% от вашей нормы. Рекомендую добавить в рацион курицу, яйца, творог, рыбу, орехи и бобовые. Также важно не забывать про сложные углеводы для энергии и полезные жиры.",
            created_at: new Date(2025, 4, 18, 10, 2).toISOString()
          },
          {
            id: "3",
            role: "user",
            content: "Спасибо за информацию! А какое количество приемов пищи в день было бы оптимальным?",
            created_at: new Date(2025, 4, 18, 10, 5).toISOString()
          },
          {
            id: "4",
            role: "assistant",
            content: "Для набора мышечной массы рекомендуется 4-6 приемов пищи в день с интервалом 2-3 часа. Это поможет поддерживать постоянный приток питательных веществ к мышцам и ускорит метаболизм. Особенно важно есть белковую пищу до и после тренировки в окно около 2 часов.",
            created_at: new Date(2025, 4, 18, 10, 7).toISOString()
          }
        ];
        setMessages(mockMessages);
        setLoading(false);
      }, 1000);
    }
  }, [selectedDialogId]);

  const handleSend = () => {
    if (message.trim() === "") return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: message.trim(),
      created_at: new Date().toISOString()
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedDialog) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerHeader className="flex flex-col gap-1.5 p-4 border-b">
        <h3 className="text-lg font-semibold">{selectedDialog.name}</h3>
        <p className="text-sm text-muted-foreground">
          {selectedDialog.isActive ? "В сети" : "Не в сети"}
        </p>
      </DrawerHeader>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="flex flex-col gap-2 p-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.content}
                isUser={msg.role === "user"}
                timestamp={new Date(msg.created_at)}
              />
            ))
          )}
        </div>
      </ScrollArea>
      
      <DrawerFooter className="p-4 border-t bg-background">
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="Введите сообщение..."
            className="resize-none min-h-[60px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button 
            onClick={handleSend}
            disabled={message.trim() === ""}
            className="shrink-0"
          >
            Отправить
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  );
};

export default DialogDrawer;
