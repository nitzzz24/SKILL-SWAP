import { 
  INITIAL_CATEGORIES, 
  INITIAL_SKILLS, 
  INITIAL_PROFILES, 
  Category, 
  Skill, 
  UserProfile, 
  SwapRequest, 
  Message 
} from "./mockData";

export type { Category, Skill, UserProfile, SwapRequest, Message };

const STORAGE_KEYS = {
  CATEGORIES: "skillswap_categories",
  SKILLS: "skillswap_skills",
  PROFILES: "skillswap_profiles",
  SWAP_REQUESTS: "skillswap_requests",
  MESSAGES: "skillswap_messages",
  CURRENT_USER_ID: "skillswap_current_user_id"
};

// Initialize localStorage with mock data if empty
export function initializeStore() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(INITIAL_SKILLS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROFILES)) {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(INITIAL_PROFILES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SWAP_REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.SWAP_REQUESTS, JSON.stringify([
      {
        id: "req-1",
        senderId: "user-3",
        receiverId: "user-1",
        offeredSkillId: "skill-3",
        wantedSkillId: "skill-1",
        status: "PENDING",
        notes: "Hey Aarav, I would love to teach you Spanish in exchange for learning how Next.js Server Actions work!",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([
      {
        id: "msg-1",
        chatId: "chat-user-3-user-1",
        senderId: "user-3",
        content: "Hi Aarav! Hope you got my swap request.",
        seen: true,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "msg-2",
        chatId: "chat-user-3-user-1",
        senderId: "user-1",
        content: "Hey Carlos! Yes, I saw it. I'm definitely interested. When are you free to chat?",
        seen: true,
        createdAt: new Date(Date.now() - 1800000).toISOString()
      }
    ]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, "user-1"); // Default logged in user (Aarav)
  }
}

// Get data from store
export function getFromStorage<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
}

export function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Store Accessors
export const store = {
  getCategories: (): Category[] => getFromStorage<Category>(STORAGE_KEYS.CATEGORIES),
  
  getSkills: (): Skill[] => getFromStorage<Skill>(STORAGE_KEYS.SKILLS),
  
  getProfiles: (): UserProfile[] => getFromStorage<UserProfile>(STORAGE_KEYS.PROFILES),
  
  getSwapRequests: (): SwapRequest[] => getFromStorage<SwapRequest>(STORAGE_KEYS.SWAP_REQUESTS),
  
  getMessages: (): Message[] => getFromStorage<Message>(STORAGE_KEYS.MESSAGES),
  
  getCurrentUserId: (): string => {
    if (typeof window === "undefined") return "user-1";
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || "user-1";
  },

  setCurrentUserId: (id: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, id);
    window.dispatchEvent(new Event("storage-update"));
  },

  getCurrentUser: (): UserProfile | null => {
    const currentId = store.getCurrentUserId();
    const profiles = store.getProfiles();
    return profiles.find(p => p.userId === currentId) || null;
  },

  addSkill: (skill: Skill) => {
    const skills = store.getSkills();
    skills.push(skill);
    saveToStorage(STORAGE_KEYS.SKILLS, skills);
    
    // Associate with profile
    const profiles = store.getProfiles();
    const profile = profiles.find(p => p.userId === skill.offeredByUserId);
    if (profile) {
      profile.skillsOfferedIds.push(skill.id);
      saveToStorage(STORAGE_KEYS.PROFILES, profiles);
    }
    window.dispatchEvent(new Event("storage-update"));
  },

  updateProfile: (updated: UserProfile) => {
    const profiles = store.getProfiles();
    const index = profiles.findIndex(p => p.userId === updated.userId);
    if (index !== -1) {
      profiles[index] = updated;
      saveToStorage(STORAGE_KEYS.PROFILES, profiles);
      window.dispatchEvent(new Event("storage-update"));
    }
  },

  createSwapRequest: (request: Omit<SwapRequest, "id" | "createdAt">) => {
    const requests = store.getSwapRequests();
    const newRequest: SwapRequest = {
      ...request,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    saveToStorage(STORAGE_KEYS.SWAP_REQUESTS, requests);
    
    // Add custom notification for receiver
    store.addNotification(
      request.receiverId,
      "New Swap Request",
      `You received a new swap request from ${store.getProfile(request.senderId)?.displayName || 'someone'}.`,
      "SWAP_REQUEST"
    );
    
    window.dispatchEvent(new Event("storage-update"));
    return newRequest;
  },

  updateSwapRequestStatus: (id: string, status: SwapRequest["status"], scheduledAt?: string) => {
    const requests = store.getSwapRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index].status = status;
      if (scheduledAt) {
        requests[index].scheduledAt = scheduledAt;
      }
      saveToStorage(STORAGE_KEYS.SWAP_REQUESTS, requests);

      const req = requests[index];
      // Notify sender
      store.addNotification(
        req.senderId,
        `Swap Request ${status}`,
        `Your swap request has been ${status.toLowerCase()} by ${store.getProfile(req.receiverId)?.displayName || 'the partner'}.`,
        "SWAP_REQUEST"
      );

      // Reward XP if completed
      if (status === "COMPLETED") {
        store.rewardXp(req.senderId, 100);
        store.rewardXp(req.receiverId, 100);
      }

      window.dispatchEvent(new Event("storage-update"));
    }
  },

  rewardXp: (userId: string, xp: number) => {
    const profiles = store.getProfiles();
    const profile = profiles.find(p => p.userId === userId);
    if (profile) {
      profile.xpPoints += xp;
      // Recalculate level (e.g. 200 XP per level)
      profile.level = Math.floor(profile.xpPoints / 200) + 1;
      
      // Award achievements if thresholds are met
      if (profile.xpPoints >= 1000 && !profile.achievements.includes("Super Swapper")) {
        profile.achievements.push("Super Swapper");
        profile.badges.push({ name: "Gold Star", icon: "Award" });
      }

      saveToStorage(STORAGE_KEYS.PROFILES, profiles);
    }
  },

  getProfile: (userId: string): UserProfile | undefined => {
    return store.getProfiles().find(p => p.userId === userId);
  },

  getNotifications: (userId: string) => {
    if (typeof window === "undefined") return [];
    const key = `skillswap_notifications_${userId}`;
    return JSON.parse(localStorage.getItem(key) || "[]");
  },

  addNotification: (userId: string, title: string, content: string, type: string) => {
    if (typeof window === "undefined") return;
    const key = `skillswap_notifications_${userId}`;
    const notifications = JSON.parse(localStorage.getItem(key) || "[]");
    notifications.unshift({
      id: `notif-${Date.now()}`,
      title,
      content,
      type,
      read: false,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(notifications));
    window.dispatchEvent(new Event("storage-update"));
  },

  markNotificationsRead: (userId: string) => {
    if (typeof window === "undefined") return;
    const key = `skillswap_notifications_${userId}`;
    const notifications = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = notifications.map((n: any) => ({ ...n, read: true }));
    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage-update"));
  },

  sendMessage: (chatId: string, senderId: string, content: string) => {
    const messages = store.getMessages();
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      senderId,
      content,
      seen: false,
      createdAt: new Date().toISOString()
    };
    messages.push(newMsg);
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
    window.dispatchEvent(new Event("storage-update"));
    return newMsg;
  }
};
