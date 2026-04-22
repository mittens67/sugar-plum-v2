"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, UtensilsCrossed, Megaphone, LogOut, Home, Menu, X } from "lucide-react";
import { signOut } from "./actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  const navLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Menu Items", icon: UtensilsCrossed },
    { href: "/admin/promotions", label: "Promotions", icon: Megaphone },
  ];

  const SidebarContent = () => (
    <>
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
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all group ${
                isActive 
                  ? "bg-primary text-plum" 
                  : "text-plum/60 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "" : ""}`} />
              {link.label}
            </Link>
          );
        })}
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
    </>
  );

  return (
    <div className="flex min-h-screen bg-background text-plum">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white/40 backdrop-blur-xl border-r border-white/60 hidden lg:flex flex-col sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-plum/40 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-white/95 backdrop-blur-2xl z-50 lg:hidden flex flex-col transition-transform duration-500 ease-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-6 right-6 p-2 text-plum/40 hover:text-plum"
        >
            <X className="w-6 h-6" />
        </button>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white/40 backdrop-blur-xl border-b border-white/60 p-4 flex justify-between items-center sticky top-0 z-40">
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-plum hover:bg-plum/5 rounded-xl transition-colors"
             >
                <Menu className="w-6 h-6" />
             </button>
             <Image src="/logo1.png" alt="Logo" width={100} height={40} className="object-contain" />
             <div className="w-10" /> {/* Spacer to balance logo */}
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
