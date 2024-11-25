import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Gardens",
  description: "Assistant for gardening",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`flex flex-col min-h-screen antialiased`}>
        <Header />
        <main className="flex flex-col flex-1">{children}</main>
      </body>
    </html>
  );
}
