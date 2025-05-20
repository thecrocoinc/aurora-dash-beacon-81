
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ChatInterface from "@/components/ChatInterface";
import { DialogItem } from "./DialogListItem";

interface DialogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDialog: DialogItem | undefined;
  selectedDialogId: string | null;
}

const DialogDrawer = ({ 
  open, 
  onOpenChange, 
  selectedDialog, 
  selectedDialogId 
}: DialogDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b border-border/30 py-4">
          <DrawerTitle className="flex items-center gap-3">
            {selectedDialog && (
              <>
                <Avatar className="h-9 w-9 ring-2 ring-background">
                  <AvatarImage src={selectedDialog.avatar} alt={selectedDialog.name} />
                  <AvatarFallback>
                    {selectedDialog.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{selectedDialog.name}</span>
                  {selectedDialog.isActive && (
                    <span className="badge-status badge-status-active text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Онлайн
                    </span>
                  )}
                </div>
              </>
            )}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-0 h-[calc(100%-60px)] flex flex-col">
          <div className="flex-1">
            <ChatInterface profileId={selectedDialogId || undefined} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DialogDrawer;
