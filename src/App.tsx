
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";
import ProfileDetail from "./pages/ProfileDetail";
import Dialogs from "./pages/Dialogs";
import Settings from "./pages/Settings";
import BizAgent from "./pages/BizAgent";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";

// Create a client with improved settings for admin panel
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minute
      refetchInterval: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="profiles/:id" element={<ProfileDetail />} />
          <Route path="dialogs" element={<Dialogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="biz-agent" element={<BizAgent />} />
          {/* Admin-focused feature routes */}
          <Route path="bot" element={<BizAgent />} />
          <Route path="subscription" element={<BizAgent />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
