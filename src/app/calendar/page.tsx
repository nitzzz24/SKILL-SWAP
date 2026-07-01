"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { store, SwapRequest, Skill } from "@/lib/store";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  User, 
  Plus, 
  AlertCircle,
  X,
  FileText
} from "lucide-react";

export default function CalendarPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const loadCalendarData = () => {
      setCurrentUser(store.getCurrentUser());
      setRequests(store.getSwapRequests());
      setSkills(store.getSkills());
    };

    loadCalendarData();
    window.addEventListener("storage-update", loadCalendarData);
    return () => window.removeEventListener("storage-update", loadCalendarData);
  }, []);

  const getSkillTitle = (skillId: string) => {
    return skills.find(s => s.id === skillId)?.title || "Unknown Skill";
  };

  const getPartnerName = (req: SwapRequest) => {
    const partnerId = req.senderId === currentUser?.userId ? req.receiverId : req.senderId;
    return store.getProfile(partnerId)?.displayName || "Swap Partner";
  };

  const getPartnerAvatar = (req: SwapRequest) => {
    const partnerId = req.senderId === currentUser?.userId ? req.receiverId : req.senderId;
    return store.getProfile(partnerId)?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80";
  };

  // Scheduled calls (status = ACCEPTED)
  const sessions = requests.filter(r => 
    r.status === "ACCEPTED" && 
    (r.senderId === currentUser?.userId || r.receiverId === currentUser?.userId)
  );

  const handleCancelSession = (id: string) => {
    if (confirm("Are you sure you want to cancel this scheduled session?")) {
      store.updateSwapRequestStatus(id, "CANCELLED");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-all duration-300">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl">Session Schedule</h1>
          <p className="text-foreground/60 mt-1">Manage dates, coordinate timelines, and join active video classes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Slots Grid (Left) */}
          <div className="lg:col-span-2 p-6 bg-card border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg">Weekly Schedule Slots</h2>
              <span className="text-xs text-primary font-bold">Standard Indian Standard Time (IST)</span>
            </div>

            {/* Simulated Week Calendar */}
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
                const hasSlots = currentUser?.availability?.[day] || currentUser?.availability?.[`${day}day` /* handle both key styles */];
                const slotsList = currentUser?.availability?.[day] || [];
                return (
                  <div key={idx} className="p-3 border border-border/80 rounded-xl bg-foreground/[0.01]">
                    <span className="font-bold text-xs text-foreground/50 block text-center mb-2 uppercase tracking-wide">{day}</span>
                    <div className="space-y-1.5 min-h-[80px] flex flex-col items-center justify-center">
                      {slotsList.length > 0 ? (
                        slotsList.map((slot: string, sIdx: number) => (
                          <span key={sIdx} className="text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-1.5 py-1 rounded-md text-center block w-full">
                            {slot.split(" - ")[0]}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-foreground/30 italic">No slots</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sync reminder banner */}
            <div className="mt-8 flex items-start space-x-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-foreground/80">Google Calendar Sync Ready</h3>
                <p className="text-xs text-foreground/60 mt-0.5">
                  Connect your calendar in profile settings to sync swap events and get automated email reminders 15 minutes before slots.
                </p>
              </div>
            </div>
          </div>

          {/* Session Cards Column (Right) */}
          <div className="space-y-6">
            <div className="p-6 bg-card border border-border rounded-2xl">
              <h2 className="font-display font-bold text-lg mb-4">Upcoming Live Swaps</h2>
              
              <div className="space-y-4">
                {sessions.map((ses) => (
                  <div key={ses.id} className="p-4 bg-foreground/[0.02] border border-border rounded-xl space-y-4">
                    <div className="flex items-center space-x-3">
                      <img src={getPartnerAvatar(ses)} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold text-foreground/80 block">{getPartnerName(ses)}</span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-wider">
                          Swap Partner
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-foreground/75 font-semibold bg-card p-3 rounded-lg border border-border/40">
                      <div className="flex items-center space-x-1.5">
                        <FileText className="h-3.5 w-3.5 text-foreground/50" />
                        <span>Teaching: {getSkillTitle(ses.offeredSkillId)}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="h-3.5 w-3.5 text-foreground/50" />
                        <span>{ses.scheduledAt ? new Date(ses.scheduledAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : "Not scheduled"}</span>
                      </div>
                    </div>

                    {/* Quick Launch Call Button */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleCancelSession(ses.id)}
                        className="p-2 border border-border hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20 rounded-lg text-foreground/60 transition"
                        title="Cancel Session"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      
                      <a 
                        href="https://meet.jit.si/skillswap-peer-barter-session"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition shadow-sm"
                      >
                        <Video className="h-4 w-4" />
                        <span>Join Live Video Class</span>
                      </a>
                    </div>
                  </div>
                ))}

                {sessions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-xs text-foreground/50">No upcoming swap classes scheduled.</p>
                    <p className="text-[10px] text-foreground/40 mt-1">Accept a pending swap proposal on your dashboard to coordinate hours.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
