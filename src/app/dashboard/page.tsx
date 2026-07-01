"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bell, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  HelpCircle,
  Search,
  MessageSquare,
  Award,
  Video,
  User as UserIcon,
  CheckCircle,
  FileText
} from "lucide-react";

export default function ReplicatedDashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Listen to search param changes to automatically set activeTab
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, []);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabName);
      window.history.pushState({}, "", url.toString());
    }
  };

  // Chat search state
  const [chatSearch, setChatSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [matchesView, setMatchesView] = useState("find"); // 'find' or 'my'

  const handleDirectMatch = (userName: string) => {
    alert(`Swap request sent to ${userName}!`);
  };

  const sidebarLinks = [
    { name: "Dashboard" },
    { name: "Matches" },
    { name: "Chat" },
    { name: "Calendar" },
    { name: "Progress" },
    { name: "Community" }
  ];

  // Calendar dates for July 2026
  const calendarDays = [
    28, 29, 30, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 1
  ];

  return (
    <div className="flex h-screen bg-[#060911] text-[#F9FAFB] font-sans antialiased overflow-hidden select-none">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-56 border-r border-[#1e293b]/30 bg-[#020408] flex flex-col py-6 pl-0 pr-4 justify-between shrink-0 z-10">
        <div className="space-y-12">
          {/* Logo at top left (hexagon-like dot cluster) */}
          <Link href="/" className="flex items-center pl-6">
            <div className="grid grid-cols-2 gap-1 w-5 h-5 relative">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </Link>

          {/* Navigation Links with custom rounded-r-full active pill shape */}
          <nav className="flex flex-col space-y-1.5">
            {sidebarLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => handleTabChange(link.name)}
                  className={`w-full flex items-center py-3 pl-8 pr-4 text-sm font-semibold transition ${
                    isActive 
                      ? "bg-[#3b82f6] text-white rounded-r-full shadow-lg shadow-blue-500/10" 
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-r-full"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pl-6 text-[10px] text-[#475569] font-mono">
          SkillSwap v1.0
        </div>
      </aside>

      {/* 2. Main Dashboard Area */}
      <div className="flex-grow flex flex-col overflow-y-auto relative bg-[#060911] pb-10">
        
        {/* Exact mesh radial light-leak glows behind cards */}
        <div className="absolute top-[5%] left-[10%] w-[550px] h-[550px] rounded-full bg-[#1e40af]/15 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0369a1]/15 blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] left-[20%] w-[450px] h-[450px] rounded-full bg-[#1e3a8a]/10 blur-[110px] pointer-events-none -z-10" />

        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-between shrink-0 bg-[#060911]/60 backdrop-blur-md sticky top-0 z-40">
          <div className="flex-grow flex justify-center text-xs font-semibold text-[#94A3B8] capitalize">
            {activeTab} | SkillSwap
          </div>

          {/* SP Coin Badge */}
          <div className="flex items-center space-x-1.5 bg-[#0f172a]/55 border border-[#1e293b]/70 px-4 py-1.5 rounded-full mr-6">
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#06b6d4] flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
              S
            </span>
            <span className="text-xs font-bold text-white tracking-tight">200 SP</span>
            <button className="p-0.5 rounded-full hover:bg-white/10 text-white/80 transition ml-0.5">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Utilities & User profile dropdown */}
          <div className="flex items-center space-x-5">
            <button className="p-2 rounded-full hover:bg-white/5 text-[#94A3B8] hover:text-white transition">
              <Bell className="w-5 h-5" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2.5 cursor-pointer group focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-xs font-bold text-white shadow-md">
                  A
                </div>
                <span className="text-xs font-semibold text-[#F9FAFB] group-hover:text-white transition">Adko</span>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl border border-[#1e293b] bg-[#0b101b]/95 backdrop-blur-md p-2 shadow-2xl z-50 text-xs font-semibold text-[#94A3B8] animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link href="/profile" className="flex items-center space-x-2.5 px-3 py-2 hover:text-white hover:bg-white/5 rounded-lg transition">
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link href="/profile" className="flex items-center space-x-2.5 px-3 py-2 hover:text-white hover:bg-white/5 rounded-lg transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>Settings</span>
                  </Link>
                  <Link href="/profile" className="flex items-center space-x-2.5 px-3 py-2 hover:text-white hover:bg-white/5 rounded-lg transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    <span>Subscriptions</span>
                  </Link>
                  <Link href="/profile" className="flex items-center space-x-2.5 px-3 py-2 hover:text-white hover:bg-white/5 rounded-lg transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    <span>Saved Profiles</span>
                  </Link>
                  <Link href="/profile" className="flex items-center space-x-2.5 px-3 py-2 hover:text-white hover:bg-white/5 rounded-lg transition">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help Center</span>
                  </Link>
                  <div className="border-t border-[#1e293b]/60 my-1"></div>
                  <Link href="/login" className="flex items-center space-x-2.5 px-3 py-2 text-red-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <span>Log Out</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* TAB RENDERS */}
        <main className="flex-grow px-8 space-y-6">
          
          {/* ================== TAB: DASHBOARD ================== */}
          {activeTab === "Dashboard" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column (Activity & Matches) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Activity Card */}
                  <div className="p-8 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md shadow-md text-center">
                    <div className="flex justify-between items-center text-xs text-[#475569] font-bold uppercase tracking-wider mb-8">
                      <span>Activity</span>
                      <select className="bg-transparent border-none text-[#94A3B8] font-bold focus:outline-none cursor-pointer">
                        <option className="bg-[#060911]">Today</option>
                      </select>
                    </div>
                    
                    <div className="py-6 max-w-sm mx-auto space-y-5">
                      <h3 className="font-display font-bold text-lg text-white">Ready for your first SkillSwap session?</h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        Book a session to start tracking your activity and earning XP.
                      </p>
                      <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold px-7 py-3 rounded-full transition shadow-lg shadow-blue-500/10">
                        Schedule a session
                      </button>
                    </div>
                  </div>

                  {/* Matches Card */}
                  <div className="p-6 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md shadow-md">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-display font-bold text-sm text-[#F9FAFB]">Matches</h2>
                      <button onClick={() => setActiveTab("Matches")} className="text-[10px] text-[#475569] font-bold hover:text-primary transition uppercase tracking-wider">
                        see all
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Match 1 */}
                      <div className="p-4 rounded-xl border border-[#1e293b]/50 bg-[#060911]/85 text-center flex flex-col justify-between items-center shadow-sm">
                        <img 
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" 
                          alt="Z" 
                          className="w-14 h-14 rounded-full object-cover border border-[#1e293b]"
                        />
                        <div className="mt-3.5">
                          <h4 className="font-bold text-sm text-white">Z</h4>
                          <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-relaxed">
                            Z can teach you:
                          </p>
                          <span className="text-[10px] font-bold text-white/80 block mt-0.5">Frontend (React, NextJs)</span>
                        </div>
                        <div className="w-full mt-4 border-t border-[#1e293b]/70 pt-3">
                          <span className="text-[9px] text-[#475569] font-semibold block mb-2">Match level: <span className="font-bold text-white">58%</span></span>
                          <button className="w-full py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-bold rounded-full transition shadow-sm">
                            Match
                          </button>
                        </div>
                      </div>

                      {/* Match 2 */}
                      <div className="p-4 rounded-xl border border-[#1e293b]/50 bg-[#060911]/85 text-center flex flex-col justify-between items-center shadow-sm">
                        <img 
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80" 
                          alt="Yasin" 
                          className="w-14 h-14 rounded-full object-cover border border-[#1e293b]"
                        />
                        <div className="mt-3.5">
                          <h4 className="font-bold text-sm text-white">Yasin</h4>
                          <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-relaxed">
                            Yasin can teach you:
                          </p>
                          <span className="text-[10px] font-bold text-white/80 block mt-0.5">Frontend (React, NextJs)</span>
                        </div>
                        <div className="w-full mt-4 border-t border-[#1e293b]/70 pt-3">
                          <span className="text-[9px] text-[#475569] font-semibold block mb-2">Match level: <span className="font-bold text-white">58%</span></span>
                          <button className="w-full py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-bold rounded-full transition shadow-sm">
                            Match
                          </button>
                        </div>
                      </div>

                      {/* Match 3 */}
                      <div className="p-4 rounded-xl border border-[#1e293b]/50 bg-[#060911]/85 text-center flex flex-col justify-between items-center shadow-sm">
                        <div className="w-14 h-14 bg-gradient-to-tr from-[#3b82f6]/10 to-[#06b6d4]/10 border border-[#1e293b]/80 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-[#3b82f6]">?</span>
                        </div>
                        <div className="mt-3.5">
                          <h4 className="font-bold text-sm text-white truncate max-w-full">Dhananjayan</h4>
                          <p className="text-[10px] text-[#94A3B8] mt-1.5 leading-relaxed">
                            Dhananjayan can teach:
                          </p>
                          <span className="text-[10px] font-bold text-white/80 block mt-0.5">Frontend (React, NextJs)</span>
                        </div>
                        <div className="w-full mt-4 border-t border-[#1e293b]/70 pt-3">
                          <span className="text-[9px] text-[#475569] font-semibold block mb-2">Match level: <span className="font-bold text-white">58%</span></span>
                          <button className="w-full py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-bold rounded-full transition shadow-sm">
                            Match
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (July 2026 Calendar) */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md h-full flex flex-col justify-between shadow-md">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <button className="p-1 rounded-md hover:bg-white/5 text-[#94A3B8] hover:text-white">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="font-display font-bold text-sm text-white">July 2026</h3>
                        <button className="p-1 rounded-md hover:bg-white/5 text-[#94A3B8] hover:text-white">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-4">
                        <span>Sun</span>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                      </div>

                      <div className="grid grid-cols-7 gap-y-6 text-center text-xs font-semibold text-[#94A3B8]">
                        {calendarDays.map((day, idx) => {
                          const isCurrentDay = day === 1 && idx === 3;
                          return (
                            <div key={idx} className="flex justify-center items-center">
                              {isCurrentDay ? (
                                <span className="w-7.5 h-7.5 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                                  {day}
                                </span>
                              ) : (
                                <span className={`hover:text-white cursor-pointer ${idx < 3 || idx === 34 ? "text-[#475569]/30" : ""}`}>
                                  {day}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-[#1e293b]/40 pt-6 mt-8 text-center space-y-2">
                      <div className="w-10 h-10 bg-[#1e293b]/30 rounded-xl flex items-center justify-center mx-auto text-[#94A3B8]">
                        <CalendarIcon className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="font-bold text-xs text-white">No lessons on this day</h4>
                      <p className="text-[10px] text-[#94A3B8] leading-relaxed max-w-xs mx-auto">
                        Pick another date in the calendar or create a new session to fill your schedule.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Level Slider */}
              <div className="p-6 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md shadow-md flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#94A3B8] font-bold">Your level</span>
                  <span className="font-display font-extrabold text-2xl text-white">1</span>
                </div>
                <div className="flex-grow bg-[#1e293b]/40 h-1 rounded-full overflow-hidden mx-6">
                  <div className="bg-[#475569] h-full rounded-full w-[25%]" />
                </div>
                <div className="flex items-center space-x-6">
                  <span className="font-display font-extrabold text-2xl text-white">2</span>
                  <button onClick={() => setActiveTab("Progress")} className="text-xs font-semibold text-[#94A3B8] hover:text-white hover:underline transition">
                    How can I upgrade it?
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ================== TAB: MATCHES ================== */}
          {activeTab === "Matches" && (
            <div className="space-y-6">
              {/* Selector Tabs */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => setMatchesView("find")}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition ${
                    matchesView === "find" 
                      ? "bg-white/10 text-white border-white/10" 
                      : "text-[#94A3B8] hover:text-white border-transparent"
                  }`}
                >
                  Find new matches
                </button>
                <button 
                  onClick={() => setMatchesView("my")}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition ${
                    matchesView === "my" 
                      ? "bg-white/10 text-white border-white/10" 
                      : "text-[#94A3B8] hover:text-white border-transparent"
                  }`}
                >
                  My matches
                </button>
              </div>

              {matchesView === "find" ? (
                <>
                  {/* Search filter row */}
                  <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#94A3B8] bg-[#0b101b]/30 p-4 rounded-xl border border-[#1e293b]/20">
                    <div className="flex items-center space-x-2">
                      <span>Filter by skill:</span>
                      <select className="bg-[#0b101b] border border-[#1e293b] rounded-lg px-3 py-1.5 text-white focus:outline-none">
                        <option>All</option>
                      </select>
                    </div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded bg-[#0b101b] border-[#1e293b]" />
                      <span>Instant availability</span>
                    </label>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-1">DIRECT MATCHES</span>
                    <p className="text-xs text-[#94A3B8]">These people match your current skills one-to-one: you can learn what they teach, and they can learn what you teach.</p>
                  </div>

                  {/* Direct Matches Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Bhavana */}
                    <div className="p-5 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md flex flex-col justify-between h-[340px]">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white">B</div>
                          <h3 className="font-bold text-base text-white">Bhavana</h3>
                        </div>
                        <div className="space-y-3.5 text-xs">
                          <p className="text-[#94A3B8] leading-relaxed">
                            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can learn from Bhavana:</span>
                            UI/UX Design (Figma, Sketch), JavaScript
                          </p>
                          <p className="text-[#94A3B8] leading-relaxed">
                            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can teach Bhavana:</span>
                            Graphic Design
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-[#1e293b]/40 pt-4 space-y-3">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-[#475569] font-semibold">Match level: <span className="text-white font-bold">58%</span></span>
                          <span className="text-[#475569] font-medium">Speak English</span>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => handleDirectMatch("Bhavana")} className="flex-grow py-2 bg-[#3b82f6] text-white text-[10px] font-bold rounded-full hover:bg-blue-600 transition">Match</button>
                          <Link href="/profile?user=Bhavana" className="px-3.5 py-2 border border-[#1e293b] text-[#94A3B8] text-[10px] font-bold rounded-full hover:text-white hover:border-white/20 transition text-center flex items-center justify-center">
                            Go to profile
                          </Link>
                        </div>
                      </div>
                    </div>

                {/* Lomrani */}
                <div className="p-5 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md flex flex-col justify-between h-[340px]">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">L</div>
                      <h3 className="font-bold text-base text-white">Lomrani</h3>
                    </div>
                    <div className="space-y-3.5 text-xs">
                      <p className="text-[#94A3B8] leading-relaxed">
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can learn from Lomrani:</span>
                        UI/UX Design (Figma, Sketch), Animation (2D/3D)
                      </p>
                      <p className="text-[#94A3B8] leading-relaxed">
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can teach Lomrani:</span>
                        Graphic Design, Web Development
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#1e293b]/40 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#475569] font-semibold">Match level: <span className="text-white font-bold">58%</span></span>
                      <span className="text-[#475569] font-medium">Speak English</span>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleDirectMatch("Lomrani")} className="flex-grow py-2 bg-[#3b82f6] text-white text-[10px] font-bold rounded-full hover:bg-blue-600 transition">Match</button>
                      <Link href="/profile?user=Lomrani" className="px-3.5 py-2 border border-[#1e293b] text-[#94A3B8] text-[10px] font-bold rounded-full hover:text-white hover:border-white/20 transition text-center flex items-center justify-center">
                        Go to profile
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Malik */}
                <div className="p-5 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md flex flex-col justify-between h-[340px]">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-sm font-bold text-white">
                        <UserIcon className="w-4.5 h-4.5 text-[#94A3B8]" />
                      </div>
                      <h3 className="font-bold text-base text-white">Malik</h3>
                    </div>
                    <div className="space-y-3.5 text-xs">
                      <p className="text-[#94A3B8] leading-relaxed">
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can learn from Malik:</span>
                        Illustration, UI/UX Design (Figma, Sketch), Photography
                      </p>
                      <p className="text-[#94A3B8] leading-relaxed">
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can teach Malik:</span>
                        Graphic Design, UI/UX Design (Figma, Sketch)
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#1e293b]/40 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#475569] font-semibold">Match level: <span className="text-white font-bold">58%</span></span>
                      <span className="text-[#475569] font-medium">Speak English</span>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleDirectMatch("Malik")} className="flex-grow py-2 bg-[#3b82f6] text-white text-[10px] font-bold rounded-full hover:bg-blue-600 transition">Match</button>
                      <Link href="/profile?user=Malik" className="px-3.5 py-2 border border-[#1e293b] text-[#94A3B8] text-[10px] font-bold rounded-full hover:text-white hover:border-white/20 transition text-center flex items-center justify-center">
                        Go to profile
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Z */}
                <div className="p-5 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md flex flex-col justify-between h-[340px]">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" 
                        alt="Z" 
                        className="w-10 h-10 rounded-full object-cover border border-[#1e293b]"
                      />
                      <h3 className="font-bold text-base text-white">Z</h3>
                    </div>
                    <div className="space-y-3.5 text-xs">
                      <p className="text-[#94A3B8] leading-relaxed">
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can learn from Z:</span>
                        Creative Writing, Frontend (React, Next.js), English
                      </p>
                      <p className="text-[#94A3B8] leading-relaxed">
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide block">You can teach Z:</span>
                        Backend (Node.js, Firebase)
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#1e293b]/40 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-[#475569] font-semibold">Match level: <span className="text-white font-bold">58%</span></span>
                      <span className="text-[#475569] font-medium">Speak English</span>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleDirectMatch("Z")} className="flex-grow py-2 bg-[#3b82f6] text-white text-[10px] font-bold rounded-full hover:bg-blue-600 transition">Match</button>
                      <Link href="/profile?user=Z" className="px-3.5 py-2 border border-[#1e293b] text-[#94A3B8] text-[10px] font-bold rounded-full hover:text-white hover:border-white/20 transition text-center flex items-center justify-center">
                        Go to profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-green-500/20 bg-[#070b13]/60 backdrop-blur-md flex flex-col justify-between h-[340px]">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">T</div>
                    <div>
                      <h3 className="font-bold text-base text-white">Try</h3>
                      <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider block">Connected Match</span>
                    </div>
                  </div>
                  <div className="space-y-3.5 text-xs text-[#94A3B8]">
                    <p><strong>You Learn:</strong> React, JavaScript, Python</p>
                    <p><strong>You Teach:</strong> Public speaking, Guitar</p>
                  </div>
                </div>
                <div className="border-t border-[#1e293b]/40 pt-4 flex space-x-2">
                  <button onClick={() => handleTabChange("Chat")} className="flex-grow py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-bold rounded-full">Open Chat</button>
                  <button onClick={() => handleTabChange("Calendar")} className="px-3.5 py-2 border border-[#1e293b] text-[#94A3B8] text-[10px] font-bold rounded-full">Schedule Session</button>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-green-500/20 bg-[#070b13]/60 backdrop-blur-md flex flex-col justify-between h-[340px]">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white">A</div>
                    <div>
                      <h3 className="font-bold text-base text-white">Anh</h3>
                      <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider block">Connected Match</span>
                    </div>
                  </div>
                  <div className="space-y-3.5 text-xs text-[#94A3B8]">
                    <p><strong>You Learn:</strong> UI/UX Design (Figma, Sketch)</p>
                    <p><strong>You Teach:</strong> Graphic Design, Web Development</p>
                  </div>
                </div>
                <div className="border-t border-[#1e293b]/40 pt-4 flex space-x-2">
                  <button onClick={() => handleTabChange("Chat")} className="flex-grow py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-bold rounded-full">Open Chat</button>
                  <button onClick={() => handleTabChange("Calendar")} className="px-3.5 py-2 border border-[#1e293b] text-[#94A3B8] text-[10px] font-bold rounded-full">Schedule Session</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

          {/* ================== TAB: CHAT ================== */}
          {activeTab === "Chat" && (
            <div className="bg-[#0b101b]/60 border border-[#1e293b]/40 rounded-2xl h-[550px] flex overflow-hidden">
              {/* Chat Sidebar (Left) */}
              <div className="w-80 border-r border-[#1e293b]/40 flex flex-col bg-[#070b13]/40">
                <div className="p-4 relative">
                  <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-[#060911]/90 border border-[#1e293b]/80 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none"
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                  />
                </div>
                
                {/* Active user threads */}
                <div className="flex-grow overflow-y-auto">
                  <button className="w-full flex items-center space-x-3.5 p-4 text-left border-l-4 border-[#3b82f6] bg-[#3b82f6]/5">
                    <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-[#94A3B8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white flex items-center">
                          User
                          <span className="w-3.5 h-3.5 rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-[7px] ml-1.5">✓</span>
                        </span>
                        <span className="text-[9px] text-[#475569]">20:22</span>
                      </div>
                      <p className="text-xs text-[#94A3B8] truncate mt-0.5">🎉 Hey Skill Swapper, welcome aboa...</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Chat Canvas (Right) */}
              <div className="flex-grow flex flex-col items-center justify-center p-8 bg-[#0b101b]/20">
                <p className="text-[#94A3B8] text-sm italic font-medium">Select a conversation to start chatting</p>
              </div>
            </div>
          )}

          {/* ================== TAB: CALENDAR ================== */}
          {activeTab === "Calendar" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Calendar grid view */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-6 bg-[#0b101b]/60 border border-[#1e293b]/40 rounded-2xl shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <ChevronLeft className="w-5 h-5 text-[#94A3B8] cursor-pointer" />
                    <h3 className="font-display font-bold text-sm text-white">July 2026</h3>
                    <ChevronRight className="w-5 h-5 text-[#94A3B8] cursor-pointer" />
                  </div>
                  
                  <div className="grid grid-cols-7 text-center text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-4">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>

                  <div className="grid grid-cols-7 gap-y-6 text-center text-xs font-semibold text-[#94A3B8]">
                    {calendarDays.map((day, idx) => {
                      const isCurrentDay = day === 1 && idx === 3;
                      return (
                        <div key={idx} className="flex justify-center items-center">
                          {isCurrentDay ? (
                            <span className="w-7.5 h-7.5 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold">
                              {day}
                            </span>
                          ) : (
                            <span className={`${idx < 3 || idx === 34 ? "text-[#475569]/30" : ""}`}>{day}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button className="w-full py-3.5 bg-[#3b82f6] text-white text-xs font-bold rounded-full transition flex items-center justify-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>New session request</span>
                </button>
              </div>

              {/* Status listings */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex space-x-4 border-b border-[#1e293b]/20 pb-3">
                  <button className="bg-[#3b82f6] text-white text-xs font-bold px-4 py-1.5 rounded-full">Upcoming</button>
                  <button className="text-[#94A3B8] hover:text-white text-xs font-bold">Requests</button>
                  <button className="text-[#94A3B8] hover:text-white text-xs font-bold">History</button>
                </div>

                <div className="py-20 text-center space-y-3">
                  <p className="text-white font-bold text-sm">No upcoming sessions.</p>
                  <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">Click the button below to schedule a session.</p>
                </div>
              </div>
            </div>
          )}

          {/* ================== TAB: PROGRESS ================== */}
          {activeTab === "Progress" && (
            <div className="space-y-6">
              {/* Level progression bar */}
              <div className="p-6 bg-[#0b101b]/60 border border-[#1e293b]/40 rounded-2xl shadow-sm flex items-center justify-between text-xs font-bold">
                <div>
                  <span className="text-[#94A3B8] block text-[10px]">Your level:</span>
                  <span className="text-white text-sm">Newcomer 1</span>
                </div>
                <div className="flex-grow bg-[#1e293b]/40 h-1.5 rounded-full overflow-hidden mx-8 border border-[#1e293b]/30">
                  <div className="bg-[#3b82f6] h-full w-[20%]" />
                </div>
                <div className="text-right">
                  <span className="text-[#94A3B8] block text-[10px]">Gain 400 XP to reach</span>
                  <span className="text-white text-sm">Apprentice 2</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity stats summary */}
                <div className="p-6 bg-[#0b101b]/60 border border-[#1e293b]/40 rounded-2xl shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Activity</span>
                    <select className="bg-transparent border-none text-[#94A3B8] text-xs font-bold">
                      <option>All time</option>
                    </select>
                  </div>
                  
                  <div className="text-center py-6 border-b border-[#1e293b]/30">
                    <h4 className="font-bold text-[#F9FAFB] text-base mb-2">Ready for your first SkillSwap session?</h4>
                    <p className="text-xs text-[#94A3B8] mb-4">Book a session to start tracking your activity and earning XP.</p>
                    <button className="bg-[#3b82f6] text-white text-xs font-bold px-6 py-2.5 rounded-full">Schedule a session</button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#94A3B8]">
                    <div>
                      <span>Hours spent on learning</span>
                      <span className="block text-white font-bold mt-1 text-sm">0h 0m</span>
                    </div>
                    <div>
                      <span>Hours spent on teaching</span>
                      <span className="block text-white font-bold mt-1 text-sm">0h 0m</span>
                    </div>
                  </div>
                </div>

                {/* Badges & Next goals column */}
                <div className="space-y-6">
                  <div className="p-6 bg-[#0b101b]/60 border border-[#1e293b]/40 rounded-2xl h-44 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                      <span className="text-white">Badges</span>
                      <button className="text-[#475569]">see all</button>
                    </div>
                    <div className="flex items-center justify-center flex-grow text-xs text-[#475569] font-bold">
                      No badges earned yet. Complete lessons to acquire.
                    </div>
                  </div>

                  <div className="p-6 bg-[#0b101b]/60 border border-[#1e293b]/40 rounded-2xl h-44">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Next goals</h3>
                    <div className="text-xs text-[#475569] font-bold">
                      Complete your first skill swap to unlock "Apprentice" level!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================== TAB: COMMUNITY ================== */}
          {activeTab === "Community" && (
            <div className="space-y-8 text-center max-w-4xl mx-auto py-8">
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
                SkillSwap is more than a <br />platform. It's a movement.
              </h1>
              
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed font-medium">
                A global community where knowledge flows freely between real people every day.
              </p>

              {/* Ticker banner */}
              <div className="w-full bg-[#0b101b] border border-[#1e293b]/60 py-3 rounded-full overflow-hidden relative">
                <div className="whitespace-nowrap inline-flex space-x-12 text-xs font-bold text-white/80 animate-marquee">
                  <span>Yara taught Portuguese to Diego (BR)</span>
                  <span className="text-primary">•</span>
                  <span>Carlos just earned the "First Lesson" badge!</span>
                  <span className="text-primary">•</span>
                  <span>Ahmed just earned the "First 10 Sessions" badge!</span>
                  <span className="text-[#06b6d4]">•</span>
                  <span>Bhavana completed React swap with Lomrani!</span>
                </div>
              </div>

              {/* Success Stories */}
              <div className="text-left space-y-4 pt-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pl-1">Success Stories</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Story 1 */}
                  <div className="p-5 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-[#94A3B8]" />
                      </div>
                      <span className="text-xs font-bold text-white">Katushka</span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                      "Every single day, SkillSwap helps me to be better and enhance skills of others!!!))))"
                    </p>
                  </div>

                  {/* Story 2 */}
                  <div className="p-5 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md space-y-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 bg-gradient-to-tr from-[#3b82f6]/20 to-[#06b6d4]/20 border border-[#1e293b] rounded-full flex items-center justify-center text-xs font-bold text-[#3b82f6]">
                        ?
                      </div>
                      <span className="text-xs font-bold text-white">vasili</span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                      "SkillSwap helped me find new people while learning skills. Amazing combo for me"
                    </p>
                  </div>
                </div>
              </div>

              <button className="bg-[#3b82f6] text-white text-xs font-bold px-7 py-3 rounded-full shadow-lg shadow-blue-500/10">
                Share your story
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
