"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { store } from "@/lib/store";
import { 
  BookOpen, 
  Search, 
  MessageSquare, 
  Calendar, 
  Bell, 
  Sun, 
  Moon, 
  Shield, 
  User as UserIcon, 
  LogOut,
  Users
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    const updateNavbarData = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);
      setAllUsers(store.getProfiles());
      if (user) {
        const notifs = store.getNotifications(user.userId);
        setNotifCount(notifs.filter((n: any) => !n.read).length);
      }
    };

    updateNavbarData();
    window.addEventListener("storage-update", updateNavbarData);
    return () => window.removeEventListener("storage-update", updateNavbarData);
  }, []);

  const handleUserSwitch = (userId: string) => {
    store.setCurrentUserId(userId);
  };

  const navLinks = [
    { href: "/marketplace", label: "Marketplace", icon: Search },
    { href: "/dashboard", label: "Dashboard", icon: BookOpen },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-md shadow-primary/20">
                S
              </span>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SkillSwap
              </span>
            </Link>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Tools */}
          <div className="flex items-center space-x-3">
            {/* User Simulator Selector (For demo convenience) */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-foreground/5 px-2.5 py-1.5 rounded-full border border-border">
              <Users className="h-3.5 w-3.5 text-foreground/50" />
              <span className="text-[11px] font-semibold text-foreground/50">Simulate:</span>
              <select 
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer text-foreground"
                value={currentUser?.userId || ""}
                onChange={(e) => handleUserSwitch(e.target.value)}
              >
                {allUsers.map((u) => (
                  <option key={u.userId} value={u.userId} className="text-black dark:text-white bg-background">
                    {u.displayName} ({u.role.replace("_", " ")})
                  </option>
                ))}
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-foreground/5 text-foreground/75 transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Notifications Indicator */}
            {currentUser && (
              <Link
                href="/notifications"
                className="relative p-2.5 rounded-full hover:bg-foreground/5 text-foreground/75 transition"
              >
                <Bell className="h-5 w-5" />
                {notifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-4 min-w-[16px] px-1 bg-accent text-[9px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                    {notifCount}
                  </span>
                )}
              </Link>
            )}

            {/* Admin Dashboard Quick Access */}
            {currentUser?.role === "ADMIN" && (
              <Link
                href="/admin"
                className={`p-2.5 rounded-full hover:bg-foreground/5 text-foreground/75 transition ${
                  pathname === "/admin" ? "text-primary" : ""
                }`}
                title="Admin Control Panel"
              >
                <Shield className="h-5 w-5" />
              </Link>
            )}

            {/* Profile Bubble */}
            {currentUser ? (
              <Link href="/profile" className="flex items-center space-x-2 pl-2">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.displayName}
                  className="h-8.5 w-8.5 rounded-full object-cover border-2 border-primary/20 hover:border-primary transition"
                />
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/95 transition shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer links bar */}
      <div className="flex md:hidden justify-around border-t border-border/50 py-2 bg-background/95">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center space-y-0.5 text-[10px] font-semibold transition ${
                isActive ? "text-primary" : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
