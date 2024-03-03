// Imports
// ========================================================
import QueryProvider from "./Query";

// Main Root Provider
// ========================================================
const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

// Imports
// ========================================================
export default RootProvider;
