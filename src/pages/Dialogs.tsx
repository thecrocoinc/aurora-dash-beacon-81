
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fakeDialogs } from "@/utils/dummy";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ChatInterface from "@/components/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const Dialogs = () => {
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);

  const selectedDialogData = fakeDialogs.find(dialog => dialog.id === selectedDialog);

  const handleDialogClick = (dialogId: string) => {
    setSelectedDialog(dialogId);
    setOpenDrawer(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dialogs</h1>
      <p className="text-muted-foreground">
        Manage conversations and message threads.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>View and manage recent conversations.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 divide-y">
              {fakeDialogs.map((dialog) => {
                const initials = dialog.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                  
                return (
                  <div 
                    key={dialog.id} 
                    className="p-3 -mx-3 flex items-center gap-4 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => handleDialogClick(dialog.id)}
                  >
                    <Avatar>
                      <AvatarImage src={`${dialog.avatar}?w=40&h=40&fit=crop&crop=faces`} alt={dialog.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{dialog.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(dialog.timestamp, "h:mm a")}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {dialog.lastMessage}
                      </div>
                    </div>
                    {dialog.unread > 0 && (
                      <Badge className="ml-2">{dialog.unread}</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>{selectedDialogData?.name}</DrawerTitle>
          </DrawerHeader>
          <div className="p-0 h-[calc(100%-60px)]">
            <ChatInterface loading={loading} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Dialogs;
