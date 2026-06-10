'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User as UserIcon, 
  Layers, 
  CreditCard, 
  Bell, 
  Database, 
  Plus, 
  Trash2, 
  Check, 
  Loader2, 
  Globe, 
  ShieldCheck, 
  ArrowLeftRight,
  Sparkles,
  Wifi,
  ChevronRight,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';
import { SkillCategory, SkillLevel, Skill, PortfolioProject } from '@/models/User';
import { mockUsers } from '@/lib/constants/mockData';

// Custom SVG Icons to avoid lucide-react version compatibility issues
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Preset avatar list
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80', // Riya
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80', // Arjun
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80', // Priya
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80', // Vikram
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80', // Ananya
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80', // Custom 1
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'portfolio' | 'payments' | 'notifications' | 'developer'>('profile');
  const [mounted, setMounted] = useState(false);

  // Zustand Store
  const { 
    currentUser, 
    upiSettings, 
    notifications, 
    developerSettings,
    updateCurrentUser,
    updateUpiSettings,
    updateNotifications,
    updateDeveloperSettings,
    addSkill,
    removeSkill,
    addWant,
    removeWant,
    addPortfolioProject,
    removePortfolioProject
  } = useUserStore();

  // Save feedback states
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [upiError, setUpiError] = useState<string | null>(null);

  // Form local state (to avoid lag on typing and sync on submit/blur)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [github, setGithub] = useState('');
  const [behance, setBehance] = useState('');
  const [website, setWebsite] = useState('');
  const [tempUpiId, setTempUpiId] = useState('');

  // Add Skill Form Local States
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>(SkillCategory.CODING);
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>(SkillLevel.INTERMEDIATE);
  const [newSkillExp, setNewSkillExp] = useState<number>(2);

  // Add Want Form Local States
  const [newWantName, setNewWantName] = useState('');
  const [newWantCategory, setNewWantCategory] = useState<SkillCategory>(SkillCategory.CODING);
  const [newWantLevel, setNewWantLevel] = useState<SkillLevel>(SkillLevel.BEGINNER);

  // Add Project Form Local States
  const [showAddProject, setShowAddProject] = useState(false);
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTags, setProjTags] = useState('');
  const [projUrl, setProjUrl] = useState('');
  const [projImg, setProjImg] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80');

  // Hydration sync
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setBio(currentUser.bio || '');
      setHourlyRate(currentUser.hourlyRate || 0);
      setCity(currentUser.location.city);
      setState(currentUser.location.state || '');
      setGithub(currentUser.portfolio?.github || '');
      setBehance(currentUser.portfolio?.behance || '');
      setWebsite(currentUser.portfolio?.website || '');
      setTempUpiId(upiSettings.upiId);
    }
  }, [mounted, currentUser, upiSettings.upiId]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-action mx-auto mb-4" />
          <p className="text-text/60">Loading settings panel...</p>
        </div>
      </div>
    );
  }

  // Trigger Save Feedback
  const triggerSaveFeedback = (message = "Settings saved successfully!") => {
    setSaveStatus(message);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      bio,
      hourlyRate: Number(hourlyRate),
      location: {
        ...currentUser.location,
        city,
        state,
      }
    });
    triggerSaveFeedback("Profile info updated!");
  };

  // Portfolio Links Save
  const handleSavePortfolioLinks = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      portfolio: {
        ...currentUser.portfolio,
        github,
        behance,
        website
      }
    });
    triggerSaveFeedback("Portfolio links updated!");
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDesc) return;
    
    addPortfolioProject({
      title: projTitle,
      description: projDesc,
      imageUrl: projImg || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80',
      url: projUrl || undefined,
      tags: projTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setProjTitle('');
    setProjDesc('');
    setProjTags('');
    setProjUrl('');
    setShowAddProject(false);
    triggerSaveFeedback("New project added to portfolio!");
  };

  // Add Skill Submit
  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      yearsOfExperience: newSkillExp
    });
    setNewSkillName('');
    triggerSaveFeedback("Skill added!");
  };

  // Add Want Submit
  const handleAddWantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWantName.trim()) return;

    addWant({
      name: newWantName.trim(),
      category: newWantCategory,
      level: newWantLevel
    });
    setNewWantName('');
    triggerSaveFeedback("Swap preference added!");
  };

  // Verify UPI Simulated Flow
  const handleVerifyUpi = () => {
    if (!tempUpiId.includes('@')) {
      setUpiError('Invalid UPI ID. Must contain "@" (e.g., name@okbank)');
      return;
    }
    
    setUpiError(null);
    setIsVerifyingUpi(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsVerifyingUpi(false);
      updateUpiSettings({
        upiId: tempUpiId,
        verified: true
      });
      triggerSaveFeedback("UPI ID verified successfully!");
    }, 1500);
  };

  // Tabs Navigation Data
  const tabs = [
    { id: 'profile', label: 'My Profile', icon: UserIcon },
    { id: 'portfolio', label: 'Portfolio & Skills', icon: Layers },
    { id: 'payments', label: 'UPI Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'developer', label: 'Developer Options', icon: Database },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-card/40 border-b border-card/60">
        {/* Decorative Blur bubbles */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-barter/15 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-action/10 rounded-full blur-2xl -z-10" />

        <div className="container mx-auto px-6 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-action/20 rounded-full text-xs font-semibold text-text mb-3">
                <Sparkles className="w-3.5 h-3.5 text-action" />
                Customize Your Magic
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text">
                Account Settings
              </h1>
              <p className="text-text/60 mt-1.5">
                Manage your credentials, swap preferences, wallet UPI and backend servers.
              </p>
            </div>
            
            {/* Quick Profile Summary Badge */}
            <div className="flex items-center gap-3 bg-background/60 backdrop-blur-sm p-3 rounded-2xl border border-card shadow-soft">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-action to-barter/80 flex items-center justify-center text-sm font-bold text-white shadow-soft overflow-hidden">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  'RS'
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{currentUser.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-text/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-action" />
                  Trust: {currentUser.trustScore.overall}/100
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-card/60">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap lg:w-full text-left focus:outline-none ${
                    isActive 
                      ? 'bg-action text-white shadow-soft-rose transform scale-[1.02]' 
                      : 'text-text/70 hover:text-text hover:bg-card/40'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-text/60'}`} />
                  <span>{tab.label}</span>
                  <ChevronRight className={`ml-auto w-4 h-4 hidden lg:block ${isActive ? 'text-white/80' : 'text-text/20'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Main Panel - Content */}
          <div className="lg:col-span-9 min-h-[500px]">
            
            {/* Save Status Alert Banner */}
            <AnimatePresence>
              {saveStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 bg-barter border border-barter/80 text-text px-4 py-3 rounded-xl flex items-center gap-2 shadow-soft font-semibold text-sm"
                >
                  <Check className="w-4 h-4 text-text" />
                  {saveStatus}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              
              {/* Profile Details Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card/30 rounded-3xl p-6 md:p-8 border border-card shadow-soft">
                    <h2 className="text-2xl font-heading font-bold text-text mb-6 flex items-center gap-2">
                      <UserIcon className="w-5 h-5 text-action" />
                      Personal Details
                    </h2>

                    {/* Avatar Picker */}
                    <div className="mb-8">
                      <label className="text-sm font-bold text-text/70 mb-3 block">Profile Image / Avatar</label>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-action to-barter/80 border-2 border-card overflow-hidden shadow-soft flex-shrink-0">
                          <img src={currentUser.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1 min-w-[200px]">
                          <p className="text-xs text-text/50 mb-2 font-medium">Select a curated profile avatar:</p>
                          <div className="flex gap-2">
                            {PRESET_AVATARS.map((url, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  updateCurrentUser({ avatar: url });
                                  triggerSaveFeedback("Avatar image updated!");
                                }}
                                className={`w-8 h-8 rounded-lg overflow-hidden border transition-all ${
                                  currentUser.avatar === url ? 'border-action ring-2 ring-action/20 scale-110' : 'border-card hover:scale-105'
                                }`}
                              >
                                <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <input 
                              type="text" 
                              value={currentUser.avatar}
                              onChange={(e) => updateCurrentUser({ avatar: e.target.value })}
                              placeholder="Or paste a custom image URL..."
                              className="text-xs w-full bg-background border border-card rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-action/60 text-text/80 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Basic Fields Form */}
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-bold text-text/70 mb-2 block">Full Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-medium"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-bold text-text/70 mb-2 block">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-medium"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-bold text-text/70 mb-2 block">City / Town</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="Mumbai, Bangalore, etc."
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-medium"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-bold text-text/70 mb-2 block">State / Region</label>
                          <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Maharashtra, Delhi, etc."
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-medium"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-bold text-text/70 mb-2 block">Hourly Rate Equivalent (₹/hr)</label>
                          <input
                            type="number"
                            value={hourlyRate || ''}
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                            placeholder="1200"
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-medium"
                          />
                          <span className="text-[11px] text-text/40 mt-1 block">Helpful to match you with similarly valued barter contracts</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-bold text-text/70 mb-2 block">Professional Bio</label>
                        <textarea
                          rows={4}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell potential swap partners about your skillset, experience, and projects..."
                          className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-medium leading-relaxed resize-y"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-action text-white rounded-full font-bold shadow-soft-rose hover:opacity-90 transform active:scale-95 transition-all text-sm"
                        >
                          Save Profile Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Portfolio & Skills Tab */}
              {activeTab === 'portfolio' && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  
                  {/* Skills Section */}
                  <div className="bg-card/30 rounded-3xl p-6 md:p-8 border border-card shadow-soft">
                    <h2 className="text-2xl font-heading font-bold text-text mb-6 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-action" />
                      Skills & Preferences
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: Skills I Offer */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-base font-bold text-text mb-1">Skills I Have / Offer</h3>
                          <p className="text-xs text-text/50">These skills are shown on your profile so others can request them.</p>
                        </div>

                        {/* List of current skills */}
                        <div className="flex flex-wrap gap-2">
                          {currentUser.skills.map((skill) => (
                            <div 
                              key={skill.id} 
                              className="flex items-center gap-2 px-3 py-1.5 bg-barter/40 border border-barter/60 rounded-xl text-xs font-semibold text-text shadow-soft"
                            >
                              <span>{skill.name}</span>
                              <span className="text-[10px] text-text/50 font-normal">({skill.level})</span>
                              <button 
                                onClick={() => removeSkill(skill.id)}
                                className="text-text/60 hover:text-red-500 font-bold ml-1.5 transition-colors focus:outline-none"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                          {currentUser.skills.length === 0 && (
                            <p className="text-xs text-text/40 italic">No skills added yet.</p>
                          )}
                        </div>

                        {/* Add Skill Mini Form */}
                        <form onSubmit={handleAddSkillSubmit} className="bg-background/50 border border-card p-4 rounded-2xl space-y-3">
                          <p className="text-xs font-bold text-text/70">+ Add a New Skill</p>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={newSkillName}
                              onChange={(e) => setNewSkillName(e.target.value)}
                              placeholder="e.g. Next.js"
                              required
                              className="col-span-2 text-xs bg-background border border-card rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-action/60 text-text"
                            />
                            <div>
                              <label className="text-[10px] text-text/50 block mb-1 font-semibold">Category</label>
                              <select 
                                value={newSkillCategory}
                                onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                                className="text-xs w-full bg-background border border-card rounded-lg px-2 py-1 focus:outline-none text-text"
                              >
                                <option value={SkillCategory.CODING}>Coding</option>
                                <option value={SkillCategory.DESIGN}>Design</option>
                                <option value={SkillCategory.WRITING}>Writing</option>
                                <option value={SkillCategory.MARKETING}>Marketing</option>
                                <option value={SkillCategory.BUSINESS}>Business</option>
                                <option value={SkillCategory.OTHER}>Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-text/50 block mb-1 font-semibold">Proficiency</label>
                              <select 
                                value={newSkillLevel}
                                onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                                className="text-xs w-full bg-background border border-card rounded-lg px-2 py-1 focus:outline-none text-text"
                              >
                                <option value={SkillLevel.BEGINNER}>Beginner</option>
                                <option value={SkillLevel.INTERMEDIATE}>Intermediate</option>
                                <option value={SkillLevel.ADVANCED}>Advanced</option>
                                <option value={SkillLevel.EXPERT}>Expert</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <label className="text-[10px] text-text/50 block mb-1 font-semibold">Years of Experience</label>
                              <input
                                type="number"
                                min={0}
                                max={30}
                                value={newSkillExp}
                                onChange={(e) => setNewSkillExp(Number(e.target.value))}
                                className="text-xs w-full bg-background border border-card rounded-lg px-2 py-1 focus:outline-none text-text"
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="w-full py-1.5 bg-action text-white rounded-lg text-xs font-bold hover:opacity-95 active:scale-[0.98] transition-all"
                          >
                            Add Skill
                          </button>
                        </form>
                      </div>

                      {/* Right: Skills I Want / Swaps Wanted */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-base font-bold text-text mb-1">Skills I Want / Need</h3>
                          <p className="text-xs text-text/50">These preferences power the Barter Match engine to find partners.</p>
                        </div>

                        {/* List of wants */}
                        <div className="flex flex-wrap gap-2">
                          {currentUser.wants.map((want) => (
                            <div 
                              key={want.id} 
                              className="flex items-center gap-2 px-3 py-1.5 bg-action/20 border border-action/30 rounded-xl text-xs font-semibold text-text shadow-soft"
                            >
                              <span>{want.name}</span>
                              <span className="text-[10px] text-text/50 font-normal">({want.level})</span>
                              <button 
                                onClick={() => removeWant(want.id)}
                                className="text-text/60 hover:text-red-500 font-bold ml-1.5 transition-colors focus:outline-none"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                          {currentUser.wants.length === 0 && (
                            <p className="text-xs text-text/40 italic">No preferences added yet.</p>
                          )}
                        </div>

                        {/* Add Want Mini Form */}
                        <form onSubmit={handleAddWantSubmit} className="bg-background/50 border border-card p-4 rounded-2xl space-y-3">
                          <p className="text-xs font-bold text-text/70">+ Add a Swap Goal</p>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={newWantName}
                              onChange={(e) => setNewWantName(e.target.value)}
                              placeholder="e.g. Figma Layouts"
                              required
                              className="col-span-2 text-xs bg-background border border-card rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-action/60 text-text"
                            />
                            <div>
                              <label className="text-[10px] text-text/50 block mb-1 font-semibold">Category</label>
                              <select 
                                value={newWantCategory}
                                onChange={(e) => setNewWantCategory(e.target.value as SkillCategory)}
                                className="text-xs w-full bg-background border border-card rounded-lg px-2 py-1 focus:outline-none text-text"
                              >
                                <option value={SkillCategory.CODING}>Coding</option>
                                <option value={SkillCategory.DESIGN}>Design</option>
                                <option value={SkillCategory.WRITING}>Writing</option>
                                <option value={SkillCategory.MARKETING}>Marketing</option>
                                <option value={SkillCategory.BUSINESS}>Business</option>
                                <option value={SkillCategory.OTHER}>Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-text/50 block mb-1 font-semibold">Desired Level</label>
                              <select 
                                value={newWantLevel}
                                onChange={(e) => setNewWantLevel(e.target.value as SkillLevel)}
                                className="text-xs w-full bg-background border border-card rounded-lg px-2 py-1 focus:outline-none text-text"
                              >
                                <option value={SkillLevel.BEGINNER}>Beginner</option>
                                <option value={SkillLevel.INTERMEDIATE}>Intermediate</option>
                                <option value={SkillLevel.ADVANCED}>Advanced</option>
                                <option value={SkillLevel.EXPERT}>Expert</option>
                              </select>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="w-full py-1.5 bg-action text-white rounded-lg text-xs font-bold hover:opacity-95 active:scale-[0.98] transition-all"
                          >
                            Add Swap Preference
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio links & projects */}
                  <div className="bg-card/30 rounded-3xl p-6 md:p-8 border border-card shadow-soft space-y-8">
                    
                    {/* Portfolio Links */}
                    <form onSubmit={handleSavePortfolioLinks} className="space-y-6">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-text mb-1">Portfolio & Social Links</h3>
                        <p className="text-xs text-text/50">Add links to show off your best works across other networks.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center bg-background border border-card rounded-xl px-3 py-2.5 gap-2.5">
                          <GithubIcon className="w-5 h-5 text-text/50" />
                          <div className="flex-1">
                            <span className="text-[9px] text-text/40 block font-bold">GITHUB</span>
                            <input 
                              type="text" 
                              value={github}
                              onChange={(e) => setGithub(e.target.value)}
                              placeholder="https://github.com/..."
                              className="text-xs w-full bg-transparent border-0 p-0 focus:outline-none text-text font-mono"
                            />
                          </div>
                        </div>

                        <div className="flex items-center bg-background border border-card rounded-xl px-3 py-2.5 gap-2.5">
                          <Globe className="w-5 h-5 text-text/50" />
                          <div className="flex-1">
                            <span className="text-[9px] text-text/40 block font-bold">WEBSITE</span>
                            <input 
                              type="text" 
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              placeholder="https://yoursite.com"
                              className="text-xs w-full bg-transparent border-0 p-0 focus:outline-none text-text font-mono"
                            />
                          </div>
                        </div>

                        <div className="flex items-center bg-background border border-card rounded-xl px-3 py-2.5 gap-2.5">
                          <Globe className="w-5 h-5 text-text/50" />
                          <div className="flex-1">
                            <span className="text-[9px] text-text/40 block font-bold">BEHANCE</span>
                            <input 
                              type="text" 
                              value={behance}
                              onChange={(e) => setBehance(e.target.value)}
                              placeholder="https://behance.net/..."
                              className="text-xs w-full bg-transparent border-0 p-0 focus:outline-none text-text font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-action text-white rounded-full font-bold shadow-soft hover:opacity-90 transition-all text-xs"
                        >
                          Save Links
                        </button>
                      </div>
                    </form>

                    <hr className="border-card/60" />

                    {/* Portfolio Projects list */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-text mb-0.5">Showcase Projects</h3>
                          <p className="text-xs text-text/50">A visual grid displaying projects on your public deck.</p>
                        </div>
                        <button
                          onClick={() => setShowAddProject(!showAddProject)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-barter border border-barter/80 rounded-xl text-xs font-bold text-text shadow-soft hover:opacity-90 active:scale-95 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 text-text" />
                          <span>Add Project</span>
                        </button>
                      </div>

                      {/* Add Project Form (Dropdown/Expandable) */}
                      {showAddProject && (
                        <motion.form 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-background/40 border border-card p-6 rounded-2xl space-y-4 overflow-hidden"
                          onSubmit={handleAddProject}
                        >
                          <p className="text-sm font-bold text-text">New Showcase Project</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[11px] font-bold text-text/60 mb-1 block">Project Title *</label>
                              <input
                                type="text"
                                value={projTitle}
                                onChange={(e) => setProjTitle(e.target.value)}
                                placeholder="e.g. NextJS Headless CMS"
                                required
                                className="text-xs w-full bg-background border border-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-action/60 text-text"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-text/60 mb-1 block">Project URL (Optional)</label>
                              <input
                                type="text"
                                value={projUrl}
                                onChange={(e) => setProjUrl(e.target.value)}
                                placeholder="https://github.com/..."
                                className="text-xs w-full bg-background border border-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-action/60 text-text font-mono"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-[11px] font-bold text-text/60 mb-1 block">Short Description *</label>
                              <textarea
                                rows={2}
                                value={projDesc}
                                onChange={(e) => setProjDesc(e.target.value)}
                                placeholder="What did you build? What technologies did you use?"
                                required
                                className="text-xs w-full bg-background border border-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-action/60 text-text leading-relaxed"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-text/60 mb-1 block">Tags (comma-separated)</label>
                              <input
                                type="text"
                                value={projTags}
                                onChange={(e) => setProjTags(e.target.value)}
                                placeholder="React, Tailwind, Nodejs"
                                className="text-xs w-full bg-background border border-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-action/60 text-text"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-text/60 mb-1 block">Cover Image URL</label>
                              <input
                                type="text"
                                value={projImg}
                                onChange={(e) => setProjImg(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                className="text-xs w-full bg-background border border-card rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-action/60 text-text font-mono"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setShowAddProject(false)}
                              className="px-4 py-2 bg-card hover:bg-card/80 rounded-xl text-xs font-bold text-text transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-action text-white rounded-xl text-xs font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                            >
                              Save Project
                            </button>
                          </div>
                        </motion.form>
                      )}

                      {/* Project Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentUser.portfolio?.projects?.map((project) => (
                          <div 
                            key={project.id} 
                            className="bg-background/80 border border-card rounded-2xl p-4 flex gap-4 hover:shadow-soft transition-all relative group"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-card flex-shrink-0">
                              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-text truncate pr-6">{project.title}</h4>
                              <p className="text-xs text-text/50 line-clamp-2 mt-0.5 leading-relaxed">{project.description}</p>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.tags.map((tag, i) => (
                                  <span key={i} className="text-[9px] bg-card px-1.5 py-0.5 rounded text-text/70">{tag}</span>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => removePortfolioProject(project.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg text-text/40 hover:text-red-500 hover:bg-red-50 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}

                        {(!currentUser.portfolio?.projects || currentUser.portfolio.projects.length === 0) && (
                          <p className="text-xs text-text/40 italic col-span-2">No showcase projects added to profile.</p>
                        )}
                      </div>

                    </div>
                  </div>

                </motion.div>
              )}

              {/* UPI Payments Tab */}
              {activeTab === 'payments' && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card/30 rounded-3xl p-6 md:p-8 border border-card shadow-soft">
                    <h2 className="text-2xl font-heading font-bold text-text mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-action" />
                      UPI Payment Settings
                    </h2>
                    
                    <p className="text-xs text-text/60 leading-relaxed mb-6">
                      To swap paid gig balances or receive payments for hybrid barter deals (UPI-native), link your Virtual Payment Address (VPA). Your billing currency is INR.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      {/* Form Details */}
                      <div className="md:col-span-7 space-y-6">
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-text/70 block">Your Personal UPI ID (VPA)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={tempUpiId}
                              onChange={(e) => {
                                setTempUpiId(e.target.value);
                                setUpiError(null);
                              }}
                              placeholder="e.g. riyasharma@okaxis"
                              className="flex-1 bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-mono text-sm"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyUpi}
                              disabled={isVerifyingUpi || !tempUpiId}
                              className="px-5 py-3 bg-action text-white rounded-xl font-bold shadow-soft hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all text-xs flex items-center gap-1.5"
                            >
                              {isVerifyingUpi ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Verifying...</span>
                                </>
                              ) : (
                                <span>Verify</span>
                              )}
                            </button>
                          </div>
                          {upiError && (
                            <p className="text-xs text-[#E57373] font-semibold">{upiError}</p>
                          )}
                        </div>

                        {/* Status Panel */}
                        <div className="bg-background/40 border border-card rounded-2xl p-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-text/70">Payment Status</p>
                            <p className="text-xs text-text/50 mt-0.5">UPI ID is fully linked and testable.</p>
                          </div>
                          {upiSettings.verified ? (
                            <span className="px-3 py-1 bg-barter text-text rounded-full text-xs font-bold border border-barter/80 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-text" />
                              Linked & Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-card border border-card/80 text-text/60 rounded-full text-xs font-bold">
                              Unverified
                            </span>
                          )}
                        </div>

                        {/* Note */}
                        <div className="bg-action/10 border border-action/20 rounded-2xl p-4">
                          <p className="text-xs font-semibold text-text flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-action" />
                            Secure Swaps Promise
                          </p>
                          <p className="text-[11px] text-text/60 mt-1 leading-relaxed">
                            Payment metadata is signed. When a barter deal has a monetary balance, buyers pay directly into your QR without platform holding fees.
                          </p>
                        </div>
                      </div>

                      {/* Live Generated QR Code */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center">
                        <div className="bg-white p-5 rounded-2xl border-2 border-card shadow-soft flex flex-col items-center w-full max-w-[240px]">
                          <span className="text-[9px] font-bold text-text/40 tracking-wider mb-3 font-sans">SKILLCIRCLE PAY</span>
                          
                          {/* Stylized QR Box */}
                          <div className="relative w-36 h-36 bg-white border-2 border-text/10 rounded-xl flex items-center justify-center p-2 mb-3">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-text">
                              {/* QR Outlines */}
                              <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
                              <rect x="10" y="10" width="15" height="15" fill="currentColor" />
                              <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
                              <rect x="75" y="10" width="15" height="15" fill="currentColor" />
                              <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
                              <rect x="10" y="75" width="15" height="15" fill="currentColor" />
                              
                              {/* Custom patterns for demo */}
                              <rect x="40" y="10" width="10" height="10" fill="currentColor" />
                              <rect x="45" y="25" width="10" height="5" fill="currentColor" />
                              <rect x="10" y="45" width="15" height="5" fill="currentColor" />
                              <rect x="30" y="40" width="5" height="15" fill="currentColor" />
                              <rect x="45" y="45" width="15" height="15" fill="currentColor" />
                              <rect x="75" y="45" width="10" height="10" fill="currentColor" />
                              <rect x="50" y="70" width="10" height="15" fill="currentColor" />
                              <rect x="70" y="70" width="15" height="10" fill="currentColor" />
                              <rect x="35" y="80" width="10" height="5" fill="currentColor" />
                              
                              {/* Logo Dot in center */}
                              <circle cx="50" cy="50" r="10" fill="white" />
                              <circle cx="50" cy="50" r="6" fill="#DC9B9B" />
                            </svg>
                          </div>

                          <span className="text-[10px] font-bold text-text truncate max-w-full font-mono">{upiSettings.upiId || 'no-address'}</span>
                          <span className="text-[9px] text-text/40 mt-1 block">Account holder: {currentUser.name}</span>
                          
                          <div className="flex items-center gap-1.5 mt-4 text-[9px] font-bold bg-barter px-2 py-0.5 rounded-full text-text border border-barter/80">
                            <Wifi className="w-3 h-3 text-text" />
                            Dynamic UPI QR
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card/30 rounded-3xl p-6 md:p-8 border border-card shadow-soft">
                    <h2 className="text-2xl font-heading font-bold text-text mb-6 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-action" />
                      Notification Preferences
                    </h2>

                    <div className="space-y-6">
                      {/* Email Preferences */}
                      <div>
                        <h3 className="text-sm font-bold text-text mb-3 tracking-wide text-text/80 uppercase">Email Notifications</h3>
                        <div className="space-y-4">
                          
                          <div className="flex items-start justify-between gap-4 p-1.5">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-text">New Swap Match Requests</p>
                              <p className="text-xs text-text/50 mt-0.5">Receive alert immediately when someone wants to swap matching skills with you.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={notifications.emailMatches}
                                onChange={(e) => updateNotifications({ emailMatches: e.target.checked })}
                                className="sr-only peer" 
                              />
                              <div className="relative w-11 h-6 bg-text/20 rounded-full peer peer-checked:bg-action transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-text/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                            </label>
                          </div>

                          <div className="flex items-start justify-between gap-4 p-1.5 border-t border-card/40 pt-4">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-text">Weekly Gig Recommendations</p>
                              <p className="text-xs text-text/50 mt-0.5">Get a weekly recap of open project bidding listings that require your skills.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={notifications.emailGigs}
                                onChange={(e) => updateNotifications({ emailGigs: e.target.checked })}
                                className="sr-only peer" 
                              />
                              <div className="relative w-11 h-6 bg-text/20 rounded-full peer peer-checked:bg-action transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-text/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                            </label>
                          </div>

                          <div className="flex items-start justify-between gap-4 p-1.5 border-t border-card/40 pt-4">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-text">Platform System & Trust Reports</p>
                              <p className="text-xs text-text/50 mt-0.5">Receive warnings and scores detailing reviews and ratings adjustments from collaborations.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={notifications.emailSystem}
                                onChange={(e) => updateNotifications({ emailSystem: e.target.checked })}
                                className="sr-only peer" 
                              />
                              <div className="relative w-11 h-6 bg-text/20 rounded-full peer peer-checked:bg-action transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-text/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                            </label>
                          </div>

                        </div>
                      </div>

                      <hr className="border-card/60" />

                      {/* Push Preferences */}
                      <div>
                        <h3 className="text-sm font-bold text-text mb-3 tracking-wide text-text/80 uppercase">Push & Real-time Alerts</h3>
                        <div className="space-y-4">

                          <div className="flex items-start justify-between gap-4 p-1.5">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-text">Real-time Swap Chat Messages</p>
                              <p className="text-xs text-text/50 mt-0.5">Allow browser banner notification when a matched partner sends you a chat message.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={notifications.pushRealtime}
                                onChange={(e) => updateNotifications({ pushRealtime: e.target.checked })}
                                className="sr-only peer" 
                              />
                              <div className="relative w-11 h-6 bg-text/20 rounded-full peer peer-checked:bg-action transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-text/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                            </label>
                          </div>

                          <div className="flex items-start justify-between gap-4 p-1.5 border-t border-card/40 pt-4">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-text">Security & Login Alerts</p>
                              <p className="text-xs text-text/50 mt-0.5">Notify instantly on password updates, new browser logins or wallet configuration edits.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={notifications.pushSecurity}
                                onChange={(e) => updateNotifications({ pushSecurity: e.target.checked })}
                                className="sr-only peer" 
                              />
                              <div className="relative w-11 h-6 bg-text/20 rounded-full peer peer-checked:bg-action transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-text/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                            </label>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Developer & Backend options Tab */}
              {activeTab === 'developer' && (
                <motion.div
                  key="developer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-card/30 rounded-3xl p-6 md:p-8 border border-card shadow-soft">
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-action" />
                      <h2 className="text-2xl font-heading font-bold text-text">
                        Backend & Server Settings
                      </h2>
                    </div>
                    <p className="text-xs text-text/50 mb-6">
                      Configure your backend api nodes, testing tools, mock syncs, and client databases here.
                    </p>

                    <div className="space-y-6">
                      
                      {/* Database Mode selector */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-bold text-text/70 mb-2 block">Active Database Engine Mode</label>
                          <select
                            value={developerSettings.databaseMode}
                            onChange={(e) => {
                              updateDeveloperSettings({ databaseMode: e.target.value as any });
                              triggerSaveFeedback(`Database switched to ${e.target.value.toUpperCase()} mode!`);
                            }}
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-medium"
                          >
                            <option value="mock">In-Memory Mock Database (Localstorage persistence)</option>
                            <option value="sqlite">Local SQLite Embedded (Local Server)</option>
                            <option value="postgres">Production PostgreSQL (Remote Server)</option>
                            <option value="firebase">Google Firebase / Cloud Firestore (Serverless)</option>
                          </select>
                          <span className="text-[10px] text-text/40 mt-1 block">Specify where transactions, gigs, and swipes read/write.</span>
                        </div>

                        {/* API Base URL */}
                        <div>
                          <label className="text-sm font-bold text-text/70 mb-2 block">GraphQL / REST Endpoint URL</label>
                          <input
                            type="text"
                            value={developerSettings.apiUrl}
                            onChange={(e) => updateDeveloperSettings({ apiUrl: e.target.value })}
                            placeholder="https://api.skillcircle.in/v1"
                            className="w-full bg-background border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action/30 text-text font-mono text-sm"
                          />
                        </div>
                      </div>

                      <hr className="border-card/60" />

                      {/* Toggles */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Auto-Sync Switch */}
                        <div className="flex items-start justify-between gap-4 bg-background/50 border border-card p-4 rounded-2xl">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-text flex items-center gap-1.5">
                              <Wifi className="w-4 h-4 text-text/60" />
                              Auto-Sync on Changes
                            </p>
                            <p className="text-xs text-text/50 mt-0.5">Edits to your profile, UPI, or swipes will sync automatically to the API base URL in the background.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer mt-1 flex-shrink-0">
                            <input 
                              type="checkbox" 
                              checked={developerSettings.enableSync}
                              onChange={(e) => {
                                updateDeveloperSettings({ enableSync: e.target.checked });
                                triggerSaveFeedback(e.target.checked ? "Auto-sync enabled!" : "Auto-sync disabled.");
                              }}
                              className="sr-only peer" 
                            />
                            <div className="relative w-11 h-6 bg-text/20 rounded-full peer peer-checked:bg-action transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-text/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                          </label>
                        </div>

                        {/* Console Debug Toggle */}
                        <div className="flex items-start justify-between gap-4 bg-background/50 border border-card p-4 rounded-2xl">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-text flex items-center gap-1.5">
                              <HelpCircle className="w-4 h-4 text-text/60" />
                              Console Debug Logs
                            </p>
                            <p className="text-xs text-text/50 mt-0.5">Output diagnostic JSON payloads of mock responses, state changes, and sync actions in console.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer mt-1 flex-shrink-0">
                            <input 
                              type="checkbox" 
                              checked={developerSettings.debugLogging}
                              onChange={(e) => {
                                updateDeveloperSettings({ debugLogging: e.target.checked });
                                triggerSaveFeedback(e.target.checked ? "Debug logs activated!" : "Debug logs silenced.");
                              }}
                              className="sr-only peer" 
                            />
                            <div className="relative w-11 h-6 bg-text/20 rounded-full peer peer-checked:bg-action transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-text/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                          </label>
                        </div>
                      </div>

                      {/* Mock Latency slider */}
                      <div className="bg-background/50 border border-card p-5 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-bold text-text/70">Simulated Server Network Latency (Delay)</label>
                          <span className="px-2 py-0.5 bg-action text-white rounded text-xs font-bold font-mono">{developerSettings.mockDelay}ms</span>
                        </div>
                        <p className="text-xs text-text/50 leading-relaxed">
                          Intentionally slows down client mock loaders (e.g. swipe deck actions, profile saves, UPI verification checkouts) to test skeleton loaders and transitions.
                        </p>
                        <input
                          type="range"
                          min="0"
                          max="3000"
                          step="100"
                          value={developerSettings.mockDelay}
                          onChange={(e) => updateDeveloperSettings({ mockDelay: Number(e.target.value) })}
                          className="w-full accent-action cursor-ew-resize bg-text/15 border border-text/5 rounded-lg appearance-none h-2 focus:outline-none"
                        />
                        <div className="flex justify-between text-[10px] text-text/40 font-mono">
                          <span>0ms (Instant)</span>
                          <span>1500ms (Slow 3G)</span>
                          <span>3000ms (High Latency)</span>
                        </div>
                      </div>

                      {/* Offline Sync Behavior */}
                      <div className="bg-background/50 border border-card p-5 rounded-2xl space-y-3">
                        <label className="text-sm font-bold text-text/70 block">Offline / Reconnect Synchronization Behavior</label>
                        <p className="text-xs text-text/50">
                          How the application handles sync queues if edits are performed while the device loses internet connection.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            { id: 'queue', title: 'Queue & Flush', desc: 'Hold operations in storage and trigger sequential bulk syncs when online.' },
                            { id: 'ignore', title: 'Silence Offline', desc: 'Revert operations on network failure. Keep changes local-only.' },
                            { id: 'prompt', title: 'Resolve Dialog', desc: 'Alert the user on reconnect to choose manual overwrite or pull latest.' }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                updateDeveloperSettings({ offlineSync: opt.id as any });
                                triggerSaveFeedback(`Sync mode changed to ${opt.title}!`);
                              }}
                              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between h-full transition-all focus:outline-none ${
                                developerSettings.offlineSync === opt.id 
                                  ? 'border-action bg-action/10 scale-[1.02] shadow-soft' 
                                  : 'border-card hover:bg-card/40'
                              }`}
                            >
                              <span className="text-xs font-bold text-text">{opt.title}</span>
                              <span className="text-[10px] text-text/50 mt-1 leading-relaxed">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>

    </div>
  );
}
