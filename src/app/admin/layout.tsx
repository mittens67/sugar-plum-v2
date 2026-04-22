"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, Megaphone, LogOut, Home } from "lucide-react";
import { signOut } from "./actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background text-plum">
      {/* Sidebar */}
      <aside className="w-72 bg-white/40 backdrop-blur-xl border-r border-white/60 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/admin" className="block transition-transform hover:scale-105">
            <Image
              src="/logo1.png"
              alt="Sugar Plum Logo"
              width={160}
              height={60}
              priority
              className="object-contain"
            />
          </Link>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary mt-2 font-bold">
            Admin Management
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-primary/10 hover:text-primary group"
          >
            <LayoutDashboard className="w-5 h-5 transition-transform group-hover:scale-110" />
            Overview
          </Link>
          <Link
            href="/admin/menu"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-primary/10 hover:text-primary group"
          >
            <UtensilsCrossed className="w-5 h-5 transition-transform group-hover:scale-110" />
            Menu Items
          </Link>
          <Link
            href="/admin/promotions"
            className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-primary/10 hover:text-primary group"
          >
            <Megaphone className="w-5 h-5 transition-transform group-hover:scale-110" />
            Promotions
          </Link>
        </nav>

        <div className="p-6 border-t border-plum/10 space-y-4">
          <Link href="/" className="flex items-center gap-3 px-6 py-3 text-plum/60 hover:text-plum transition-colors font-bold uppercase tracking-widest text-[10px]">
             <Home className="w-4 h-4" />
             View Live Site
          </Link>
          
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs text-red-500 hover:bg-red-50 transition-all group"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header (simplified) */}
        <header className="lg:hidden bg-white/40 backdrop-blur-xl border-b border-white/60 p-4 flex justify-between items-center">
             <Image src="/logo1.png" alt="Logo" width={100} height={40} />
             <form action={signOut}>
                <button type="submit" className="text-red-500 p-2">
                    <LogOut className="w-6 h-6" />
                </button>
             </form>
        </header>

        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
