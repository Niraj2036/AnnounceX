"use client";

import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { useAuth } from "@/context/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user?.role === "user") {
    return <main className="p-6">{children}</main>;
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-6 bg-zinc-50">{children}</main>
    </div>
  );
}
