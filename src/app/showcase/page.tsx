'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Sparkles, ArrowLeftRight, MapPin, 
  ShieldCheck, Check, Star, Users, Navigation, 
  CreditCard, RotateCw, RefreshCw, Volume2, VolumeX,
  Code, Layout, FileText, CheckCircle2, Phone, Award, ChevronRight
} from 'lucide-react';
import { mockUsers } from '@/lib/constants/mockData';
import { User } from '@/models/User';
import { HexagonalTrustRadar } from '@/components/ui/HexagonalTrustRadar';

// Subtitle captions for mock video pitches
const pitchCaptions: Record<string, string> = {
  '1': "Hi there! I'm Riya. I specialize in building robust React and Node.js applications. Right now, I'm building a community platform and need a UI/UX wizard to design the dashboard. Let's swap skills!",
  '2': "Hey! Arjun here. I create high-fidelity UI designs and design systems in Figma. I'm looking for a frontend developer who can help me turn my personal design portfolio into a clean React site. Let's connect!",
  '3': "Hello! I'm Priya. I write clear, high-converting tech articles and strategy copy. I'd love to swap my writing services with someone who can set up SEO tracking and optimize my website search ranks.",
  '4': "Hey, Vikram here. I build ML models and clean Python data pipelines. I'm currently launching a project and need a web developer to build a basic user landing page. Let's trade React for Python!",
  '5': "Hi! I'm Ananya. I'm a growth marketer specialized in social media campaigns and SEO. I'm looking for a video editor to help me create short-form content for my brand channels. Let's collaborate!"
};

// Typewriter subtitles helper
const SubtitleTypewriter: React.FC<{ text: string; isPlaying: boolean }> = ({ text, isPlaying }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!isPlaying) {
      setDisplayedText(text); // show full text when paused
      return;
    }
    setDisplayedText('');
    const words = text.split(' ');
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => prev + (prev ? ' ' : '') + words[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [text, isPlaying]);

  return (
    <p className="text-text/90 font-medium leading-relaxed italic text-sm md:text-base min-h-[50px]">
      "{displayedText || '...'}"
    </p>
  );
};

