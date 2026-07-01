"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { store, Skill, UserProfile } from "@/lib/store";
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  CheckCircle,
  Briefcase,
  Clock,
  ArrowRight,
  Send,
  X
} from "lucide-react";

export default function MarketplacePage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  
  // Modal State
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<UserProfile | null>(null);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [swapNote, setSwapNote] = useState("");
  const [offeredSkillId, setOfferedSkillId] = useState("");

  useEffect(() => {
    const loadMarketplaceData = () => {
      setSkills(store.getSkills());
      setProfiles(store.getProfiles());
      setCategories(store.getCategories());
      setCurrentUser(store.getCurrentUser());
    };

    loadMarketplaceData();
    window.addEventListener("storage-update", loadMarketplaceData);
    return () => window.removeEventListener("storage-update", loadMarketplaceData);
  }, []);

  const getOwnerProfile = (userId: string) => {
    return profiles.find(p => p.userId === userId);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || "Other";
  };

  // Filter logic
  const filteredSkills = skills.filter((skill) => {
    const owner = getOwnerProfile(skill.offeredByUserId);
    // Don't show current user's own skills in listings to swap with themselves
    if (skill.offeredByUserId === currentUser?.userId) return false;

    const matchesSearch = 
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (owner && owner.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || skill.categoryId === selectedCategory;
    const matchesExperience = selectedExperience === "all" || skill.experience === selectedExperience;

    return matchesSearch && matchesCategory && matchesExperience;
  });

  const handleOpenSwapModal = (skill: Skill) => {
    const owner = getOwnerProfile(skill.offeredByUserId);
    if (!owner) return;
    setSelectedSkill(skill);
    setSelectedOwner(owner);
    
    // Auto-select first skill offered by current user as a suggestion
    if (currentUser && currentUser.skillsOfferedIds.length > 0) {
      // Find the actual skill object
      const mySkills = store.getSkills().filter(s => s.offeredByUserId === currentUser.userId);
      if (mySkills.length > 0) {
        setOfferedSkillId(mySkills[0].id);
      }
    }
    
    setIsSwapModalOpen(true);
  };

  const handleSendSwapRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedSkill || !selectedOwner) return;

    store.createSwapRequest({
      senderId: currentUser.userId,
      receiverId: selectedOwner.userId,
      offeredSkillId: offeredSkillId || "skill-1", // Fallback default
      wantedSkillId: selectedSkill.id,
      status: "PENDING",
      notes: swapNote || `Hi ${selectedOwner.displayName}, I would love to exchange skills with you!`
    });

    // Reset and close
    setSwapNote("");
    setIsSwapModalOpen(false);
    setSelectedSkill(null);
    setSelectedOwner(null);
    alert("Swap Request sent successfully!");
  };

  // Current user's skills offered to select from
  const currentUserOfferedSkills = skills.filter(s => s.offeredByUserId === currentUser?.userId);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-all duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl">Skill Marketplace</h1>
          <p className="text-foreground/60 mt-1">Discover mentors nearby and swap skills with no transaction costs.</p>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search skills, names, or topics..."
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Selector */}
          <div>
            <select
              className="w-full p-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition text-foreground"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <select
              className="w-full p-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition text-foreground"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="all">Any Experience Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const owner = getOwnerProfile(skill.offeredByUserId);
            if (!owner) return null;

            return (
              <div 
                key={skill.id}
                className="flex flex-col justify-between p-6 bg-card border border-border/80 rounded-2xl hover:border-primary/45 hover:shadow-md transition duration-300"
              >
                <div>
                  {/* Category & Badge Row */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {getCategoryName(skill.categoryId)}
                    </span>
                    <span className="text-xs text-foreground/50 font-medium">
                      {skill.experience} Level
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-lg mb-2 line-clamp-1">{skill.title}</h3>
                  <p className="text-sm text-foreground/70 mb-5 line-clamp-3">{skill.description}</p>
                </div>

                {/* Profile Card & Button */}
                <div className="border-t border-border/50 pt-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2.5">
                      <img 
                        src={owner.avatarUrl} 
                        alt={owner.displayName} 
                        className="h-8.5 w-8.5 rounded-full object-cover border border-border"
                      />
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-bold text-foreground/80">{owner.displayName}</span>
                          {owner.role === "VERIFIED_MENTOR" && (
                            <CheckCircle className="h-3 w-3 text-primary fill-primary/10" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-[10px] text-accent font-bold">
                          <Star className="h-3 w-3 fill-accent" />
                          <span>{owner.rating}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleOpenSwapModal(skill)}
                      className="flex items-center space-x-1 text-xs font-bold bg-primary text-white px-3.5 py-2 rounded-full hover:bg-primary/95 transition shadow-sm"
                    >
                      <span>Swap</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredSkills.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <p className="text-foreground/50 font-semibold">No skills found matching your filters.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedExperience("all"); }}
                className="text-primary text-xs font-bold hover:underline mt-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Swap Request Modal */}
      {isSwapModalOpen && selectedSkill && selectedOwner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-border overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-foreground/[0.02]">
              <h2 className="font-display font-bold text-lg">Propose Swap</h2>
              <button 
                onClick={() => setIsSwapModalOpen(false)}
                className="text-foreground/50 hover:text-foreground p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendSwapRequest} className="p-6 space-y-4">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">YOU WANT TO LEARN</span>
                <p className="font-semibold text-sm">{selectedSkill.title}</p>
                <p className="text-xs text-foreground/60 mt-0.5">Offered by: {selectedOwner.displayName}</p>
              </div>

              {/* What current user will offer */}
              <div>
                <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1.5">
                  YOU WILL TEACH
                </label>
                {currentUserOfferedSkills.length > 0 ? (
                  <select
                    className="w-full p-3 bg-background border border-border rounded-xl text-sm font-semibold focus:outline-none focus:border-primary text-foreground"
                    value={offeredSkillId}
                    onChange={(e) => setOfferedSkillId(e.target.value)}
                    required
                  >
                    {currentUserOfferedSkills.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-xs border border-dashed border-border p-3 rounded-xl text-center text-foreground/60">
                    You haven't listed any offered skills yet. Add some in your profile first!
                  </div>
                )}
              </div>

              {/* Custom message notes */}
              <div>
                <label className="block text-xs font-bold text-foreground/70 uppercase tracking-wider mb-1.5">
                  Message / Proposal Note
                </label>
                <textarea
                  rows={4}
                  placeholder={`Explain what you are hoping to learn and how you can coordinate, e.g. "I can help with Spanish conversations if we do 1 hour of React pairing per week!"`}
                  className="w-full p-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary text-foreground resize-none"
                  value={swapNote}
                  onChange={(e) => setSwapNote(e.target.value)}
                  required
                />
              </div>

              {/* Submit buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSwapModalOpen(false)}
                  className="flex-1 py-3 text-xs font-bold border border-border rounded-xl hover:bg-foreground/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-bold bg-primary text-white rounded-xl hover:bg-primary/95 transition flex items-center justify-center space-x-1 shadow-md shadow-primary/10"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
