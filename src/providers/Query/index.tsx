"use client"

// Imports
// ========================================================
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Config
// ========================================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Main Root Provider
// ========================================================
const Query = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Imports
// ========================================================
export default Query;
