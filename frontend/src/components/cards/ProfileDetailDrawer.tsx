'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, Play, Pause, Volume2, VolumeX, 
  Award, ArrowLeftRight, MapPin, ExternalLink, 
  Briefcase, ShieldCheck, Check, Star
} from 'lucide-react';
import { User } from '@/models/User';
import { HexagonalTrustRadar } from '@/components/ui/HexagonalTrustRadar';

interface ProfileDetailDrawerProps {
  user: User | null;
  onClose: () => void;
}

const pitchCaptions: Record<string, string> = {
  '1': "Hi there! I'm Riya. I specialize in building robust React and Node.js applications. Right now, I'm building a community platform and need a UI/UX wizard to design the dashboard. Let's swap skills!",
  '2': "Hey! Arjun here. I create high-fidelity UI designs and design systems in Figma. I'm looking for a frontend developer who can help me turn my personal design portfolio into a clean React site. Let's connect!",
  '3': "Hello! I'm Priya. I write clear, high-converting tech articles and strategy copy. I'd love to swap my writing services with someone who can set up SEO tracking and optimize my website search ranks.",
  '4': "Hey, Vikram here. I build ML models and clean Python data pipelines. I'm currently launching a project and need a web developer to build a basic user landing page. Let's trade React for Python!",
  '5': "Hi! I'm Ananya. I'm a growth marketer specialized in social media campaigns and SEO. I'm looking for a video editor to help me create short-form content for my brand channels. Let's collaborate!"
};

const compatibilityScores: Record<string, number> = {
  '1': 96,
  '2': 94,
  '3': 90,
  '4': 88,
  '5': 92
};

const TypedCaption: React.FC<{ text: string; isPlaying: boolean }> = ({ text, isPlaying }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!isPlaying) return;
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
    <p className="text-text font-medium leading-relaxed italic text-sm md:text-base min-h-[60px]">
      "{displayedText || '...'}"
    </p>
  );
};

