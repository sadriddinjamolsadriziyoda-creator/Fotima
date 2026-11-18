"use client";

import { LayoutDashboard, Store, PackageOpen } from "lucide-react";
import DashShell from "@/components/DashShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashShell
      title="Admin (demo)"
      links={[
        { href: "/admin", label: "Umumiy ko‘rinish", icon: LayoutDashboard },
        { href: "/admin/restaurants", label: "Restoranlar", icon: Store },
        { href: "/admin/products", label: "Mahsulotlar", icon: PackageOpen },
      ]}
    >
      {children}
    </DashShell>
  );
}
