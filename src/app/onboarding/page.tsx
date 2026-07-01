"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Check, 
  Clock, 
  Globe, 
  BookOpen, 
  User as UserIcon, 
  Star, 
  MapPin, 
  Shield, 
  Briefcase,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  Award,
  Video,
  VideoOff
} from "lucide-react";

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("Raj");
  
  // State for onboarding data
  const [purpose, setPurpose] = useState("");
  
  // Learning skills states
  const [selectedLearnSkills, setSelectedLearnSkills] = useState<string[]>([]);
  const [learnSearch, setLearnSearch] = useState("");
  const [learnDetails, setLearnDetails] = useState<Record<string, { level: string; goal: string; timeline: string }>>({});
  
  // Teaching skills states
  const [selectedTeachSkills, setSelectedTeachSkills] = useState<string[]>([]);
  const [teachSearch, setTeachSearch] = useState("");
  const [teachDetails, setTeachDetails] = useState<Record<string, { yoe: string; level: string; exp: string; portfolio: string; availability: string; language: string }>>({});
  
  // Learning style
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  
  // Availability
  const [timezone, setTimezone] = useState("IST (UTC+5:30)");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  
  // Profile Fields
  const [bio, setBio] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("India");
  const [occupation, setOccupation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  
  // AI Match Preferences
  const [remoteOnly, setRemoteOnly] = useState(true);
  const [sameLanguage, setSameLanguage] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [highestRated, setHighestRated] = useState(true);

  // Match Loader states
  const [loaderMessage, setLoaderMessage] = useState("Finding the best people for you...");
  const [loaderProgress, setLoaderProgress] = useState(0);

  // Mock list of popular skills
  const popularSkills = [
    "AI", "React", "Python", "Public Speaking", "Photography", 
    "Video Editing", "UI UX", "Graphic Design", "Music", 
    "Fitness", "Languages", "Cooking", "Marketing", "Finance", "Business"
  ];

  // Learning styles list
  const learningStyles = [
    "Live Video Calls", "Chat", "Voice Calls", "Projects", 
    "Assignments", "Weekly Sessions", "Weekend Sessions", "Flexible"
  ];

  // Day options
  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // Time ranges
  const timesList = ["Morning", "Afternoon", "Evening", "Weekend"];

  useEffect(() => {
    // Attempt to load current user name
    if (typeof window !== "undefined") {
      const currentId = store.getCurrentUserId();
      const profiles = store.getProfiles();
      const currentProfile = profiles.find(p => p.userId === currentId);
      if (currentProfile) {
        setUserName(currentProfile.displayName.split(" ")[0]);
      }
    }
  }, []);

  // Step 9: Simulate loading matching algorithms
  useEffect(() => {
    if (step === 9) {
      const messages = [
        "Analyzing your learning goals...",
        "Evaluating teaching experience & skills...",
        "Matching calendar availability...",
        "Aligning language and timezones...",
        "Running AI compatibility score weights...",
        "Structuring personalized match cards..."
      ];
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setLoaderProgress(progress);
        
        const msgIdx = Math.min(Math.floor(progress / 18), messages.length - 1);
        setLoaderMessage(messages[msgIdx]);

        if (progress >= 100) {
          clearInterval(interval);
          setStep(10);
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Skill Add helpers
  const handleToggleLearnSkill = (skill: string) => {
    if (selectedLearnSkills.includes(skill)) {
      setSelectedLearnSkills(selectedLearnSkills.filter(s => s !== skill));
    } else {
      setSelectedLearnSkills([...selectedLearnSkills, skill]);
      // Initialize defaults
      setLearnDetails(prev => ({
        ...prev,
        [skill]: { level: "Beginner", goal: "Personal Growth", timeline: "3 Months" }
      }));
    }
  };

  const handleToggleTeachSkill = (skill: string) => {
    if (selectedTeachSkills.includes(skill)) {
      setSelectedTeachSkills(selectedTeachSkills.filter(s => s !== skill));
    } else {
      setSelectedTeachSkills([...selectedTeachSkills, skill]);
      // Initialize defaults
      setTeachDetails(prev => ({
        ...prev,
        [skill]: { yoe: "1-3 years", level: "Intermediate", exp: "Yes", portfolio: "", availability: "3-5 hrs/week", language: "English" }
      }));
    }
  };

  const handleToggleStyle = (styleName: string) => {
    if (selectedStyles.includes(styleName)) {
      setSelectedStyles(selectedStyles.filter(s => s !== styleName));
    } else {
      setSelectedStyles([...selectedStyles, styleName]);
    }
  };

  const handleFinishOnboarding = () => {
    // Save details to mock profiles store
    const currentId = store.getCurrentUserId();
    const profiles = store.getProfiles();
    
    const userProfileIdx = profiles.findIndex(p => p.userId === currentId);
    if (userProfileIdx !== -1) {
      const updated = {
        ...profiles[userProfileIdx],
        bio: bio || `Hi! I'm here to ${purpose.toLowerCase()}. I want to learn ${selectedLearnSkills.join(", ")} and teach ${selectedTeachSkills.join(", ")}!`,
        location: location,
        languages: ["English"],
        xpPoints: 100, // Award +100 XP
        level: 1,
        achievements: ["Signed Up", "Onboarding Complete"],
        badges: [{ name: "Beginner Badge", icon: "Award" }] // Award Beginner Badge
      };
      profiles[userProfileIdx] = updated;
      localStorage.setItem("skillswap_profiles", JSON.stringify(profiles));
    }
    
    router.push("/dashboard?tab=Matches");
  };

  // Progress Bar percentage
  const totalSteps = 8;
  const progressPercent = Math.min(((step - 1) / totalSteps) * 100, 100);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#000000] text-white font-sans antialiased relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0369a1]/10 blur-[120px] -z-10" />

      {/* Progress Header */}
      {step <= 8 && (
        <div className="w-full pt-6 px-8 max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#94A3B8]">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>SkillSwap Personalization</span>
            </span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full bg-[#1E293B]/60 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Form content frame */}
      <main className="flex-grow flex items-center justify-center p-6 z-10">
        
        {/* ================== STEP 1: WELCOME SCREEN ================== */}
        {step === 1 && (
          <div className="max-w-md w-full p-8 rounded-2xl border border-[#1E293B]/60 bg-[#0b101b]/60 backdrop-blur-md text-center space-y-6 animate-in fade-in duration-300">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-[#3b82f6] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                A
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-3xl">Welcome, {userName} 👋</h2>
              <p className="text-sm text-[#94A3B8]">
                Let's personalize your SkillSwap experience. <br />
                This only takes about 2 minutes.
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#0082F6] hover:bg-[#0072de] text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-md shadow-blue-500/10"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================== STEP 2: PURPOSE SELECTION ================== */}
        {step === 2 && (
          <div className="max-w-md w-full space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="font-display font-extrabold text-2xl">What brings you to SkillSwap today?</h2>
              <p className="text-xs text-[#94A3B8]">Select the option that matches your goals.</p>
            </div>
            
            <div className="space-y-3">
              {[
                { key: "LEARN", title: "📚 Learn New Skills", desc: "I want to exchange my knowledge for new capabilities." },
                { key: "TEACH", title: "🎓 Teach My Skills", desc: "I want to share my knowledge with eager peers." },
                { key: "BOTH", title: "🔄 Both Learn & Teach", desc: "I want to barters and swap both learning and teaching skills." }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setPurpose(opt.key)}
                  className={`w-full p-4 text-left rounded-xl border transition ${
                    purpose === opt.key 
                      ? "border-[#3b82f6] bg-[#3b82f6]/10" 
                      : "border-[#1E293B] bg-[#070b13]/60 hover:bg-white/5"
                  }`}
                >
                  <h4 className="font-bold text-sm text-white">{opt.title}</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!purpose}
              className="w-full py-3.5 bg-[#0082F6] hover:bg-[#0072de] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================== STEP 3: WHAT DO YOU WANT TO LEARN? ================== */}
        {step === 3 && (
          <div className="max-w-2xl w-full space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="font-display font-extrabold text-2xl">What do you want to learn?</h2>
              <p className="text-xs text-[#94A3B8]">Select one or more skills you want to gain.</p>
            </div>

            {/* Popular Chips */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {popularSkills.map(skill => {
                const isSelected = selectedLearnSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => handleToggleLearnSkill(skill)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-full border transition ${
                      isSelected 
                        ? "bg-[#3b82f6] border-transparent text-white" 
                        : "border-[#1e293b] text-[#94A3B8] hover:text-white bg-black/45"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Form details for each selected skill */}
            {selectedLearnSkills.length > 0 && (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 border-t border-[#1e293b]/60 pt-4">
                <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide">Configure Skill Details</span>
                {selectedLearnSkills.map(skill => (
                  <div key={skill} className="p-4 rounded-xl border border-[#1e293b]/60 bg-[#070b13]/60 space-y-3.5">
                    <span className="font-bold text-xs text-white">{skill}</span>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-1">Level</label>
                        <select 
                          className="w-full p-2 bg-black border border-[#1e293b] rounded-lg text-[10px] text-white"
                          value={learnDetails[skill]?.level || "Beginner"}
                          onChange={(e) => setLearnDetails(prev => ({
                            ...prev,
                            [skill]: { ...prev[skill], level: e.target.value }
                          }))}
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-1">Goal</label>
                        <select 
                          className="w-full p-2 bg-black border border-[#1e293b] rounded-lg text-[10px] text-white"
                          value={learnDetails[skill]?.goal || "Personal Growth"}
                          onChange={(e) => setLearnDetails(prev => ({
                            ...prev,
                            [skill]: { ...prev[skill], goal: e.target.value }
                          }))}
                        >
                          <option>Career</option>
                          <option>Freelancing</option>
                          <option>College</option>
                          <option>Personal Growth</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-1">Timeline</label>
                        <select 
                          className="w-full p-2 bg-black border border-[#1e293b] rounded-lg text-[10px] text-white"
                          value={learnDetails[skill]?.timeline || "3 Months"}
                          onChange={(e) => setLearnDetails(prev => ({
                            ...prev,
                            [skill]: { ...prev[skill], timeline: e.target.value }
                          }))}
                        >
                          <option>1 Month</option>
                          <option>3 Months</option>
                          <option>6 Months</option>
                          <option>No Deadline</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setStep(4)}
              disabled={selectedLearnSkills.length === 0}
              className="w-full py-3.5 bg-[#0082F6] hover:bg-[#0072de] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================== STEP 4: WHAT CAN YOU TEACH? ================== */}
        {step === 4 && (
          <div className="max-w-2xl w-full space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="font-display font-extrabold text-2xl">What skills are you confident teaching?</h2>
              <p className="text-xs text-[#94A3B8]">Select the skills you can offer to others.</p>
            </div>

            {/* Popular Chips */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {popularSkills.map(skill => {
                const isSelected = selectedTeachSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => handleToggleTeachSkill(skill)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-full border transition ${
                      isSelected 
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-transparent text-white" 
                        : "border-[#1e293b] text-[#94A3B8] hover:text-white bg-black/45"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Teaching Details for each skill */}
            {selectedTeachSkills.length > 0 && (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 border-t border-[#1e293b]/60 pt-4">
                <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wide">Configure Teaching Specs</span>
                {selectedTeachSkills.map(skill => (
                  <div key={skill} className="p-4 rounded-xl border border-[#1e293b]/60 bg-[#070b13]/60 space-y-3.5">
                    <span className="font-bold text-xs text-white">{skill}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-1">Years of Experience</label>
                        <select 
                          className="w-full p-2 bg-black border border-[#1e293b] rounded-lg text-[10px] text-white"
                          value={teachDetails[skill]?.yoe || "1-3 years"}
                          onChange={(e) => setTeachDetails(prev => ({
                            ...prev,
                            [skill]: { ...prev[skill], yoe: e.target.value }
                          }))}
                        >
                          <option>0-1 years</option>
                          <option>1-3 years</option>
                          <option>3-5 years</option>
                          <option>5+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-1">Skill Level</label>
                        <select 
                          className="w-full p-2 bg-black border border-[#1e293b] rounded-lg text-[10px] text-white"
                          value={teachDetails[skill]?.level || "Intermediate"}
                          onChange={(e) => setTeachDetails(prev => ({
                            ...prev,
                            [skill]: { ...prev[skill], level: e.target.value }
                          }))}
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>Expert</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-1">Teaching Language</label>
                        <input 
                          type="text" 
                          className="w-full p-2 bg-black border border-[#1e293b] rounded-lg text-[10px] text-white"
                          value={teachDetails[skill]?.language || "English"}
                          onChange={(e) => setTeachDetails(prev => ({
                            ...prev,
                            [skill]: { ...prev[skill], language: e.target.value }
                          }))}
                          placeholder="e.g. English, Hindi"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-[#475569] uppercase tracking-wider mb-1">Portfolio (Optional)</label>
                        <input 
                          type="url" 
                          className="w-full p-2 bg-black border border-[#1e293b] rounded-lg text-[10px] text-white"
                          value={teachDetails[skill]?.portfolio || ""}
                          onChange={(e) => setTeachDetails(prev => ({
                            ...prev,
                            [skill]: { ...prev[skill], portfolio: e.target.value }
                          }))}
                          placeholder="Link to your work"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setStep(5)}
              disabled={selectedTeachSkills.length === 0}
              className="w-full py-3.5 bg-[#0082F6] hover:bg-[#0072de] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================== STEP 5: PREFERRED LEARNING STYLE ================== */}
        {step === 5 && (
          <div className="max-w-md w-full space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="font-display font-extrabold text-2xl">How do you prefer learning?</h2>
              <p className="text-xs text-[#94A3B8]">Select all styles that fit you.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {learningStyles.map(style => {
                const isSelected = selectedStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => handleToggleStyle(style)}
                    className={`p-4 rounded-xl border text-left transition ${
                      isSelected 
                        ? "border-[#3b82f6] bg-[#3b82f6]/10" 
                        : "border-[#1E293B] bg-[#070b13]/60 hover:bg-white/5"
                    }`}
                  >
                    <span className="font-bold text-xs text-white block">{style}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(6)}
              className="w-full py-3.5 bg-[#0082F6] hover:bg-[#0072de] text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================== STEP 6: AVAILABILITY ================== */}
        {step === 6 && (
          <div className="max-w-md w-full space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="font-display font-extrabold text-2xl">Your Availability</h2>
              <p className="text-xs text-[#94A3B8]">When are you usually free for sessions?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">Timezone</label>
                <select 
                  className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-white"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option>IST (UTC+5:30)</option>
                  <option>EST (UTC-5:00)</option>
                  <option>GMT (UTC+0:00)</option>
                  <option>PST (UTC-8:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">Days of Week</label>
                <div className="flex flex-wrap gap-2">
                  {daysList.map(day => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() => {
                          if (isSelected) setSelectedDays(selectedDays.filter(d => d !== day));
                          else setSelectedDays([...selectedDays, day]);
                        }}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition ${
                          isSelected 
                            ? "bg-[#3b82f6] border-transparent text-white" 
                            : "border-[#1e293b] text-[#94A3B8]"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-2">Preferred Times</label>
                <div className="grid grid-cols-2 gap-2">
                  {timesList.map(time => {
                    const isSelected = selectedTimes.includes(time);
                    return (
                      <button
                        key={time}
                        onClick={() => {
                          if (isSelected) setSelectedTimes(selectedTimes.filter(t => t !== time));
                          else setSelectedTimes([...selectedTimes, time]);
                        }}
                        className={`p-3 text-[10px] font-bold rounded-xl border text-center transition ${
                          isSelected 
                            ? "bg-[#3b82f6] border-transparent text-white" 
                            : "border-[#1e293b] text-[#94A3B8]"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(7)}
              className="w-full py-3.5 bg-[#0082F6] hover:bg-[#0072de] text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================== STEP 7: PROFILE CREATION ================== */}
        {step === 7 && (
          <div className="max-w-md w-full space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="font-display font-extrabold text-2xl">Complete Your Profile</h2>
              <p className="text-xs text-[#94A3B8]">Tell us a little more about yourself.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Profile Headline</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-white focus:outline-none focus:border-[#3b82f6]"
                  placeholder="e.g. React Developer passionate about Web Architecture"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Short Bio</label>
                <textarea 
                  rows={3}
                  className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-white focus:outline-none focus:border-[#3b82f6] resize-none"
                  placeholder="Describe your background and what you hope to achieve."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Location</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-white focus:outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#475569] uppercase tracking-wider mb-1.5">Occupation</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-black border border-[#1e293b] rounded-xl text-xs text-white focus:outline-none"
                    placeholder="e.g. Student, Engineer"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(8)}
              className="w-full py-3.5 bg-[#0082F6] hover:bg-[#0072de] text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================== STEP 8: AI MATCH PREFERENCES ================== */}
        {step === 8 && (
          <div className="max-w-md w-full space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="font-display font-extrabold text-2xl">AI Match Preferences</h2>
              <p className="text-xs text-[#94A3B8]">How should we filter your compatible partners?</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 border border-[#1e293b]/60 rounded-xl bg-[#070b13]/60">
                <div>
                  <span className="font-bold text-xs text-white block">Remote Swap Only</span>
                  <span className="text-[10px] text-[#475569]">Connect exclusively over video call rooms.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={remoteOnly} 
                  onChange={(e) => setRemoteOnly(e.target.checked)} 
                  className="w-4 h-4 text-blue-500 bg-black rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-[#1e293b]/60 rounded-xl bg-[#070b13]/60">
                <div>
                  <span className="font-bold text-xs text-white block">Same Native Language</span>
                  <span className="text-[10px] text-[#475569]">Prioritize users speaking English.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={sameLanguage} 
                  onChange={(e) => setSameLanguage(e.target.checked)} 
                  className="w-4 h-4 text-blue-500 bg-black rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-[#1e293b]/60 rounded-xl bg-[#070b13]/60">
                <div>
                  <span className="font-bold text-xs text-white block">Verified Profiles Only</span>
                  <span className="text-[10px] text-[#475569]">Show users with identity verified checks.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={verifiedOnly} 
                  onChange={(e) => setVerifiedOnly(e.target.checked)} 
                  className="w-4 h-4 text-blue-500 bg-black rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 border border-[#1e293b]/60 rounded-xl bg-[#070b13]/60">
                <div>
                  <span className="font-bold text-xs text-white block">Highest Rated First</span>
                  <span className="text-[10px] text-[#475569]">Sort matching partners by average reviews.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={highestRated} 
                  onChange={(e) => setHighestRated(e.target.checked)} 
                  className="w-4 h-4 text-blue-500 bg-black rounded"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(9)}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-lg shadow-indigo-500/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Matches</span>
            </button>
          </div>
        )}

        {/* ================== STEP 9: GENERATING MATCHES LOADER ================== */}
        {step === 9 && (
          <div className="max-w-md w-full text-center space-y-6 animate-in fade-in duration-300">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
              <div className="w-16 h-16 rounded-full border-2 border-indigo-400/40 flex items-center justify-center">
                <div className="absolute w-12 h-12 rounded-full border border-blue-400/60 border-dashed animate-spin-slow" />
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">Generating matches...</h3>
              <p className="text-xs text-[#94A3B8] h-4 transition duration-200">{loaderMessage}</p>
            </div>

            <div className="w-full bg-[#1E293B]/60 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#3b82f6] h-full rounded-full transition-all duration-300"
                style={{ width: `${loaderProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* ================== STEP 10: MATCH RESULTS SCREEN ================== */}
        {step === 10 && (
          <div className="max-w-4xl w-full space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <span className="px-3.5 py-1.5 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                🏆 Onboarding Complete +100 XP
              </span>
              <h2 className="font-display font-extrabold text-3xl text-white">Your Personalized Matches</h2>
              <p className="text-xs text-[#94A3B8]">
                Based on your profile, goals, and availability overlap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Bhavana", match: "94%", teaches: "UI/UX Design, Figma", wants: "Graphic Design", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Bhavana", reason: "Teaches UI/UX & Available Weekends" },
                { name: "Lomrani", match: "91%", teaches: "Python, Next.js", wants: "Public Speaking", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Lomrani", reason: "Double Match & English speaker" }
              ].map((m, i) => (
                <div key={i} className="p-5 rounded-2xl border border-[#1e293b]/60 bg-[#070b13]/60 backdrop-blur-md flex flex-col justify-between h-[230px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full border border-white/10" />
                        <div>
                          <h4 className="font-bold text-sm text-white">{m.name}</h4>
                          <span className="text-[9px] text-[#475569]">{m.reason}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-500/10 text-[#3b82f6] text-[10px] font-bold rounded-full">
                        {m.match} Match
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p className="text-[#94A3B8] leading-tight">
                        <span className="text-[9px] font-bold text-[#475569] uppercase block">Teaches:</span> {m.teaches}
                      </p>
                      <p className="text-[#94A3B8] leading-tight">
                        <span className="text-[9px] font-bold text-[#475569] uppercase block">Wants:</span> {m.wants}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#1e293b]/60 pt-3 flex space-x-2">
                    <button className="flex-grow py-2 bg-[#3b82f6] hover:bg-blue-600 text-white text-[10px] font-bold rounded-full transition">
                      Send Swap Request
                    </button>
                    <button className="px-4 py-2 border border-[#1e293b] hover:border-white/20 text-[#94A3B8] hover:text-white text-[10px] font-bold rounded-full transition">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleFinishOnboarding}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow-lg shadow-blue-500/15"
              >
                <span>Proceed to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer Branding */}
      <footer className="py-6 border-t border-[#1e293b]/40 text-center text-[10px] text-[#475569] font-mono">
        SkillSwap Onboarding Engine • Secure & Encrypted
      </footer>

    </div>
  );
}
