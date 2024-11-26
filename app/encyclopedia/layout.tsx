// app/encyclopedia/layout.tsx
"use client";

import Section from "../components/Section";
import SideBar from "./components/SideBar/SideBar";

export default function EncyclopediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section
      isFullHeight
      className="w-screen max-w-full grid grid-cols-[1fr_3fr] gap-8"
    >
      <SideBar />
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </Section>
  );
}
