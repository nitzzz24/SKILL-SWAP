"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { Sparkles, ArrowRight, Globe, Code } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Update client store state with the authenticated user ID
      const user = data.user;
      
      // Update local storage representation so profile works
      const profiles = store.getProfiles();
      const hasLocalProfile = profiles.some(p => p.userId === user.id);
      
      if (!hasLocalProfile) {
        // Sync database user to localStorage mock db so he shows up in Matches/Chats
        profiles.push({
          userId: user.id,
          displayName: user.profile?.displayName || "Member",
          email: user.email,
          role: user.role,
          avatarUrl: user.profile?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
          coverUrl: user.profile?.coverUrl || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
          bio: user.profile?.bio || "",
          location: user.profile?.location || "India",
          languages: user.profile?.languages ? user.profile.languages.split(", ") : ["English"],
          availability: {
            "Monday": ["19:00 - 21:00"],
            "Saturday": ["10:00 - 12:00"]
          },
          skillsOfferedIds: [],
          skillsWantedIds: [],
          rating: 5.0,
          xpPoints: 0,
          level: 1,
          streakDays: 0,
          lastActiveAt: new Date().toISOString(),
          reviews: [],
          achievements: ["Signed Up"],
          badges: []
        });
        localStorage.setItem("skillswap_profiles", JSON.stringify(profiles));
      }

      store.setCurrentUserId(user.id);
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] text-white p-6 relative overflow-hidden font-sans">
      {/* Background Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[110px] -z-10" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-[#1E293B] bg-[#0b101b]/60 backdrop-blur-md shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2.5 mb-2">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-white" />
              <span className="absolute w-4.5 h-4.5 rounded-full border border-white/50 border-dashed animate-spin-slow" />
            </div>
            <span className="font-semibold text-base tracking-tight text-white font-display">
              SkillSwap
            </span>
          </Link>
          <h1 className="font-display font-extrabold text-2xl">Welcome back</h1>
          <p className="text-xs text-[#94A3B8]">Sign in to list skills and find direct matches.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/35 text-red-500 text-xs font-semibold rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              className="w-full p-3 bg-black border border-[#1E293B] rounded-xl text-sm focus:outline-none focus:border-primary text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0082F6] hover:bg-[#0072de] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-500/10 flex items-center justify-center space-x-1.5"
          >
            <span>{loading ? "Authenticating..." : "Continue"}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Social login dividing row */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[#1E293B]/60"></div>
          <span className="flex-shrink mx-4 text-[10px] text-[#475569] font-bold uppercase tracking-wider">or continue with</span>
          <div className="flex-grow border-t border-[#1E293B]/60"></div>
        </div>

        {/* Social OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              // Simulate quick Google Login using a default user
              store.setCurrentUserId("user-1");
              router.push("/onboarding");
            }}
            className="flex items-center justify-center space-x-2 py-2.5 border border-[#1E293B] bg-black/40 hover:bg-white/5 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white transition"
          >
            <Globe className="w-4 h-4" />
            <span>Google</span>
          </button>
          <button
            onClick={() => {
              // Simulate quick GitHub Login using a default user
              store.setCurrentUserId("user-2");
              router.push("/onboarding");
            }}
            className="flex items-center justify-center space-x-2 py-2.5 border border-[#1E293B] bg-black/40 hover:bg-white/5 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white transition"
          >
            <Code className="w-4 h-4" />
            <span>GitHub</span>
          </button>
        </div>

        {/* Redirect toggle link */}
        <p className="text-center text-xs text-[#94A3B8]">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
