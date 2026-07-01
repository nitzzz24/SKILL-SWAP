"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { store, Message, UserProfile } from "@/lib/store";
import { 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Smile, 
  MoreVertical, 
  CheckCheck,
  Circle
} from "lucide-react";

export default function MessagesPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activePartnerId, setActivePartnerId] = useState<string>("");
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChatData = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);
      const allProfiles = store.getProfiles();
      setProfiles(allProfiles);
      setMessages(store.getMessages());

      // Auto-select first other user if none selected
      if (user && !activePartnerId) {
        const other = allProfiles.find(p => p.userId !== user.userId);
        if (other) {
          setActivePartnerId(other.userId);
        }
      }
    };

    loadChatData();
    window.addEventListener("storage-update", loadChatData);
    return () => window.removeEventListener("storage-update", loadChatData);
  }, [activePartnerId]);

  useEffect(() => {
    // Scroll to bottom when messages list updates
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activePartnerId]);

  const activePartner = profiles.find(p => p.userId === activePartnerId);

  // Generate Chat ID
  const getChatId = (u1: string, u2: string) => {
    return u1 < u2 ? `chat-${u1}-${u2}` : `chat-${u2}-${u1}`;
  };

  const currentChatId = currentUser && activePartner ? getChatId(currentUser.userId, activePartner.userId) : "";

  // Filter messages for current chat
  const chatMessages = messages.filter(m => m.chatId === currentChatId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !currentUser || !activePartner || !currentChatId) return;

    // Send original message
    store.sendMessage(currentChatId, currentUser.userId, inputVal);
    setInputVal("");

    // Simulate dummy receiver automated reply in 2 seconds
    setTimeout(() => {
      if (activePartner && currentChatId) {
        const replies = [
          "Awesome, that works for me! Let's schedule it.",
          "Perfect. Let's do Saturdays at 10 AM, how is that?",
          "Sure thing! I am looking forward to our swap session.",
          "I will check my schedule and get back to you by tonight."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        store.sendMessage(currentChatId, activePartner.userId, randomReply);
      }
    }, 2000);
  };

  // Get other users to chat with
  const chatPartners = profiles.filter(p => p.userId !== currentUser?.userId);

  // Find last message for thread preview
  const getLastMessage = (partnerId: string) => {
    if (!currentUser) return null;
    const cid = getChatId(currentUser.userId, partnerId);
    const msgs = messages.filter(m => m.chatId === cid);
    return msgs[msgs.length - 1];
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden transition-all duration-300">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        <div className="flex-1 flex bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Threads Sidebar (Left) */}
          <div className="w-full sm:w-80 border-r border-border flex flex-col bg-foreground/[0.01]">
            <div className="p-4 border-b border-border">
              <h1 className="font-display font-bold text-lg">Conversations</h1>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-border/40">
              {chatPartners.map((partner) => {
                const isActive = partner.userId === activePartnerId;
                const lastMsg = getLastMessage(partner.userId);
                return (
                  <button
                    key={partner.userId}
                    onClick={() => setActivePartnerId(partner.userId)}
                    className={`w-full flex items-center space-x-3 p-4 text-left transition ${
                      isActive ? "bg-primary/5 border-l-4 border-primary" : "hover:bg-foreground/5"
                    }`}
                  >
                    <div className="relative">
                      <img src={partner.avatarUrl} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-foreground/80 truncate">{partner.displayName}</span>
                        <span className="text-[10px] text-foreground/40 font-semibold">
                          {lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/60 truncate mt-1">
                        {lastMsg ? lastMsg.content : "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chat Section (Right) */}
          <div className="flex-1 flex flex-col h-full bg-card">
            {activePartner ? (
              <>
                {/* Chat Partner Header */}
                <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-foreground/[0.01]">
                  <div className="flex items-center space-x-3">
                    <img src={activePartner.avatarUrl} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <span className="text-sm font-bold text-foreground/80 block">{activePartner.displayName}</span>
                      <span className="text-[10px] text-green-500 font-semibold flex items-center mt-0.5">
                        <Circle className="h-2 w-2 fill-green-500 mr-1 text-green-500" />
                        <span>Online</span>
                      </span>
                    </div>
                  </div>
                  <button className="text-foreground/50 hover:text-foreground p-1">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg) => {
                    const isMe = msg.senderId === currentUser?.userId;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] p-3.5 rounded-2xl text-sm ${
                          isMe 
                            ? "bg-primary text-white rounded-br-none shadow-sm" 
                            : "bg-foreground/5 text-foreground rounded-bl-none"
                        }`}>
                          <p className="leading-relaxed">{msg.content}</p>
                          <div className="flex justify-end items-center space-x-1 mt-1.5 text-[9px] opacity-70">
                            <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {isMe && <CheckCheck className="h-3.5 w-3.5 text-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-foreground/[0.01]">
                  <div className="flex items-center bg-background border border-border rounded-xl px-3 py-2">
                    <button type="button" className="p-2 text-foreground/50 hover:text-foreground">
                      <ImageIcon className="h-5 w-5" />
                    </button>
                    <button type="button" className="p-2 text-foreground/50 hover:text-foreground">
                      <Mic className="h-5 w-5" />
                    </button>
                    
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 mx-2 bg-transparent text-sm focus:outline-none text-foreground"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                    />

                    <button type="button" className="p-2 text-foreground/50 hover:text-foreground">
                      <Smile className="h-5 w-5" />
                    </button>
                    <button 
                      type="submit" 
                      className="p-2.5 bg-primary hover:bg-primary/95 text-white rounded-lg transition"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
                <p className="text-foreground/50 font-semibold">Select a conversation to start swapping advice.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
