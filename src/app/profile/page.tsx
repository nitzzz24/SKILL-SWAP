"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bell, 
  ChevronDown, 
  User as UserIcon, 
  Plus, 
  Globe, 
  MessageSquare,
  BarChart,
  Briefcase,
  Upload,
  HelpCircle,
  Star,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Video,
  Sparkles
} from "lucide-react";

interface MemberMockProfile {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  location: string;
  languages: string[];
  teachSkills: string;
  learnSkills: string;
  rating: number;
  reviewsCount: number;
  compatibility: string;
  badges: { name: string; icon: string }[];
  mutualReason: string;
}

export default function ReplicatedProfilePage() {
  const [activeTab, setActiveTab] = useState("Progress"); // Matches sidebar highlighting state
  const [name, setName] = useState("Adko");
  const [description, setDescription] = useState("nag");
  const [teachSkill, setTeachSkill] = useState("Graphic Design");
  const [learnSkill, setLearnSkill] = useState("Frontend (React, Next.js)");
  const [language, setLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Parameter view state
  const [viewUser, setViewUser] = useState<string | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestNotes, setRequestNotes] = useState("");

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard?tab=Dashboard" },
    { name: "Matches", href: "/dashboard?tab=Matches" },
    { name: "Chat", href: "/dashboard?tab=Chat" },
    { name: "Calendar", href: "/dashboard?tab=Calendar" },
    { name: "Progress", href: "/profile" },
    { name: "Community", href: "/dashboard?tab=Community" }
  ];

  // Database of Mock Profiles
  const memberProfiles: Record<string, MemberMockProfile> = {
    Bhavana: {
      name: "Bhavana",
      role: "Product Designer",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Bhavana",
      bio: "UI/UX Designer with over 3 years of industry experience. Expert in building Figma design systems, running user interviews, and prototyping micro-interactions.",
      location: "Bangalore, India",
      languages: ["English", "Hindi"],
      teachSkills: "UI/UX Design (Figma, Sketch), JavaScript",
      learnSkills: "Graphic Design",
      rating: 4.8,
      reviewsCount: 12,
      compatibility: "94%",
      badges: [{ name: "Top Mentor", icon: "Award" }, { name: "UX Expert", icon: "Sparkles" }],
      mutualReason: "You can teach Figma while Bhavana teaches JavaScript. You both are available on weekends and speak English."
    },
    Lomrani: {
      name: "Lomrani",
      role: "Creative Animator",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Lomrani",
      bio: "Freelance 3D artist and front-end enthusiast. Creating organic WebGL experiences and GSAP scroll-driven animations for corporate marketing campaigns.",
      location: "Mumbai, India",
      languages: ["English"],
      teachSkills: "UI/UX Design (Figma, Sketch), Animation (2D/3D)",
      learnSkills: "Graphic Design, Web Development",
      rating: 4.9,
      reviewsCount: 8,
      compatibility: "91%",
      badges: [{ name: "Fast Learner", icon: "Clock" }],
      mutualReason: "You can learn Animation from Lomrani while you teach Graphic Design. You both have set remote learning preferences."
    },
    Malik: {
      name: "Malik",
      role: "Illustrator & Photographer",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Malik",
      bio: "Visual storyteller focusing on brand illustration systems and street photography. Swapping visual theory for responsive frontend coding.",
      location: "Delhi, India",
      languages: ["English"],
      teachSkills: "Illustration, UI/UX Design (Figma, Sketch), Photography",
      learnSkills: "Graphic Design, UI/UX Design (Figma, Sketch)",
      rating: 4.7,
      reviewsCount: 6,
      compatibility: "88%",
      badges: [{ name: "Creative Eye", icon: "Camera" }],
      mutualReason: "Malik teaches Illustration and wants to learn Graphic Design. You both speak English and live in India."
    },
    Z: {
      name: "Z",
      role: "Backend Engineer",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Z",
      bio: "Senior systems architect. Specialist in Node.js performance, Firebase serverless cloud functions, and database sharding techniques.",
      location: "Pune, India",
      languages: ["English", "Marathi"],
      teachSkills: "Creative Writing, Frontend (React, Next.js), English",
      learnSkills: "Backend (Node.js, Firebase)",
      rating: 5.0,
      reviewsCount: 22,
      compatibility: "86%",
      badges: [{ name: "Database Guru", icon: "Database" }, { name: "High Performer", icon: "Flame" }],
      mutualReason: "You can swap your Node.js coding tips for Z's creative writing and Next.js frontend lessons."
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get("user");
      if (userParam && memberProfiles[userParam]) {
        setViewUser(userParam);
      } else {
        setViewUser(null);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile changes saved successfully!");
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setIsRequestModalOpen(false);
      alert(`Swap request sent to ${viewUser}!`);
    }, 1200);
  };

  // Get active viewing profile data
  const targetMember = viewUser ? memberProfiles[viewUser] : null;

  return (
    <div className="flex h-screen bg-[#060911] text-[#F9FAFB] font-sans antialiased overflow-hidden select-none">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-56 border-r border-[#1e293b]/30 bg-[#020408] flex flex-col py-6 pl-0 pr-4 justify-between shrink-0 z-10">
        <div className="space-y-12">
          {/* Logo */}
          <Link href="/" className="flex items-center pl-6">
            <div className="grid grid-cols-2 gap-1 w-5 h-5 relative">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1.5">
            {sidebarLinks.map((link) => {
              const isActive = link.name === "Progress";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`w-full flex items-center py-3 pl-8 pr-4 text-sm font-semibold transition ${
                    isActive 
                      ? "bg-[#3b82f6] text-white rounded-r-full shadow-lg shadow-blue-500/10" 
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-r-full"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pl-6 text-[10px] text-[#475569] font-mono">
          SkillSwap v1.0
        </div>
      </aside>

      {/* 2. Main Profile Workspace */}
      <div className="flex-grow flex flex-col overflow-y-auto relative bg-[#060911] pb-10">
        
        {/* Glowing backdrop mesh light leaks */}
        <div className="absolute top-[5%] left-[20%] w-[550px] h-[550px] rounded-full bg-[#1e40af]/15 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#0369a1]/15 blur-[100px] pointer-events-none -z-10" />

        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-between shrink-0 bg-[#060911]/60 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            {viewUser && (
              <button onClick={() => window.history.back()} className="p-2 rounded-lg hover:bg-white/5 text-[#94A3B8] hover:text-white transition flex items-center space-x-1 text-xs">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
            <div className="text-xs font-semibold text-[#94A3B8] capitalize">
              {viewUser ? `${viewUser}'s Profile` : "Edit Profile"} | SkillSwap
            </div>
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

        {/* Edit Profile Content Panel */}
        <main className="flex-grow px-8 py-4 flex items-center justify-center">
          
          {/* ================== CONDITIONAL 1: VIEW PUBLIC PROFILE ================== */}
          {targetMember ? (
            <div className="w-full max-w-4xl p-8 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md shadow-lg space-y-8 animate-in fade-in duration-300">
              
              {/* Header profile details info row */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#1e293b]/60">
                <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                  <img src={targetMember.avatarUrl} alt={targetMember.name} className="w-24 h-24 rounded-full border-2 border-primary/20 object-cover shadow-lg" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <h2 className="font-display font-extrabold text-2xl text-white">{targetMember.name}</h2>
                      <CheckCircle className="w-4.5 h-4.5 text-blue-500" />
                    </div>
                    <p className="text-xs text-[#94A3B8] font-medium">{targetMember.role}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-1 text-xs text-[#94A3B8] mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#475569]" />
                      <span>{targetMember.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2.5">
                  <div className="px-3.5 py-1.5 bg-[#3b82f6]/10 border border-[#3b82f6]/25 rounded-full flex items-center space-x-1.5 text-xs text-[#3b82f6] font-bold">
                    <Star className="w-4.5 h-4.5 fill-current" />
                    <span>{targetMember.compatibility} AI Match Score</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8]">
                    <div className="flex text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="font-bold text-white">{targetMember.rating}</span>
                    <span>({targetMember.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio & Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-6">
                  {/* Bio statement */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">About Me</span>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{targetMember.bio}</p>
                  </div>

                  {/* Skills panel details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-[#1e293b]/60 bg-[#070b13]/60 space-y-2">
                      <span className="text-[9px] font-bold text-[#475569] uppercase tracking-wide block">Skills Offered</span>
                      <p className="text-xs text-white font-semibold">{targetMember.teachSkills}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-[#1e293b]/60 bg-[#070b13]/60 space-y-2">
                      <span className="text-[9px] font-bold text-[#475569] uppercase tracking-wide block">Skills Wanted</span>
                      <p className="text-xs text-white font-semibold">{targetMember.learnSkills}</p>
                    </div>
                  </div>

                  {/* Mutual Match Explanation block */}
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-[#3b82f6]/5 space-y-2">
                    <div className="flex items-center space-x-1.5">
                      <Sparkles className="w-4.5 h-4.5 text-blue-400" />
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Mutual Match Analysis</span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{targetMember.mutualReason}</p>
                  </div>
                </div>

                <div className="md:col-span-4 space-y-6">
                  {/* Badges Container */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">Achievements</span>
                    <div className="flex flex-col gap-2">
                      {targetMember.badges.map((badge, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 bg-gradient-to-tr from-[#1e293b]/60 to-[#0f172a]/30 border border-[#1e293b]/60 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{badge.name}</span>
                            <span className="text-[9px] text-[#475569]">Verified Accomplishment</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Actions */}
                  <div className="pt-4 space-y-3.5">
                    <button 
                      onClick={() => setIsRequestModalOpen(true)}
                      className="w-full py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-500/10 flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-4.5 h-4.5" />
                      <span>Send Swap Request</span>
                    </button>
                    <Link 
                      href="/dashboard?tab=Chat"
                      className="w-full py-3 border border-[#1e293b] hover:border-white/20 text-[#94A3B8] hover:text-white text-xs font-bold rounded-xl transition text-center flex items-center justify-center space-x-1.5"
                    >
                      <MessageSquare className="w-4.5 h-4.5" />
                      <span>Open Direct Chat</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Send Request modal layout */}
              {isRequestModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-200">
                  <div className="w-full max-w-md p-6 bg-[#0b101b] border border-[#1e293b] rounded-2xl shadow-2xl space-y-5 text-left">
                    <h3 className="font-display font-extrabold text-lg text-white">Create Swap Request</h3>
                    <p className="text-xs text-[#94A3B8]">Request to exchange skills with {targetMember.name}.</p>
                    
                    <form onSubmit={handleSendRequest} className="space-y-4">
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-2">Skill You Want to Learn</label>
                        <input type="text" disabled className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-[#94A3B8]" value={targetMember.teachSkills.split(", ")[0]} />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-2">Skill You Will Teach</label>
                        <input type="text" disabled className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-[#94A3B8]" value={targetMember.learnSkills.split(", ")[0]} />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-2">Learning Goal & Message</label>
                        <textarea 
                          rows={3} 
                          required 
                          className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                          placeholder="Hey! Tell them why you want to swap..."
                          value={requestNotes}
                          onChange={(e) => setRequestNotes(e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-3.5 pt-2">
                        <button type="submit" disabled={requestSent} className="flex-grow py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition">
                          {requestSent ? "Submitting request..." : "Submit Request"}
                        </button>
                        <button type="button" onClick={() => setIsRequestModalOpen(false)} className="px-4 py-2.5 border border-[#1e293b] text-[#94A3B8] text-xs font-bold rounded-xl transition hover:text-white">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* ================== CONDITIONAL 2: CURRENT USER EDIT FORM ================== */
            <div className="w-full max-w-4xl p-8 rounded-2xl border border-[#1e293b]/40 bg-[#0b101b]/60 backdrop-blur-md shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              
              {/* Left Card Area (Avatar upload) */}
              <div className="md:col-span-4 flex flex-col items-center space-y-5">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-[#0082F6] flex items-center justify-center text-5xl font-bold text-white shadow-lg border-2 border-white/10 select-none">
                    A
                  </div>
                </div>
                <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md shadow-blue-500/10 flex items-center space-x-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Change Avatar</span>
                </button>
              </div>

              {/* Right Card Area (Input Form) */}
              <form onSubmit={handleSave} className="md:col-span-8 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Your name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      className="w-full bg-[#070b13] border border-[#1e293b] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#3b82f6] text-white"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Bio Description */}
                <div>
                  <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Profile description
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#94A3B8]" />
                    <textarea
                      rows={3}
                      className="w-full bg-[#070b13] border border-[#1e293b] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#3b82f6] text-white resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Skill to teach */}
                <div>
                  <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Skills you want to teach
                  </label>
                  <div className="relative">
                    <BarChart className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <select
                      className="w-full bg-[#070b13] border border-[#1e293b] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#3b82f6] text-white appearance-none cursor-pointer"
                      value={teachSkill}
                      onChange={(e) => setTeachSkill(e.target.value)}
                    >
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Illustration">Illustration</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                  </div>
                </div>

                {/* Skill to learn */}
                <div>
                  <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Skills you want to learn
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <select
                      className="w-full bg-[#070b13] border border-[#1e293b] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#3b82f6] text-white appearance-none cursor-pointer"
                      value={learnSkill}
                      onChange={(e) => setLearnSkill(e.target.value)}
                    >
                      <option value="Frontend (React, Next.js)">Frontend (React, Next.js)</option>
                      <option value="UI/UX Design (Figma, Sketch)">UI/UX Design (Figma, Sketch)</option>
                      <option value="Animation (2D/3D)">Animation (2D/3D)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Languages you speak
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <select
                      className="w-full bg-[#070b13] border border-[#1e293b] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#3b82f6] text-white appearance-none cursor-pointer"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                  </div>
                </div>

                {/* Form buttons */}
                <div className="flex space-x-3 pt-3">
                  <button
                    type="submit"
                    className="flex-grow py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold rounded-full transition shadow-md shadow-blue-500/10"
                  >
                    Save Profile
                  </button>
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 border border-[#1e293b] hover:border-white/20 text-[#94A3B8] hover:text-white text-xs font-bold rounded-full transition text-center flex items-center justify-center"
                  >
                    View My Public Profile
                  </Link>
                </div>

              </form>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