export default function ShowcasePage() {
  // --- SPOTLIGHT STATES ---
  const [activeUser, setActiveUser] = useState<User>(mockUsers[0]);
  const [isPitchPlaying, setIsPitchPlaying] = useState<boolean>(true);
  const [isPitchMuted, setIsPitchMuted] = useState<boolean>(true);
  const [proposalState, setProposalState] = useState<'idle' | 'sending' | 'sent'>('idle');

  // --- FEATURE TAB STATES ---
  const [activeTab, setActiveTab] = useState<'match' | 'radar' | 'upi' | 'squad'>('match');

  // 1. Match Engine Simulator States
  const [mySkill, setMySkill] = useState<string>('react');
  const [wantedSkill, setWantedSkill] = useState<string>('figma');
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [matchScore, setMatchScore] = useState<number>(0);

  // 2. UPI Simulator States
  const [upiStep, setUpiStep] = useState<'init' | 'qrcode' | 'paying' | 'success'>('init');
  const [upiAmount, setUpiAmount] = useState<number>(850);
  const [confetti, setConfetti] = useState<boolean>(false);

  // 3. Squad Builder States
  const [projectTemplate, setProjectTemplate] = useState<'saas' | 'brand' | 'data'>('saas');
  const [squadSlots, setSquadSlots] = useState<Record<string, User | null>>({
    tech: null,
    design: null,
    growth: null,
  });

  // Automatically adjust selected user state on mount/reset
  useEffect(() => {
    setProposalState('idle');
    setIsPitchPlaying(true);
  }, [activeUser]);

  // Handler: Propose Barter Swap
  const handleProposeSwap = () => {
    setProposalState('sending');
    setTimeout(() => {
      setProposalState('sent');
    }, 1600);
  };

  // Handler: Simulate Barter Match
  const handleSimulateMatch = () => {
    setIsMatching(true);
    setMatchedUser(null);
    setTimeout(() => {
      // Intelligently find a match based on skills
      let match: User = mockUsers[1]; // default Arjun
      let score = 98;

      if (mySkill === 'react' && wantedSkill === 'figma') {
        match = mockUsers[1]; // Arjun (Figma, wants Frontend)
        score = 98;
      } else if (mySkill === 'figma' && wantedSkill === 'react') {
        match = mockUsers[0]; // Riya (React, wants UI/UX)
        score = 96;
      } else if (mySkill === 'python' && wantedSkill === 'seo') {
        match = mockUsers[4]; // Ananya (SEO, wants video production)
        score = 88;
      } else if (wantedSkill === 'copywriting') {
        match = mockUsers[2]; // Priya
        score = 94;
      } else if (wantedSkill === 'python') {
        match = mockUsers[3]; // Vikram
        score = 92;
      } else {
        // Fallback random match
        const filterPool = mockUsers.filter(u => u.id !== activeUser.id);
        match = filterPool[Math.floor(Math.random() * filterPool.length)];
        score = Math.floor(Math.random() * 15) + 82;
      }

      setMatchedUser(match);
      setMatchScore(score);
      setIsMatching(false);
    }, 1200);
  };

  // Handler: UPI Payments
  const handleStartUPISettlement = () => {
    setUpiStep('qrcode');
  };

  const handleSimulatePayment = () => {
    setUpiStep('paying');
    setTimeout(() => {
      setUpiStep('success');
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000);
    }, 2000);
  };

  const resetUPI = () => {
    setUpiStep('init');
  };

  // Handler: Squad Builder Selection
  const addSquadMember = (role: 'tech' | 'design' | 'growth', user: User) => {
    setSquadSlots(prev => ({
      ...prev,
      [role]: user
    }));
  };

  const removeSquadMember = (role: 'tech' | 'design' | 'growth') => {
    setSquadSlots(prev => ({
      ...prev,
      [role]: null
    }));
  };

  // Compute Squad Metrics
  const getSquadMetrics = () => {
    const members = Object.values(squadSlots).filter((u): u is User => u !== null);
    if (members.length === 0) return { trust: 0, synergy: 0 };
    
    // Average Trust Score
    const trustAvg = Math.round(members.reduce((acc, m) => acc + m.trustScore.overall, 0) / members.length);
    
    // Synergy multiplier
    let synergy = 40;
    if (members.length === 1) synergy = 60;
    if (members.length === 2) synergy = 80;
    if (members.length === 3) {
      synergy = 92;
      // Add custom bonus for matching templates
      if (projectTemplate === 'saas' && squadSlots.tech?.skills.some(s => s.id === 'react' || s.id === 'typescript') && squadSlots.design?.skills.some(s => s.id === 'figma')) {
        synergy = 98;
      } else if (projectTemplate === 'brand' && squadSlots.design?.skills.some(s => s.id === 'figma') && squadSlots.growth?.skills.some(s => s.id === 'social-media')) {
        synergy = 97;
      } else if (projectTemplate === 'data' && squadSlots.tech?.skills.some(s => s.id === 'python') && squadSlots.design?.skills.some(s => s.id === 'ui-design')) {
        synergy = 95;
      }
    }

    return { trust: trustAvg, synergy };
  };

  const { trust: squadTrust, synergy: squadSynergy } = getSquadMetrics();

  return (
    <div className="min-h-screen bg-background text-text overflow-hidden relative pb-24">
      {/* Decorative Blob Elements */}
      <div className="absolute top-0 inset-x-0 h-96 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 60, 0],
            x: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-20 w-96 h-96 bg-barter/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            y: [0, 40, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-20 w-96 h-96 bg-action/15 rounded-full blur-3xl"
        />
      </div>

      {/* Main Page Layout */}
      <div className="container mx-auto px-6 pt-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-card/65 border border-white/40 rounded-full text-xs font-bold text-text mb-6 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-action animate-pulse" />
            <span>INTERACTIVE DEMO CENTRE</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-extrabold text-text mb-6 tracking-tight leading-tight"
          >
            SkillCircle <span className="text-action font-serif">Showcase</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-text/75 leading-relaxed"
          >
            Experience the features that make SkillCircle unique. Choose creators, preview video pitches, and simulate barter swaps, radar detection, and payments.
          </motion.p>
        </div>

        {/* SECTION 1: TALENT SPOTLIGHT & PITCH STAGE */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-action/10 flex items-center justify-center text-action">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text">Talent Spotlight</h2>
              <p className="text-xs text-text/60 mt-0.5">Toggle creator profiles to verify credentials and video pitches</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Talent Selector */}
            <div className="lg:col-span-4 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none shrink-0">
              {mockUsers.map((user) => {
                const isActive = activeUser.id === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => setActiveUser(user)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all shrink-0 w-72 lg:w-full select-none outline-none ${
                      isActive 
                        ? 'bg-card border-barter/80 shadow-md scale-[1.02]' 
                        : 'bg-white/40 border-white/20 hover:bg-white/60 shadow-sm'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-soft shrink-0 relative">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      {user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-barter border border-white rounded-full flex items-center justify-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-text" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-text truncate">{user.name}</span>
                        <span className="text-[10px] font-bold text-action bg-action/15 px-2 py-0.5 rounded-full shrink-0">
                          {user.trustScore.overall}% Trust
                        </span>
                      </div>
                      <p className="text-xs text-text/60 truncate mt-0.5">Offers: {user.skills[0]?.name}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-text/5 text-[10px] font-semibold text-text/50">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-action" /> {user.location.city}
                        </span>
                        <span>{user.skills.length} Skills swap</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Spotlight Stage View */}
            <div className="lg:col-span-8 bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 shadow-soft relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* Visual Video Pitch Player Simulator */}
                <div className="flex flex-col gap-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-text/55 flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-action fill-action/20" /> 15s Pitch Preview
                  </span>

                  <div className="aspect-video md:aspect-square w-full bg-text/95 rounded-2xl relative overflow-hidden shadow-xl border border-text/10 flex flex-col items-center justify-center select-none">
                    {/* Viewfinder elements */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2D3436] to-black opacity-90 z-0" />
                    
                    {/* Scanning CRT lines */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-40 z-10" />
                    
                    {isPitchPlaying && (
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-black/60 text-white text-[10px] uppercase font-extrabold rounded-full tracking-widest border border-white/10">
                        <span className="w-2 h-2 bg-[#E57373] rounded-full animate-ping" />
                        <span>LIVE</span>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-black/60 text-white/95 text-xs font-mono rounded-md border border-white/5">
                      0:15 / REC
                    </div>

                    {/* Animated Avatar Bubble inside player */}
                    <motion.div 
                      className="z-10 w-28 h-28 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl relative"
                      animate={isPitchPlaying ? {
                        scale: [1, 1.04, 1],
                        borderColor: ['rgba(255,255,255,0.8)', 'rgba(220,155,155,0.9)', 'rgba(255,255,255,0.8)']
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <img src={activeUser.avatar} alt={activeUser.name} className="w-full h-full object-cover filter brightness-95" />
                    </motion.div>

                    {/* Bottom audio graphic */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                      <div className="flex gap-1 h-8 items-end bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className={`w-1 bg-barter rounded-full transition-all duration-300 ${isPitchPlaying ? 'h-full animate-pulse' : 'h-1.5'}`} style={{ animationDelay: '0.1s' }} />
                        <div className={`w-1 bg-barter rounded-full transition-all duration-300 ${isPitchPlaying ? 'h-full animate-pulse' : 'h-3'}`} style={{ animationDelay: '0.3s' }} />
                        <div className={`w-1 bg-barter rounded-full transition-all duration-300 ${isPitchPlaying ? 'h-full animate-pulse' : 'h-2'}`} style={{ animationDelay: '0.2s' }} />
                        <div className={`w-1 bg-barter rounded-full transition-all duration-300 ${isPitchPlaying ? 'h-full animate-pulse' : 'h-4'}`} style={{ animationDelay: '0.5s' }} />
                        <div className={`w-1 bg-barter rounded-full transition-all duration-300 ${isPitchPlaying ? 'h-full animate-pulse' : 'h-1.5'}`} style={{ animationDelay: '0.4s' }} />
                      </div>

                      <button 
                        onClick={() => setIsPitchMuted(!isPitchMuted)}
                        className="p-1.5 bg-black/60 rounded-lg text-white/70 hover:text-white border border-white/10"
                      >
                        {isPitchMuted ? <VolumeX className="w-4 h-4 text-action" /> : <Volume2 className="w-4 h-4 text-barter" />}
                      </button>
                    </div>

                    {/* Play/Pause Button */}
                    <button
                      onClick={() => setIsPitchPlaying(!isPitchPlaying)}
                      className="absolute z-20 w-16 h-16 bg-white/95 hover:bg-white text-action rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all focus:outline-none"
                    >
                      {isPitchPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                    </button>
                  </div>

                  {/* Pitch Transcript Subtitles */}
                  <div className="bg-white/70 border border-white/40 rounded-2xl p-4 shadow-inner">
                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] font-bold text-text/50 uppercase tracking-widest">
                      <FileText className="w-3 h-3 text-action" /> Subtitles
                    </div>
                    <SubtitleTypewriter 
                      text={pitchCaptions[activeUser.id] || "Hello! Let's swap skills and build something beautiful together."} 
                      isPlaying={isPitchPlaying} 
                    />
                  </div>
                </div>

                {/* Reputation Matrix & Trust Score */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-text/55 flex items-center gap-2 mb-2">
                      <Award className="w-3.5 h-3.5 text-barter-600" /> Reputation Matrix
                    </span>
                    <h3 className="text-xl font-heading font-extrabold text-text leading-tight">{activeUser.name}'s Trust Profile</h3>
                  </div>

                  {/* Trust Radar Render */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-card flex justify-center py-6">
                    <HexagonalTrustRadar trustScore={activeUser.trustScore} size="sm" showLabels={true} />
                  </div>

                  {/* Trust metrics breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white p-2.5 border border-card rounded-xl">
                      <span className="text-sm font-extrabold text-action block">{activeUser.trustScore.quality}%</span>
                      <span className="text-[9px] text-text/50 uppercase font-bold tracking-wider">Quality</span>
                    </div>
                    <div className="bg-white p-2.5 border border-card rounded-xl">
                      <span className="text-sm font-extrabold text-barter block">{activeUser.trustScore.speed}%</span>
                      <span className="text-[9px] text-text/50 uppercase font-bold tracking-wider">Speed</span>
                    </div>
                    <div className="bg-white p-2.5 border border-card rounded-xl">
                      <span className="text-sm font-extrabold text-text block">{activeUser.trustScore.barterHistory}%</span>
                      <span className="text-[9px] text-text/50 uppercase font-bold tracking-wider">History</span>
                    </div>
                  </div>

                  {/* Propose Barter Actions */}
                  <div className="border-t border-text/5 pt-4">
                    <AnimatePresence mode="wait">
                      {proposalState === 'idle' && (
                        <motion.button
                          key="propose-btn"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          onClick={handleProposeSwap}
                          className="w-full py-3.5 bg-action hover:opacity-95 text-white rounded-xl font-bold shadow-lg shadow-action/10 transition-all flex items-center justify-center gap-2 group focus:outline-none"
                        >
                          <ArrowLeftRight className="w-4.5 h-4.5 group-hover:rotate-180 transition-transform duration-500" />
                          <span>Propose Barter Swap</span>
                        </motion.button>
                      )}

                      {proposalState === 'sending' && (
                        <motion.div
                          key="sending-btn"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full py-3.5 bg-card/60 text-text/85 rounded-xl font-bold shadow-inner border border-card/85 flex items-center justify-center gap-2.5"
                        >
                          <div className="w-4.5 h-4.5 border-2 border-action border-t-transparent rounded-full animate-spin" />
                          <span>Generating Proposal Ledger...</span>
                        </motion.div>
                      )}

                      {proposalState === 'sent' && (
                        <motion.div
                          key="success-btn"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full p-4 bg-barter/25 border border-barter rounded-xl flex items-start gap-3 text-text"
                        >
                          <div className="w-8 h-8 rounded-full bg-barter flex items-center justify-center shrink-0 shadow-sm">
                            <Check className="w-4 h-4 text-text font-bold" />
                          </div>
                          <div>
                            <span className="font-extrabold block text-xs mb-0.5 text-text">Proposal Dispatched!</span>
                            <span className="text-[11px] text-text/70 leading-relaxed block">
                              Sent exchange offer. We will notify you when {activeUser.name.split(' ')[0]} responds.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: INTERACTIVE FEATURE PLAYGROUND */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-barter/20 flex items-center justify-center text-barter-600">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text">Feature Playground</h2>
              <p className="text-xs text-text/60 mt-0.5">Interact with functional mockups of our upcoming major platform features</p>
            </div>
          </div>

          {/* Playground Tabs */}
          <div className="flex border-b border-card bg-white/40 backdrop-blur-md rounded-2xl p-1 mb-8 shadow-sm">
            {[
              { id: 'match', label: 'Match Engine', icon: ArrowLeftRight },
              { id: 'radar', label: 'Hyperlocal Radar', icon: Navigation },
              { id: 'upi', label: 'UPI Settlement', icon: CreditCard },
              { id: 'squad', label: 'Squad Bidding', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs md:text-sm font-bold transition-all focus:outline-none ${
                    isActive
                      ? 'bg-white text-action shadow-sm'
                      : 'text-text/60 hover:text-text hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 shadow-soft min-h-[380px] flex flex-col justify-between relative overflow-hidden">
            
            {/* 1. MATCH ENGINE PLAYGROUND */}
            {activeTab === 'match' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-text mb-2">Simulate Cashless Matching</h3>
                    <p className="text-sm text-text/70 leading-relaxed">
                      Our intelligent Barter Match Engine analyzes what you teach versus what you want to learn, cross-checking candidates to find direct & multi-party swap loops.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-text/60 uppercase mb-2">My Skill Portfolio</label>
                      <select 
                        value={mySkill}
                        onChange={(e) => setMySkill(e.target.value)}
                        className="w-full bg-white border border-card rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-action"
                      >
                        <option value="react">React Development</option>
                        <option value="figma">Figma UI Design</option>
                        <option value="writing">Tech Writing</option>
                        <option value="python">Python Data Analysis</option>
                        <option value="seo">SEO Optimization</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text/60 uppercase mb-2">Desired Exchange Skill</label>
                      <select 
                        value={wantedSkill}
                        onChange={(e) => setWantedSkill(e.target.value)}
                        className="w-full bg-white border border-card rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-action"
                      >
                        <option value="figma">UI/UX Design (Figma)</option>
                        <option value="react">Frontend Development (React)</option>
                        <option value="seo">SEO & Marketing</option>
                        <option value="python">Machine Learning & Python</option>
                        <option value="copywriting">Content Strategy & Writing</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSimulateMatch}
                      disabled={isMatching}
                      className="w-full py-3 bg-action text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-action/5 disabled:opacity-50"
                    >
                      {isMatching ? <RefreshCw className="w-4.5 h-4.5 animate-spin" /> : <Sparkles className="w-4.5 h-4.5" />}
                      <span>{isMatching ? 'Running Match Algorithms...' : 'Find Barter Matches'}</span>
                    </button>
                  </div>
                </div>

                {/* Match Engine Visual Stage */}
                <div className="bg-white/60 border border-card rounded-2xl p-6 shadow-inner min-h-[300px] flex flex-col items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    {isMatching ? (
                      <motion.div
                        key="matching-scan"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4 text-center"
                      >
                        <div className="relative w-20 h-20">
                          {/* Pulsing scan waves */}
                          <div className="absolute inset-0 rounded-full border-2 border-action animate-ping opacity-25" />
                          <div className="absolute -inset-2 rounded-full border border-barter animate-pulse opacity-20" />
                          <div className="w-full h-full bg-card rounded-full border border-card flex items-center justify-center">
                            <ArrowLeftRight className="w-8 h-8 text-action animate-bounce" />
                          </div>
                        </div>
                        <div>
                          <span className="font-extrabold text-sm block">Scanning User Pools...</span>
                          <span className="text-xs text-text/50">Evaluating compatibility matrix</span>
                        </div>
                      </motion.div>
                    ) : matchedUser ? (
                      <motion.div
                        key="match-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex flex-col items-center text-center gap-4"
                      >
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-barter/30 border border-barter/60 rounded-full text-xs font-bold text-text">
                          <CheckCircle2 className="w-3.5 h-3.5 text-text" /> Swap Compatibility: {matchScore}%
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-action/10 flex items-center justify-center border border-action/25 text-action font-extrabold text-xs uppercase">
                              You
                            </div>
                            <span className="text-[10px] text-text/50 font-bold uppercase mt-1">{mySkill}</span>
                          </div>

                          <div className="w-12 h-0.5 bg-dashed border-t-2 border-dashed border-card relative shrink-0">
                            <ArrowLeftRight className="w-4 h-4 text-action absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5 border" />
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-card shadow-sm shrink-0">
                              <img src={matchedUser.avatar} alt={matchedUser.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[10px] text-text/50 font-bold uppercase mt-1">{matchedUser.name.split(' ')[0]}</span>
                          </div>
                        </div>

                        <div className="bg-white p-4 border border-card rounded-xl w-full text-left mt-2">
                          <span className="text-xs font-extrabold block text-text mb-1">{matchedUser.name}</span>
                          <p className="text-xs text-text/60 line-clamp-2 leading-relaxed">{matchedUser.bio}</p>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-card/65 text-[10px] font-bold text-text/50">
                            <span>Primary: {matchedUser.skills[0]?.name}</span>
                            <span>Rating: {matchedUser.trustScore.overall}/100</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveUser(matchedUser);
                            document.querySelector('#spotlight')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-xs text-action hover:text-action/80 font-bold flex items-center gap-1 group mt-1"
                        >
                          <span>View Spotlight Pitch</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="match-empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-text/45 p-8"
                      >
                        <RefreshCw className="w-12 h-12 text-text/30 mx-auto mb-4" />
                        <span className="font-bold block text-sm mb-1">Simulate Swap Match</span>
                        <span className="text-xs">Configure skills on the left to run matching algorithms</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* 2. HYPERLOCAL RADAR PLAYGROUND */}
            {activeTab === 'radar' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-text mb-2">Hyperlocal Talent Scanner</h3>
                    <p className="text-sm text-text/70 leading-relaxed">
                      Connect with local talents in your immediate vicinity. Our hyperlocal locator maps talented professionals near you for coffee swaps, squad bidding, and local collab projects.
                    </p>
                  </div>

                  <div className="bg-white/60 border border-card rounded-2xl p-4 shadow-sm space-y-3">
                    <span className="text-xs font-bold text-text/50 uppercase block">Nearby Discoveries</span>
                    <div className="space-y-2">
                      {[
                        { name: 'Riya Sharma', dist: '1.2 km', skill: 'React Development' },
                        { name: 'Arjun Patel', dist: '3.4 km', skill: 'Figma Designer' },
                        { name: 'Priya Singh', dist: '0.8 km', skill: 'Tech Writer' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs p-2 bg-white rounded-lg border border-card/45">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-barter animate-pulse" />
                            <span className="font-bold">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-text/60">
                            <span>{item.skill}</span>
                            <span className="font-mono bg-card px-2 py-0.5 rounded text-[10px] font-bold">{item.dist}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Radar Sweep Simulator */}
                <div className="flex justify-center items-center">
                  <div className="relative w-72 h-72 rounded-full border-4 border-[#2D3436]/15 bg-[#2D3436]/95 overflow-hidden shadow-2xl flex items-center justify-center select-none">
                    {/* Sweeping line */}
                    <div 
                      className="absolute inset-0 origin-center pointer-events-none z-10"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 50%, rgba(192, 225, 210, 0.2) 100%)',
                        animation: 'spin 4s linear infinite',
                      }}
                    />

                    {/* Concentric Grid lines */}
                    <div className="absolute w-[80%] h-[80%] rounded-full border border-white/10" />
                    <div className="absolute w-[60%] h-[60%] rounded-full border border-white/10" />
                    <div className="absolute w-[40%] h-[40%] rounded-full border border-white/10 border-dashed" />
                    <div className="absolute w-[20%] h-[20%] rounded-full border border-white/10" />
                    
                    {/* Axis spokes */}
                    <div className="absolute w-full h-[0.5px] bg-white/10" />
                    <div className="absolute h-full w-[0.5px] bg-white/10" />

                    {/* Radar Center Dot */}
                    <div className="absolute w-3 h-3 bg-action rounded-full z-20 border border-white shadow-md animate-pulse">
                      <div className="absolute -inset-2 rounded-full border border-action animate-ping opacity-70" />
                    </div>

                    {/* Blips of users */}
                    {mockUsers.map((user, idx) => {
                      // Custom positions
                      const positions = [
                        { top: '35%', left: '30%', dist: '1.2 km' }, // Riya
                        { top: '65%', left: '70%', dist: '3.4 km' }, // Arjun
                        { top: '25%', left: '75%', dist: '0.8 km' }, // Priya
                        { top: '75%', left: '25%', dist: '5.6 km' }, // Vikram
                        { top: '48%', left: '80%', dist: '2.7 km' }, // Ananya
                      ];
                      const pos = positions[idx];

                      return (
                        <div
                          key={user.id}
                          style={{ top: pos.top, left: pos.left }}
                          onClick={() => setActiveUser(user)}
                          className="absolute group/blip cursor-pointer z-20 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          {/* Blip glow */}
                          <div className="w-3.5 h-3.5 bg-barter rounded-full border border-white shadow-md animate-pulse relative">
                            <div className="absolute -inset-2 rounded-full bg-barter opacity-30 animate-ping" />
                          </div>

                          {/* Hover Tooltip card */}
                          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 scale-95 pointer-events-none group-hover/blip:opacity-100 group-hover/blip:scale-100 transition-all duration-200 z-30 bg-[#2D3436]/90 border border-white/10 backdrop-blur-md px-3 py-2 rounded-xl shadow-xl w-40 text-left">
                            <span className="font-extrabold text-[11px] text-white block leading-tight">{user.name}</span>
                            <span className="text-[9px] text-barter font-semibold block mt-0.5">{user.skills[0]?.name}</span>
                            <span className="text-[8px] text-white/50 block font-mono mt-1 pt-1 border-t border-white/5 uppercase">Distance: {pos.dist}</span>
                          </div>
                        </div>
                      );
                    })}

                    <span className="absolute bottom-3 text-[9px] font-bold text-white/40 tracking-wider uppercase font-mono z-20">Scanning 5km Range</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. UPI CHECKOUT PLAYGROUND */}
            {activeTab === 'upi' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-text mb-2">UPI Cashless Balance Settlement</h3>
                    <p className="text-sm text-text/70 leading-relaxed">
                      For trades that aren't perfectly equal in barter value, users settle small gaps (e.g. barter gap) via UPI natively.
                    </p>
                  </div>

                  <div className="bg-white/60 border border-card rounded-2xl p-5 shadow-sm space-y-4">
                    <span className="text-xs font-bold text-text/50 uppercase block">Simulate Settlement Trade</span>
                    
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-card">
                      <div>
                        <span className="font-bold block text-text/80">My Offer</span>
                        <span className="text-text/60">React Consulting (Valued ₹4,500)</span>
                      </div>
                      <span className="text-action font-extrabold font-mono shrink-0">+₹4,500</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pb-3 border-b border-card">
                      <div>
                        <span className="font-bold block text-text/80">Arjun's Offer</span>
                        <span className="text-text/60">Figma Design System (Valued ₹5,350)</span>
                      </div>
                      <span className="text-text/80 font-extrabold font-mono shrink-0">-₹5,350</span>
                    </div>

                    <div className="flex items-center justify-between font-extrabold text-sm pt-1">
                      <span className="text-text/80">Barter Gap Settlement Due</span>
                      <span className="text-action font-mono">₹850.00</span>
                    </div>
                  </div>
                </div>

                {/* Smartphone Checkout Frame Mockup */}
                <div className="flex justify-center items-center">
                  <div className="relative w-64 h-[350px] rounded-[36px] border-[6px] border-[#2D3436] bg-background shadow-2xl overflow-hidden flex flex-col justify-between select-none">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-[#2D3436] rounded-b-2xl z-20" />

                    <AnimatePresence mode="wait">
                      {upiStep === 'init' && (
                        <motion.div
                          key="upi-init"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-4 mt-6"
                        >
                          <div className="w-14 h-14 bg-action/10 rounded-full flex items-center justify-center text-action">
                            <CreditCard className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="font-extrabold text-sm block">UPI Checkout Portal</span>
                            <span className="text-xs text-text/60 block mt-1">Settle trade gap of ₹850.00</span>
                          </div>
                          <button
                            onClick={handleStartUPISettlement}
                            className="px-6 py-2.5 bg-action hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-sm focus:outline-none w-full"
                          >
                            Pay with UPI
                          </button>
                        </motion.div>
                      )}

                      {upiStep === 'qrcode' && (
                        <motion.div
                          key="upi-qrcode"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-4 mt-4"
                        >
                          <span className="text-[10px] font-bold text-text/50 uppercase tracking-widest">Scan QR Code</span>
                          
                          {/* QR Code Container */}
                          <div className="w-36 h-36 bg-white p-2.5 border border-card rounded-2xl relative shadow-md">
                            {/* Scanning bar */}
                            <motion.div
                              animate={{ top: ['8%', '88%', '8%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              className="absolute left-2.5 right-2.5 h-0.5 bg-action/40 shadow shadow-action/50 pointer-events-none"
                            />
                            {/* Mock QR lines */}
                            <div className="w-full h-full bg-gradient-to-br from-text/10 to-text/25 rounded-md flex items-center justify-center text-3xl opacity-85">
                              📱
                            </div>
                          </div>

                          <div>
                            <span className="font-extrabold text-xs block">UPI Payee ID: skillcircle@upi</span>
                            <span className="text-[10px] text-text/50 font-bold block mt-1">Amount: ₹850.00</span>
                          </div>

                          <button
                            onClick={handleSimulatePayment}
                            className="px-6 py-2 bg-barter text-text font-bold text-xs rounded-xl shadow-sm focus:outline-none w-full"
                          >
                            Simulate Payment Done
                          </button>
                        </motion.div>
                      )}

                      {upiStep === 'paying' && (
                        <motion.div
                          key="upi-paying"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-4 mt-6"
                        >
                          <div className="w-12 h-12 border-2 border-action border-t-transparent rounded-full animate-spin" />
                          <div>
                            <span className="font-extrabold text-sm block">Authorizing Ledger...</span>
                            <span className="text-xs text-text/50 block mt-1">Verifying NPCI response</span>
                          </div>
                        </motion.div>
                      )}

                      {upiStep === 'success' && (
                        <motion.div
                          key="upi-success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-3 mt-6"
                        >
                          <div className="w-12 h-12 bg-barter rounded-full flex items-center justify-center text-text shadow-md">
                            <Check className="w-6 h-6 font-bold" />
                          </div>
                          <div>
                            <span className="font-extrabold text-sm block">Payment Successful</span>
                            <span className="text-[10px] text-barter-600 font-extrabold block mt-0.5">₹850.00 settled</span>
                          </div>
                          <div className="text-[9px] bg-card px-2.5 py-1.5 rounded-lg border border-card font-mono text-text/60 mt-1 w-full text-center">
                            TXN: SCB8934J7298
                          </div>
                          <button
                            onClick={resetUPI}
                            className="text-xs text-action hover:underline font-bold mt-2"
                          >
                            Reset Checkout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom Home Indicator */}
                    <div className="w-24 h-1 bg-[#2D3436]/40 mx-auto mb-2 shrink-0 rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. SQUAD BIDDING PLAYGROUND */}
            {activeTab === 'squad' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-text mb-2">Squad Bidding Builder</h3>
                    <p className="text-sm text-text/70 leading-relaxed">
                      Combine forces with complementary creators. Bid for larger commercial projects together, sharing earnings and barter allocations.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-text/60 uppercase mb-2">Project Bid Objective</label>
                      <select 
                        value={projectTemplate}
                        onChange={(e) => setProjectTemplate(e.target.value as any)}
                        className="w-full bg-white border border-card rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-action"
                      >
                        <option value="saas">SaaS Startup Web App (Needs: React, Figma, Strategy)</option>
                        <option value="brand">Brand Identity Campaign (Needs: Figma, Strategy, Social)</option>
                        <option value="data">Data Analytics Platform (Needs: Python, UI/UX, Content)</option>
                      </select>
                    </div>

                    {/* Squad Selector list */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-bold text-text/50 uppercase">Assign Squad Slots</label>
                      
                      {/* Slot 1: Tech */}
                      <div className="flex items-center justify-between p-2.5 bg-white border border-card rounded-xl">
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-action" />
                          <span className="text-xs font-bold">Slot 1: Developer</span>
                        </div>
                        {squadSlots.tech ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-text/80">{squadSlots.tech.name}</span>
                            <button onClick={() => removeSquadMember('tech')} className="text-[10px] text-action font-extrabold font-sans">✕</button>
                          </div>
                        ) : (
                          <select
                            onChange={(e) => {
                              const user = mockUsers.find(u => u.id === e.target.value);
                              if (user) addSquadMember('tech', user);
                            }}
                            className="bg-card text-text/70 text-[10px] font-bold px-2 py-1.5 rounded-lg outline-none"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign Talent</option>
                            <option value="1">Riya Sharma (React)</option>
                            <option value="4">Vikram Reddy (Python)</option>
                          </select>
                        )}
                      </div>

                      {/* Slot 2: Design */}
                      <div className="flex items-center justify-between p-2.5 bg-white border border-card rounded-xl">
                        <div className="flex items-center gap-2">
                          <Layout className="w-4 h-4 text-barter-600" />
                          <span className="text-xs font-bold">Slot 2: Creative</span>
                        </div>
                        {squadSlots.design ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-text/80">{squadSlots.design.name}</span>
                            <button onClick={() => removeSquadMember('design')} className="text-[10px] text-action font-extrabold font-sans">✕</button>
                          </div>
                        ) : (
                          <select
                            onChange={(e) => {
                              const user = mockUsers.find(u => u.id === e.target.value);
                              if (user) addSquadMember('design', user);
                            }}
                            className="bg-card text-text/70 text-[10px] font-bold px-2 py-1.5 rounded-lg outline-none"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign Talent</option>
                            <option value="2">Arjun Patel (Figma)</option>
                          </select>
                        )}
                      </div>

                      {/* Slot 3: Growth */}
                      <div className="flex items-center justify-between p-2.5 bg-white border border-card rounded-xl">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-text/50" />
                          <span className="text-xs font-bold">Slot 3: Growth / Writer</span>
                        </div>
                        {squadSlots.growth ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-text/80">{squadSlots.growth.name}</span>
                            <button onClick={() => removeSquadMember('growth')} className="text-[10px] text-action font-extrabold font-sans">✕</button>
                          </div>
                        ) : (
                          <select
                            onChange={(e) => {
                              const user = mockUsers.find(u => u.id === e.target.value);
                              if (user) addSquadMember('growth', user);
                            }}
                            className="bg-card text-text/70 text-[10px] font-bold px-2 py-1.5 rounded-lg outline-none"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign Talent</option>
                            <option value="3">Priya Singh (Writing)</option>
                            <option value="5">Ananya Desai (SEO)</option>
                          </select>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

                {/* Squad Analytics Panel */}
                <div className="bg-white/60 border border-card rounded-2xl p-6 shadow-inner min-h-[300px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-text/50 uppercase block">Squad Synergy Dashboard</span>
                    
                    {/* Selected members list preview */}
                    <div className="flex gap-2">
                      {Object.entries(squadSlots).map(([role, user]) => (
                        <div key={role} className="flex-1 text-center bg-white p-3 border border-card rounded-xl min-h-[85px] flex flex-col justify-center items-center">
                          {user ? (
                            <>
                              <div className="w-9 h-9 rounded-full overflow-hidden border border-card shadow-soft mb-1 shrink-0">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[10px] font-bold text-text truncate w-full">{user.name.split(' ')[0]}</span>
                            </>
                          ) : (
                            <>
                              <div className="w-9 h-9 rounded-full border border-dashed border-card bg-card/10 flex items-center justify-center text-text/30 mb-1 shrink-0">
                                ?
                              </div>
                              <span className="text-[9px] text-text/40 font-bold uppercase">Empty</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-white p-3 border border-card rounded-xl">
                        <span className="text-[10px] text-text/45 uppercase font-bold tracking-wider block">Synergy Score</span>
                        <span className="text-2xl font-extrabold text-action mt-0.5 block">{squadSynergy}%</span>
                      </div>
                      <div className="bg-white p-3 border border-card rounded-xl">
                        <span className="text-[10px] text-text/45 uppercase font-bold tracking-wider block">Combined Trust</span>
                        <span className="text-2xl font-extrabold text-barter mt-0.5 block">{squadTrust}/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-card">
                    <button
                      disabled={!squadSlots.tech || !squadSlots.design || !squadSlots.growth}
                      onClick={() => alert(`Squad successfully formed with Synergy Score ${squadSynergy}%! Proposal locked for project template.`)}
                      className="w-full py-2.5 bg-[#2D3436] hover:bg-[#2D3436]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      Submit Combined Project Bid
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </section>

      </div>

      {/* Confetti floating layout (for successful payments etc) */}
      <AnimatePresence>
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(30)].map((_, i) => {
              const left = Math.random() * 100;
              const delay = Math.random() * 0.6;
              const duration = Math.random() * 2 + 2;
              const color = ['#DC9B9B', '#C0E1D2', '#F6F4E8', '#E5EEE4'][i % 4];
              const size = Math.random() * 8 + 6;

              return (
                <motion.div
                  key={i}
                  initial={{ top: '-10%', left: `${left}%`, rotate: 0 }}
                  animate={{ top: '110%', rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration, delay, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: i % 2 === 0 ? '50%' : '0%',
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
      
      {/* Styles for rotating sweeping radar and infinite background spinner */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}