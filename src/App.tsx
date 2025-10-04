import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthWrapper } from "@/components/AuthWrapper";
import Index from "./pages/Index";
import MeetingNotes from "./pages/MeetingNotes";
import AIAssistant from "./pages/AIAssistant";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
import Contacts from "./pages/Contacts";
import Feedback from "./pages/Feedback";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App is rendering...");
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuthWrapper>
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/meetings" element={<MeetingNotes />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/assistant" element={<AIAssistant />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </HashRouter>
            </AuthWrapper>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
