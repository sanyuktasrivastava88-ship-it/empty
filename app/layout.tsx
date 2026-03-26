import type { Metadata } from "next";
import { LetterProvider } from "@/context/LetterContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love Letters - Create a Box of Love Letters",
  description: "Send personalized 'read when' letters to someone special",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LetterProvider>{children}</LetterProvider>
      </body>
    </html>
  );
}
