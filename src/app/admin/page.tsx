"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { store, UserProfile } from "@/lib/store";
import { 
  ShieldAlert, 
  Users, 
  MessageSquare, 
  Layers, 
  Megaphone,
  Check,
  AlertTriangle,
  FileText
} from "lucide-react";

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [skillsCount, setSkillsCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);
  
  // Announcement form
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceContent, setAnnounceContent] = useState("");

  // System Reports
  const [reports, setReports] = useState<any[]>([
    { id: "rep-1", reporter: "Priya Nair", reported: "Carlos Mendez", reason: "Spammed swap request notes with links.", resolved: false, createdAt: new Date().toISOString() }
  ]);

  useEffect(() => {
    const loadAdminData = () => {
      setCurrentUser(store.getCurrentUser());
      setProfiles(store.getProfiles());
      setSkillsCount(store.getSkills().length);
      setRequestsCount(store.getSwapRequests().length);
    };

    loadAdminData();
    window.addEventListener("storage-update", loadAdminData);
    return () => window.removeEventListener("storage-update", loadAdminData);
  }, []);

  const handleResolveReport = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, resolved: true } : r));
    alert("Report marked as resolved.");
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announceTitle.trim() || !announceContent.trim()) return;

    // Send notification to all profiles
    profiles.forEach((p) => {
      store.addNotification(p.userId, `[Broadcast] ${announceTitle}`, announceContent, "SYSTEM");
    });

    setAnnounceTitle("");
    setAnnounceContent("");
    alert("System Broadcast Announcement sent to all users!");
  };

  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground transition-all duration-300">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
          <ShieldAlert className="h-12 w-12 text-red-500 mb-3" />
          <h1 className="font-display font-bold text-2xl">Access Denied</h1>
          <p className="text-sm text-foreground/50 mt-1">This section requires administrator clearance privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-all duration-300">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl">Admin Control Center</h1>
          <p className="text-foreground/60 mt-1">Manage database safety, site-wide announcements, and moderation reports.</p>
        </div>

        {/* Telemetry Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-card border border-border rounded-2xl flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-foreground/50 font-semibold block uppercase tracking-wider">Total Members</span>
              <span className="text-2xl font-bold font-display">{profiles.length}</span>
            </div>
          </div>
          <div className="p-6 bg-card border border-border rounded-2xl flex items-center space-x-4">
            <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-foreground/50 font-semibold block uppercase tracking-wider">Active Skills</span>
              <span className="text-2xl font-bold font-display">{skillsCount}</span>
            </div>
          </div>
          <div className="p-6 bg-card border border-border rounded-2xl flex items-center space-x-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-foreground/50 font-semibold block uppercase tracking-wider">Proposed Swaps</span>
              <span className="text-2xl font-bold font-display">{requestsCount}</span>
            </div>
          </div>
          <div className="p-6 bg-card border border-border rounded-2xl flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-foreground/50 font-semibold block uppercase tracking-wider">Open Reports</span>
              <span className="text-2xl font-bold font-display">{reports.filter(r => !r.resolved).length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Moderation Reports List (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-card border border-border rounded-2xl">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>User Flag Reports</span>
              </h2>

              <div className="space-y-4">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 bg-foreground/[0.02] border border-border rounded-xl flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-foreground/80">
                        {rep.reporter} reported {rep.reported}
                      </p>
                      <p className="text-xs text-foreground/60 mt-1.5 bg-card border border-border/40 p-2.5 rounded-lg italic">
                        Reason: "{rep.reason}"
                      </p>
                    </div>
                    <div>
                      {rep.resolved ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full">
                          RESOLVED
                        </span>
                      ) : (
                        <button
                          onClick={() => handleResolveReport(rep.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-primary hover:bg-primary/95 text-white rounded-lg text-xs font-bold transition shadow-sm"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Resolve</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Logs */}
            <div className="p-6 bg-card border border-border rounded-2xl">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5 text-foreground/50" />
                <span>Audit Logs</span>
              </h2>
              <div className="space-y-3 font-mono text-[11px] text-foreground/60">
                <p>[2026-07-01 10:14:32] INFO - Database connection to postgresql_neon pool pool_1 initialized.</p>
                <p>[2026-07-01 12:45:00] ACTION - User user-1 broadcasted sitewide notice to 3 recipients.</p>
                <p>[2026-07-01 14:02:18] ALERT - Rate limit limit_tier_1 warning issued for client_addr_127.0.0.1.</p>
              </div>
            </div>
          </div>

          {/* Broadcast Form (Right Sidebar) */}
          <div className="p-6 bg-card border border-border rounded-2xl">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center space-x-2">
              <Megaphone className="h-5 w-5 text-primary" />
              <span>Broadcast Center</span>
            </h2>

            <form onSubmit={handleSendAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1.5">
                  Announcement Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. System Upgrade Maintenance"
                  className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-foreground"
                  value={announceTitle}
                  onChange={(e) => setAnnounceTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1.5">
                  Announcement Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Type the broadcast message details here..."
                  className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-foreground resize-none"
                  value={announceContent}
                  onChange={(e) => setAnnounceContent(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 transition shadow-md shadow-primary/10 flex items-center justify-center space-x-1"
              >
                <Megaphone className="h-4 w-4" />
                <span>Publish Broadcast Announcement</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
