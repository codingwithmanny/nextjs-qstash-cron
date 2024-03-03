// Imports
// ========================================================
import type Metadata from "next";
import "./globals.css";
import RootProvider from "../providers";

// Metadata
// ========================================================
export const metadata: Metadata = {
  title: "NextJS QStash Message Cron / Scheduler",
  description:
    "An example demonstrating how you can create a simple scheduler to trigger a NextJS API endpoint.",
};

// Main Layout Component
// ========================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
