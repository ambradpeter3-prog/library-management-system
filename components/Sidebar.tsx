"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, logout, type User } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/books",     label: "Books",     icon: "📖" },
  { href: "/members",   label: "Members",   icon: "👥" },
  { href: "/borrows",   label: "Borrows",   icon: "📋" },
];

// Sidebar background switches based on active section
function getSidebarBg(pathname: string): string {
  if (
    pathname.startsWith("/books") ||
    pathname.startsWith("/members") ||
    pathname.startsWith("/borrows")
  ) {
    return "url('/ter2.jpg')";
  }
  return "url('/ter.jpg')";
}

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { setUser(getSession()); }, []);

  const handleLogout = () => { logout(); router.push("/login"); };

  return (
    <aside className="relative w-64 min-h-screen flex flex-col overflow-hidden">
      {/* Background: switches between ter.jpg (dashboard) and ter2.jpg (books/members/borrows) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: getSidebarBg(pathname), filter: "brightness(1.3) contrast(1.05)" }}
      />
      <div className="absolute inset-0 bg-slate-900/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">LibraryMS</h1>
              <p className="text-xs text-slate-400">Library Management System</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ href, label, icon }) => {
            const active = href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all overflow-hidden group ${
                  active ? "bg-indigo-600 text-white shadow-lg" : "text-slate-300 hover:text-white"
                }`}
              >
                {/* Photo bleed on inactive items */}
                {!active && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                      style={{ backgroundImage: getSidebarBg(pathname), filter: "brightness(1.3)" }}
                    />
                    <div className="absolute inset-0 bg-slate-800/60 group-hover:bg-slate-700/60 transition-colors" />
                  </>
                )}
                <span className="relative flex items-center gap-3">
                  <span className="text-base">{icon}</span>
                  {label}
                </span>
                <span className="relative text-slate-400 text-xs">›</span>
              </Link>
            );
          })}
        </nav>

        {/* User + Sign out */}
        <div className="px-4 py-5 mt-4 border-t border-white/10 space-y-3">
          {user && (
            <div className="flex items-center gap-3 px-1">
              <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 capitalize">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-rose-600/80 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