export const ProfileDetailDrawer: React.FC<ProfileDetailDrawerProps> = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pitch' | 'swap' | 'radar' | 'portfolio'>('pitch');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [proposalState, setProposalState] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    setProposalState('idle');
    setActiveTab('pitch');
    setIsPlaying(true);
  }, [user]);

  if (!user) return null;

  const handleProposeSwap = () => {
    setProposalState('sending');
    setTimeout(() => {
      setProposalState('sent');
    }, 1600);
  };

  return (
    <AnimatePresence>
      {user && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[620px] bg-background border-l border-card shadow-2xl z-50 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-card bg-card/30 flex justify-between items-center sticky top-0 backdrop-blur-md z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-white shadow-soft shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-2xl font-heading font-bold text-text">{user.name}</h3>
                    {user.isVerified && (
                      <ShieldCheck className="w-5.5 h-5.5 text-action fill-action/5" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-text/60 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-action" />
                    <span>{user.location.city}, {user.location.state}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 bg-card/40 rounded-full hover:bg-card text-text/60 hover:text-text transition-all focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-card bg-white px-2 py-1 sticky top-[97px] z-10 shadow-sm">
              {[
                { id: 'pitch', label: '15s Pitch', icon: Play },
                { id: 'swap', label: 'Skills Swap', icon: ArrowLeftRight },
                { id: 'radar', label: 'Reputation Radar', icon: Award },
                { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold border-b-2 transition-all focus:outline-none ${
                      isActive
                        ? 'border-action text-action'
                        : 'border-transparent text-text/55 hover:text-text hover:bg-card/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Body */}
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div className="mb-8 flex-1">
                
                {/* PITCH TAB */}
                {activeTab === 'pitch' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    {/* Mock Video Pitch Simulator */}
                    <div className="w-full aspect-video bg-text/95 rounded-2xl relative overflow-hidden shadow-xl border border-text/10 mb-6 flex flex-col items-center justify-center select-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#2D3436] to-black opacity-90" />
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                      <div className="absolute left-0 w-full h-0.5 bg-action/25 shadow-lg shadow-action/50 scanning-line pointer-events-none" />

                      {isPlaying && (
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-black/60 text-white text-[10px] uppercase font-extrabold rounded-full tracking-widest border border-white/10">
                          <span className="w-2 h-2 bg-[#E57373] rounded-full animate-ping" />
                          <span>REC</span>
                        </div>
                      )}

                      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-black/60 text-white/95 text-xs font-mono rounded-md border border-white/5">
                        0:15 / PITCH
                      </div>

                      <motion.div 
                        className="z-10 w-24 h-24 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl relative"
                        animate={isPlaying ? {
                          scale: [1, 1.03, 1],
                          borderColor: ['rgba(255,255,255,0.8)', 'rgba(220,155,155,0.9)', 'rgba(255,255,255,0.8)']
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover filter brightness-95" />
                      </motion.div>

                      <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
                        <div className="flex gap-1 h-8 items-end bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
                          <div className={`w-1 h-full bg-barter rounded-full ${isPlaying ? 'eq-bar' : 'h-1.5'}`} />
                          <div className={`w-1 h-full bg-barter rounded-full ${isPlaying ? 'eq-bar' : 'h-2'}`} />
                          <div className={`w-1 h-full bg-barter rounded-full ${isPlaying ? 'eq-bar' : 'h-1'}`} />
                          <div className={`w-1 h-full bg-barter rounded-full ${isPlaying ? 'eq-bar' : 'h-3'}`} />
                          <div className={`w-1 h-full bg-barter rounded-full ${isPlaying ? 'eq-bar' : 'h-1.5'}`} />
                          <div className={`w-1 h-full bg-barter rounded-full ${isPlaying ? 'eq-bar' : 'h-0.5'}`} />
                        </div>
                        <span className="text-[10px] text-white/50 font-mono tracking-wide">fps: 60.00</span>
                      </div>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute z-20 w-16 h-16 bg-white/95 hover:bg-white text-action rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all focus:outline-none"
                      >
                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                      </button>
                    </div>

                    <div className="bg-card/35 border border-card rounded-2xl p-5 w-full">
                      <div className="flex items-center gap-2 mb-2.5">
                        <Sparkles className="w-4.5 h-4.5 text-action" />
                        <span className="text-xs uppercase tracking-widest font-bold text-text/60">Pitch Subtitles</span>
                      </div>
                      <TypedCaption 
                        text={pitchCaptions[user.id] || "Hello! Let's swap skills and build something beautiful together."} 
                        isPlaying={isPlaying} 
                      />
                    </div>
                  </motion.div>
                )}

                {/* SKILLS SWAP TAB */}
                {activeTab === 'swap' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-heading font-bold text-text">Skill Swap Configuration</h4>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-barter/40 border border-barter/75 rounded-full">
                        <Star className="w-3.5 h-3.5 text-text fill-text" />
                        <span className="text-xs font-bold text-text">{compatibilityScores[user.id] || 85}% Match</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 items-center gap-3 bg-card/25 p-5 border border-card/65 rounded-2xl">
                      <div className="col-span-2 space-y-3">
                        <div className="bg-barter/35 border border-barter/70 text-text/80 text-[10px] uppercase font-extrabold tracking-wider py-2 rounded-xl text-center shadow-sm">
                          Creator Offers
                        </div>
                        {user.skills.map((skill) => (
                          <div key={skill.id} className="bg-white p-3.5 rounded-xl border border-card/70 shadow-sm flex flex-col gap-1.5">
                            <span className="text-sm font-bold text-text leading-tight">{skill.name}</span>
                            <span className="text-[9px] font-bold text-action bg-action/10 self-start px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {skill.level}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="col-span-1 flex flex-col items-center justify-center">
                        <motion.div 
                          className="w-12 h-12 bg-card rounded-full border border-card flex items-center justify-center shadow-md cursor-pointer"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        >
                          <ArrowLeftRight className="w-5 h-5 text-action" />
                        </motion.div>
                        <span className="text-[8px] uppercase tracking-wider font-extrabold text-text/30 mt-2 text-center">Cashless Swap</span>
                      </div>

                      <div className="col-span-2 space-y-3">
                        <div className="bg-action/20 border border-action/40 text-text/80 text-[10px] uppercase font-extrabold tracking-wider py-2 rounded-xl text-center shadow-sm">
                          Creator Wants
                        </div>
                        {user.wants.map((want) => (
                          <div key={want.id} className="bg-white p-3.5 rounded-xl border border-card/70 shadow-sm flex flex-col gap-1.5">
                            <span className="text-sm font-bold text-text leading-tight">{want.name}</span>
                            <span className="text-[9px] font-bold text-text/50 self-start bg-card/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Swap Exchange
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-card p-4.5 rounded-2xl shadow-soft flex gap-3.5 items-start mt-6">
                      <Sparkles className="w-5.5 h-5.5 text-action shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold block text-text text-sm mb-0.5">Complementary Matching Engine</span>
                        <span className="text-xs text-text/70 leading-relaxed block">
                          We cross-examine the skills they want against your current credentials. A higher match rating guarantees quick agreement and higher reputation points.
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TRUST RADAR TAB */}
                {activeTab === 'radar' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center space-y-6"
                  >
                    <div className="w-full flex justify-between items-center">
                      <h4 className="text-lg font-heading font-bold text-text">Reputation Matrix</h4>
                      <span className="text-xs font-semibold text-text/60">Verified Credentials</span>
                    </div>
                    
                    <div className="bg-white border border-card rounded-3xl p-6 shadow-soft w-full flex justify-center border-card/50">
                      <HexagonalTrustRadar trustScore={user.trustScore} size="md" />
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full">
                      <div className="bg-card/25 p-3 rounded-xl border border-card/50 text-center">
                        <span className="text-lg font-extrabold text-action block">{user.trustScore.quality}%</span>
                        <span className="text-[9px] text-text/55 uppercase tracking-wider block font-bold mt-1">Quality</span>
                      </div>
                      <div className="bg-card/25 p-3 rounded-xl border border-card/50 text-center">
                        <span className="text-lg font-extrabold text-barter-600 block">{user.trustScore.speed}%</span>
                        <span className="text-[9px] text-text/55 uppercase tracking-wider block font-bold mt-1">Speed</span>
                      </div>
                      <div className="bg-card/25 p-3 rounded-xl border border-card/50 text-center">
                        <span className="text-lg font-extrabold text-text/75 block">{user.trustScore.barterHistory}%</span>
                        <span className="text-[9px] text-text/55 uppercase tracking-wider block font-bold mt-1">History</span>
                      </div>
                      <div className="bg-card/25 p-3 rounded-xl border border-card/50 text-center">
                        <span className="text-lg font-extrabold text-action block">{user.trustScore.reliability}%</span>
                        <span className="text-[9px] text-text/55 uppercase tracking-wider block font-bold mt-1">Reliability</span>
                      </div>
                      <div className="bg-card/25 p-3 rounded-xl border border-card/50 text-center">
                        <span className="text-lg font-extrabold text-barter-600 block">{user.trustScore.communication}%</span>
                        <span className="text-[9px] text-text/55 uppercase tracking-wider block font-bold mt-1">Comms</span>
                      </div>
                      <div className="bg-card/25 p-3 rounded-xl border border-card/50 text-center">
                        <span className="text-lg font-extrabold text-text/75 block">{user.trustScore.cooperation}%</span>
                        <span className="text-[9px] text-text/55 uppercase tracking-wider block font-bold mt-1">Cooperation</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PORTFOLIO TAB */}
                {activeTab === 'portfolio' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h4 className="text-lg font-heading font-bold text-text">Featured Portfolio</h4>

                    <div className="space-y-4">
                      {user.portfolio?.projects?.map((project) => (
                        <div key={project.id} className="bg-white border border-card rounded-2xl overflow-hidden shadow-soft flex flex-col sm:flex-row group transition-all hover:shadow-md">
                          <div className="w-full sm:w-1/3 aspect-video sm:aspect-auto sm:h-36 relative overflow-hidden bg-card shrink-0">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h5 className="font-bold text-text text-sm mb-1 group-hover:text-action transition-colors">{project.title}</h5>
                              <p className="text-xs text-text/70 line-clamp-2 leading-relaxed mb-3">
                                {project.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.map((tag) => (
                                  <span key={tag} className="text-[9px] bg-card text-text/80 px-2 py-0.5 rounded-full font-bold">
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4 border-t border-card pt-4.5 justify-end">
                      {user.portfolio?.github && (
                        <a
                          href={user.portfolio.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-text/60 hover:text-action flex items-center gap-1.5 transition-all font-semibold"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Github Portfolio</span>
                        </a>
                      )}
                      {user.portfolio?.behance && (
                        <a
                          href={user.portfolio.behance}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-text/60 hover:text-action flex items-center gap-1.5 transition-all font-semibold"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Behance Profile</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Footer */}
              <div className="border-t border-card pt-6 bg-white sticky bottom-0">
                <AnimatePresence mode="wait">
                  {proposalState === 'idle' && (
                    <motion.button
                      key="propose-btn"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      onClick={handleProposeSwap}
                      className="w-full py-4 bg-action hover:opacity-95 text-white rounded-full font-bold shadow-lg shadow-soft-rose transition-all flex items-center justify-center gap-2 group focus:outline-none"
                    >
                      <ArrowLeftRight className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Propose Barter Swap</span>
                    </motion.button>
                  )}

                  {proposalState === 'sending' && (
                    <motion.div
                      key="sending-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full py-4 bg-card text-text/80 rounded-full font-bold shadow-inner border border-card/85 flex items-center justify-center gap-3"
                    >
                      <div className="w-5 h-5 border-2 border-action border-t-transparent rounded-full animate-spin" />
                      <span>Generating Proposal Package...</span>
                    </motion.div>
                  )}

                  {proposalState === 'sent' && (
                    <motion.div
                      key="success-btn"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full p-4.5 bg-barter/25 border border-barter rounded-2xl flex items-start gap-3.5 text-text"
                    >
                      <div className="w-9 h-9 rounded-full bg-barter flex items-center justify-center shrink-0 shadow-md">
                        <Check className="w-4.5 h-4.5 text-text font-extrabold" />
                      </div>
                      <div>
                        <span className="font-extrabold block text-sm mb-0.5 text-text">Swap Proposal Dispatched!</span>
                        <span className="text-xs text-text/70 leading-relaxed block">
                          We've matched your profiles and sent a notification to {user.name}. You'll receive a match alert when they accept.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
