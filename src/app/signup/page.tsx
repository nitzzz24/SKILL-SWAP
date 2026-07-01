"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { Sparkles, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !displayName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          displayName: displayName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      // Automatically log user in
      const user = data.user;
      
      // Update local storage representation so profile works
      const profiles = store.getProfiles();
      profiles.push({
        userId: user.id,
        displayName: user.profile?.displayName || displayName,
        email: user.email,
        role: user.role,
        avatarUrl: user.profile?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
        coverUrl: user.profile?.coverUrl || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
        bio: user.profile?.bio || "",
        location: user.profile?.location || "India",
        languages: ["English"],
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

      store.setCurrentUserId(user.id);
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message || "Failed to sign up.");
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
          <h1 className="font-display font-extrabold text-2xl">Create your account</h1>
          <p className="text-xs text-[#94A3B8]">Join the Indian barter learning community.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/35 text-red-500 text-xs font-semibold rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
              Display Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 bg-black border border-[#1E293B] rounded-xl text-sm focus:outline-none focus:border-primary text-white"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

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
            <span>{loading ? "Registering account..." : "Register"}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Redirect toggle link */}
        <p className="text-center text-xs text-[#94A3B8]">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}
