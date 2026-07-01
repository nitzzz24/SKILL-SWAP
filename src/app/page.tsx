"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Plus, Globe, Sparkles, MessageSquare, BarChart, Briefcase, Calendar, Star, HelpCircle } from "lucide-react";

export default function ReplicatedLandingPage() {
  const [cookieClosed, setCookieClosed] = useState(false);

  const skewedCards = [
    { name: "William", learn: "React, JavaScript, Python", teach: "Public speaking, Guitar", match: "100%", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
    { name: "Robert", learn: "Swift, Figma, UI Design", teach: "Product Management, Pol...", match: "96%", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
    { name: "Noor", learn: "HTML, CSS, Tailwind", teach: "Japanese, Animation", match: "89%", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&q=80" },
    { name: "Emma", learn: "UX Research, Python", teach: "Notion", match: "86%", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
    { name: "Dylan", learn: "3D Modeling, Blender, C++", teach: "Branding, Copywriting", match: "86%", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&q=80" },
    { name: "Amina", learn: "Motion Design, Kotlin", teach: "Storytelling, Life Coaching", match: "84%", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white font-sans antialiased overflow-hidden selection:bg-[#3b82f6]/30">
      
      {/* 1. Header Navigation */}
      <header className="w-full border-b border-[#1E293B]/60 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span className="absolute w-2.5 h-2.5 rounded-full bg-white" />
                <span className="absolute w-4.5 h-4.5 rounded-full border border-white/50 border-dashed animate-spin-slow" />
              </div>
              <span className="font-semibold text-base tracking-tight text-white font-display">
                SkillSwap
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8 text-xs text-[#94A3B8] font-bold uppercase tracking-wider">
              <button className="flex items-center space-x-1 hover:text-white transition">
                <span>Product</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center space-x-1 hover:text-white transition">
                <span>Company</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center space-x-1 hover:text-white transition">
                <span>Resources</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button className="flex items-center space-x-1 hover:text-white transition">
                <span>Legal</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </nav>
          </div>

          <div>
            <Link
              href="/login"
              className="bg-[#0082F6] hover:bg-[#0072de] text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md shadow-blue-500/10"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with 3D Skewed Perspective Match Cards */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden z-10">
        
        {/* Background Mesh Light leaks */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1e40af]/20 blur-[130px] -z-20 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#0369a1]/15 blur-[120px] -z-20 pointer-events-none" />

        {/* 3D Skewed Perspective Grid Cards */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden select-none">
          <div 
            className="grid grid-cols-3 gap-6 w-[1200px] h-[800px] opacity-45 scale-[1.05]"
            style={{
              transform: "perspective(1200px) rotateX(60deg) rotateY(0deg) rotateZ(-35deg) translateY(-20px)",
              transformStyle: "preserve-3d"
            }}
          >
            {skewedCards.map((card, i) => (
              <div 
                key={i} 
                className="p-5 rounded-2xl border border-white/10 bg-[#0b101b]/80 backdrop-blur-md flex flex-col justify-between h-[230px] shadow-2xl text-left transform hover:translate-z-[20px] transition duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={card.avatar} alt={card.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    <h4 className="font-bold text-sm text-white">{card.name}</h4>
                  </div>
                  <div className="space-y-2 text-[10px]">
                    <p className="text-[#94A3B8] leading-tight">
                      <span className="font-bold text-[#475569] uppercase block mb-0.5">You can learn from {card.name}:</span>
                      {card.learn}
                    </p>
                    <p className="text-[#94A3B8] leading-tight">
                      <span className="font-bold text-[#475569] uppercase block mb-0.5">You can teach {card.name}:</span>
                      {card.teach}
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#1e293b]/60 pt-3 flex justify-between items-center">
                  <span className="text-[10px] text-[#475569] font-bold">Match level: <span className="text-white">{card.match}</span></span>
                  <div className="flex space-x-1.5">
                    <span className="px-2.5 py-1 bg-[#3b82f6] text-[8px] font-bold rounded-full text-white">Start chat</span>
                    <span className="px-2.5 py-1 border border-[#1e293b] text-[8px] font-bold rounded-full text-[#94A3B8]">Go to profile</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foreground Content */}
        <div className="max-w-4xl mx-auto space-y-6 pt-16 z-20">
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl tracking-tight leading-[1.05] text-white">
            Learn anything.<br />
            Teach what you love.
          </h1>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-semibold">
            A global platform where people exchange skills instead of money. Real-time AI matching. <br className="hidden sm:inline" />
            No fees, no gatekeeping — just human connection and meaningful growth.
          </p>

          <div className="flex items-center justify-center gap-3.5 pt-4">
            <Link
              href="/login"
              className="bg-[#0082F6] hover:bg-[#0072de] text-white text-xs font-bold px-7 py-3 rounded-full transition shadow-lg shadow-blue-500/15"
            >
              Get started
            </Link>
            <a
              href="#features"
              className="border border-[#1e293b] hover:bg-white/5 text-[#94A3B8] hover:text-white text-xs font-bold px-7 py-3 rounded-full transition"
            >
              Explore features
            </a>
          </div>
        </div>
      </section>

      {/* 3. Discover Features Grid Section */}
      <section id="features" className="py-28 border-t border-[#1E293B]/60 bg-[#02050b]/80 relative z-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Discover Everything SkillSwap Can Do for You
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto font-medium">
              Powerful tools to learn, teach, and grow — all in one platform
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card 1: AI Matching (Large glowing orb) */}
            <div className="md:col-span-5 p-6 rounded-2xl border border-[#1e293b]/60 bg-[#070b13]/60 backdrop-blur-md flex flex-col justify-between min-h-[380px] overflow-hidden relative group">
              {/* Electric sphere canvas placeholder */}
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 h-48 flex items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-xl animate-pulse" />
                <div className="relative w-28 h-28 rounded-full border-2 border-blue-400/40 flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full border border-indigo-400/60 border-dashed animate-spin-slow" />
                  <div className="absolute w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-lg animate-ping duration-1000" />
                  <Sparkles className="w-5 h-5 text-white z-10" />
                </div>
              </div>

              <div className="mt-auto space-y-2 z-10">
                <h3 className="font-bold text-base text-white">AI Matching</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Smartly pairs you with the perfect people to teach or learn from.
                </p>
              </div>
            </div>

            {/* Card 2: Built-in Video Chat */}
            <div className="md:col-span-7 p-6 rounded-2xl border border-[#1e293b]/60 bg-[#070b13]/60 backdrop-blur-md flex flex-col justify-between min-h-[380px] overflow-hidden relative group">
              {/* Sleek chat mockup */}
              <div className="w-full bg-[#03060c] border border-white/5 rounded-t-xl p-3 space-y-3 h-48 -mb-6 opacity-80">
                <div className="flex items-center justify-between border-b border-[#1e293b]/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[9px] text-[#475569] font-mono">built-in-video-room.sh</span>
                </div>
                <div className="flex items-center justify-center h-28 border border-dashed border-[#1e293b]/60 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-[#1e293b]" />
                </div>
              </div>

              <div className="space-y-2 z-10 pt-4">
                <h3 className="font-bold text-base text-white">Built-In Video Chat</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Instantly connect, discuss, and schedule—all in one seamless flow.
                </p>
              </div>
            </div>

            {/* Card 3: Calendar */}
            <div className="md:col-span-7 p-6 rounded-2xl border border-[#1e293b]/60 bg-[#070b13]/60 backdrop-blur-md flex flex-col justify-between min-h-[380px] overflow-hidden relative group">
              {/* Calendar mockup */}
              <div className="w-full bg-[#03060c] border border-white/5 rounded-t-xl p-4 h-48 -mb-6 opacity-80 grid grid-cols-12 gap-3">
                <div className="col-span-5 border-r border-[#1e293b]/40 pr-3 space-y-2">
                  <span className="text-[10px] font-bold text-[#475569] block">JUNE 2026</span>
                  <div className="grid grid-cols-7 gap-1 text-[8px] text-center text-[#475569]">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                    <span className="text-white/30">31</span><span>1</span><span>2</span><span className="bg-[#3b82f6] text-white rounded-full">3</span><span>4</span><span>5</span><span>6</span>
                  </div>
                </div>
                <div className="col-span-7 space-y-2 pl-1">
                  <span className="text-[9px] text-[#475569] font-bold uppercase tracking-wider block">Sessions</span>
                  <div className="p-2 rounded-lg bg-[#070b13] border border-[#1e293b]/60 text-[9px] flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">Python with William</span>
                      <span className="text-[#475569]">Learning • 17:00</span>
                    </div>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[8px] font-bold rounded-full">Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 z-10 pt-4">
                <h3 className="font-bold text-base text-white">Smart Calendar</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Plan your skill swaps with double-confirmation calendar invites.
                </p>
              </div>
            </div>

            {/* Card 4: Progress (Achievements) */}
            <div className="md:col-span-5 p-6 rounded-2xl border border-[#1e293b]/60 bg-[#070b13]/60 backdrop-blur-md flex flex-col justify-between min-h-[380px] overflow-hidden relative group">
              {/* Badge mockup */}
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 h-48 flex items-center justify-center">
                <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-tr from-yellow-500/10 to-amber-500/20 border border-yellow-500/30 flex flex-col items-center justify-center space-y-2 shadow-2xl">
                  <Star className="w-10 h-10 text-yellow-400 fill-yellow-400/20" />
                  <span className="text-[9px] font-bold text-yellow-400 uppercase tracking-wider">First Lesson</span>
                </div>
              </div>

              <div className="mt-auto space-y-2 z-10">
                <h3 className="font-bold text-base text-white">Gamified Progress</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Earn skill points, level up, and unlock achievements as you grow.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="w-full py-12 border-t border-[#1E293B]/60 bg-black/90 text-xs text-[#94A3B8] text-center z-20">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p>© 2026 SkillSwap Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <Link href="/" className="hover:text-white transition">Product</Link>
            <Link href="/" className="hover:text-white transition">Company</Link>
            <Link href="/" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* 5. Cookie Consent Banner */}
      {!cookieClosed && (
        <div className="fixed bottom-6 right-6 z-50 max-w-xs p-4 bg-[#1E293B]/90 backdrop-blur-md border border-[#334155] rounded-xl flex flex-col gap-3 shadow-xl">
          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            We use cookies to personalize content, run ads, and analyze traffic. Read our <Link href="/" className="text-white underline font-semibold">Cookie Policy</Link>.
          </p>
          <button 
            onClick={() => setCookieClosed(true)}
            className="w-full py-2 bg-white text-black text-[10px] font-bold rounded-lg hover:bg-white/95 transition text-center"
          >
            Okay
          </button>
        </div>
      )}

    </div>
  );
}
