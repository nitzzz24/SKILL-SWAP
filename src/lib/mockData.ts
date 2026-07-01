export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  experience: "Beginner" | "Intermediate" | "Expert";
  durationWeeks: number;
  teachingStyle: string;
  requirements: string;
  categoryId: string;
  offeredByUserId: string;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  role: "USER" | "VERIFIED_MENTOR" | "PREMIUM" | "MODERATOR" | "ADMIN";
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  location: string;
  languages: string[];
  availability: {
    [key: string]: string[]; // e.g. "Monday": ["10:00 - 11:00", "14:00 - 15:00"]
  };
  skillsOfferedIds: string[];
  skillsWantedIds: string[];
  rating: number;
  xpPoints: number;
  level: number;
  streakDays: number;
  lastActiveAt: string;
  reviews: Review[];
  achievements: string[]; // Achievement titles
  badges: { name: string; icon: string }[];
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  content: string;
  isVerified: boolean;
  createdAt: string;
}

export interface SwapRequest {
  id: string;
  senderId: string;
  receiverId: string;
  offeredSkillId: string;
  wantedSkillId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED";
  notes: string;
  scheduledAt?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  fileUrl?: string;
  fileType?: "IMAGE" | "FILE" | "VOICE";
  seen: boolean;
  createdAt: string;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Programming", slug: "programming", description: "Learn coding, web dev, mobile apps, and systems" },
  { id: "cat-2", name: "Artificial Intelligence", slug: "ai", description: "Deep dive into LLMs, prompt engineering, and ML" },
  { id: "cat-3", name: "UI/UX Design", slug: "ui-ux", description: "Design beautiful interfaces and fluid user journeys" },
  { id: "cat-4", name: "Photography & Video", slug: "photography-video", description: "Master cameras, lighting, and Adobe Premiere/DaVinci" },
  { id: "cat-5", name: "Language Learning", slug: "languages", description: "Learn Hindi, English, Spanish, Japanese, and more" },
  { id: "cat-6", name: "Fitness & Wellness", slug: "fitness", description: "Yoga, powerlifting, nutrition, and mental health coaching" },
  { id: "cat-7", name: "Music & Art", slug: "music-art", description: "Guitar, piano, digital painting, and sketching" },
  { id: "cat-8", name: "Business & Career", slug: "business-career", description: "Public speaking, pitch decks, interview prep, and growth marketing" }
];

export const INITIAL_SKILLS: Skill[] = [
  {
    id: "skill-1",
    title: "Next.js & React Mastery",
    description: "Hands-on guidance building modern web apps with App Router, SSR, Server Actions, and Tailwind CSS.",
    experience: "Expert",
    durationWeeks: 4,
    teachingStyle: "Practical project building with screen-share code pairing sessions.",
    requirements: "Basic JavaScript knowledge.",
    categoryId: "cat-1",
    offeredByUserId: "user-2"
  },
  {
    id: "skill-2",
    title: "Figma UI Design & Component Libraries",
    description: "Creating responsive web layouts, design tokens, auto-layout, and interactive prototyping in Figma.",
    experience: "Expert",
    durationWeeks: 6,
    teachingStyle: "Weekly visual challenges, prototype reviews, and portfolio teardowns.",
    requirements: "A free Figma account.",
    categoryId: "cat-3",
    offeredByUserId: "user-3"
  },
  {
    id: "skill-3",
    title: "Conversational Spanish",
    description: "Learn to speak Spanish fluently for traveling or professional careers with interactive daily conversations.",
    experience: "Intermediate",
    durationWeeks: 8,
    teachingStyle: "Role-plays, listening practice, and direct conversational feedback.",
    requirements: "None, suitable for absolute beginners.",
    categoryId: "cat-5",
    offeredByUserId: "user-4"
  },
  {
    id: "skill-4",
    title: "Weightlifting Form & Nutrition Guide",
    description: "Perfecting squat, bench, and deadlift form while structuring personalized macronutrient diet plans.",
    experience: "Expert",
    durationWeeks: 5,
    teachingStyle: "Video submission form analysis and monthly macro coaching.",
    requirements: "Access to a basic gym.",
    categoryId: "cat-6",
    offeredByUserId: "user-5"
  },
  {
    id: "skill-5",
    title: "Acoustic Guitar Fingerpicking",
    description: "Learn essential fingerstyle techniques, classic chord structures, and read tabs fast.",
    experience: "Intermediate",
    durationWeeks: 4,
    teachingStyle: "Step-by-step video practice and play-along exercises.",
    requirements: "An acoustic or electric guitar.",
    categoryId: "cat-7",
    offeredByUserId: "user-6"
  }
];

export const INITIAL_PROFILES: UserProfile[] = [
  {
    userId: "user-1",
    displayName: "Aarav Sharma",
    email: "aarav@skillswap.in",
    role: "ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    bio: "Full Stack Engineer & Tech enthusiast. Teaching React/Next.js. Looking to learn Spanish and Graphic Design.",
    location: "Bengaluru, India",
    languages: ["English", "Hindi", "Kannada"],
    availability: {
      "Saturday": ["10:00 - 12:00", "15:00 - 17:00"],
      "Sunday": ["14:00 - 16:00"]
    },
    skillsOfferedIds: ["skill-1"],
    skillsWantedIds: ["skill-2", "skill-3"],
    rating: 4.9,
    xpPoints: 1250,
    level: 5,
    streakDays: 14,
    lastActiveAt: new Date().toISOString(),
    reviews: [
      { id: "r-1", reviewerName: "Rohan Das", reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80", rating: 5, content: "Aarav is an incredible mentor! He walked me through App Router and React Server Actions step-by-step.", isVerified: true, createdAt: "2026-06-25T10:00:00Z" }
    ],
    achievements: ["Super Mentor", "First Swap Complete", "10+ Streak"],
    badges: [{ name: "Verified Teacher", icon: "CheckCircle" }, { name: "Pro Swapper", icon: "Award" }]
  },
  {
    userId: "user-2",
    displayName: "Priya Nair",
    email: "priya@skillswap.in",
    role: "VERIFIED_MENTOR",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    coverUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    bio: "Senior Product Designer. Passionate about interactive prototypes and pixel-perfect design systems.",
    location: "Mumbai, India",
    languages: ["English", "Malayalam", "Hindi"],
    availability: {
      "Monday": ["19:00 - 21:00"],
      "Wednesday": ["19:00 - 21:00"]
    },
    skillsOfferedIds: ["skill-2"],
    skillsWantedIds: ["skill-1"],
    rating: 4.8,
    xpPoints: 980,
    level: 4,
    streakDays: 8,
    lastActiveAt: new Date().toISOString(),
    reviews: [
      { id: "r-2", reviewerName: "Ananya Roy", reviewerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", rating: 5, content: "Priya helped me redesign my portfolio. She explained auto-layouts so clearly!", isVerified: true, createdAt: "2026-06-27T12:00:00Z" }
    ],
    achievements: ["Top Rated", "Design Guru"],
    badges: [{ name: "Verified Creator", icon: "ShieldAlert" }]
  },
  {
    userId: "user-3",
    displayName: "Carlos Mendez",
    email: "carlos@skillswap.in",
    role: "USER",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    coverUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    bio: "Native Spanish Teacher from Madrid, living in Delhi. Love exchanging languages for tech coding tips.",
    location: "New Delhi, India",
    languages: ["Spanish", "English"],
    availability: {
      "Tuesday": ["15:00 - 17:00"],
      "Thursday": ["15:00 - 17:00"]
    },
    skillsOfferedIds: ["skill-3"],
    skillsWantedIds: ["skill-1", "skill-5"],
    rating: 4.7,
    xpPoints: 450,
    level: 2,
    streakDays: 3,
    lastActiveAt: new Date().toISOString(),
    reviews: [],
    achievements: ["Polyglot"],
    badges: []
  }
];
