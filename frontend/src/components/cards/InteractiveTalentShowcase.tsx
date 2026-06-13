'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { mockUsers } from '@/lib/constants/mockData';
import { User } from '@/models/User';
import { ProfileDetailDrawer } from '@/components/cards/ProfileDetailDrawer';

// Node coordinates in constellation grid
const nodePositions = [
  { left: '15%', top: '22%' }, // Node 0 (Riya)
  { left: '46%', top: '48%' }, // Node 1 (Arjun) - Center
  { left: '78%', top: '18%' }, // Node 2 (Priya)
  { left: '26%', top: '78%' }, // Node 3 (Vikram)
  { left: '74%', top: '74%' }, // Node 4 (Ananya)
];

export const InteractiveTalentShowcase: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hoveredUser, setHoveredUser] = useState<User | null>(null);

  // Categories map
  const categories = [
    { label: 'All Talent', value: 'ALL' },
    { label: 'Developers', value: 'CODING' },
    { label: 'Designers', value: 'DESIGN' },
    { label: 'Writers', value: 'WRITING' },
    { label: 'Marketers', value: 'MARKETING' }
  ];

  // Map category to users
  const isUserInCategory = (user: User, category: string) => {
    if (category === 'ALL') return true;
    return user.skills.some(skill => skill.category === category);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Morphing Liquid CSS definitions */}
      <style jsx global>{`
        @keyframes morphBlob {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .liquid-bubble {
          animation: morphBlob 12s ease-in-out infinite;
        }
        .liquid-bubble-fast {
          animation: morphBlob 7s ease-in-out infinite;
        }
        @keyframes flowDash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-flow-dash {
          animation: flowDash 1s linear infinite;
        }
        @keyframes equalizer {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1); }
        }
        .eq-bar {
          animation: equalizer 0.75s ease-in-out infinite;
          transform-origin: bottom;
        }
        .eq-bar:nth-child(2) { animation-delay: 0.15s; animation-duration: 0.6s; }
        .eq-bar:nth-child(3) { animation-delay: 0.3s; animation-duration: 0.9s; }
        .eq-bar:nth-child(4) { animation-delay: 0.1s; animation-duration: 0.7s; }
        .eq-bar:nth-child(5) { animation-delay: 0.25s; animation-duration: 0.8s; }
        .eq-bar:nth-child(6) { animation-delay: 0.4s; animation-duration: 0.5s; }
      `}</style>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 z-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${
              selectedCategory === cat.value
                ? 'bg-action border-action text-white shadow-soft-rose scale-105'
                : 'bg-card border-card/45 text-text/80 hover:bg-card/80 hover:text-text'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Constellation Container */}
      <div className="relative w-full max-w-5xl h-[540px] bg-gradient-to-b from-card/30 to-card/10 rounded-3xl border border-card/60 shadow-soft overflow-hidden flex items-center justify-center p-6 mb-8">
        
        {/* Animated Background Constellation SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0">
          <line x1="15%" y1="22%" x2="46%" y2="48%" stroke="#DC9B9B" strokeWidth="2" strokeDasharray="6,4" className="animate-flow-dash" />
          <line x1="78%" y1="18%" x2="46%" y2="48%" stroke="#C0E1D2" strokeWidth="2" strokeDasharray="6,4" className="animate-flow-dash" />
          <line x1="26%" y1="78%" x2="46%" y2="48%" stroke="#C0E1D2" strokeWidth="2" strokeDasharray="6,4" className="animate-flow-dash" />
          <line x1="74%" y1="74%" x2="46%" y2="48%" stroke="#DC9B9B" strokeWidth="2" strokeDasharray="6,4" className="animate-flow-dash" />
          
          <line x1="15%" y1="22%" x2="26%" y2="78%" stroke="#2D3436" strokeWidth="1" strokeDasharray="4,6" opacity="0.4" />
          <line x1="78%" y1="18%" x2="74%" y2="74%" stroke="#2D3436" strokeWidth="1" strokeDasharray="4,6" opacity="0.4" />
          <line x1="15%" y1="22%" x2="78%" y2="18%" stroke="#2D3436" strokeWidth="0.7" strokeDasharray="8,8" opacity="0.3" />
        </svg>

        {/* Floating background instructions */}
        <div className="absolute top-4 left-6 text-xs text-text/50 font-medium flex items-center gap-1.5 z-0">
          <Sparkles className="w-3.5 h-3.5 text-action animate-pulse" />
          <span>India's top bartering creators</span>
        </div>

        {/* Global Sound Control Overlay */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-soft border border-card hover:bg-white text-text/85 transition-all flex items-center gap-2"
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5 text-action" /> : <Volume2 className="w-4.5 h-4.5 text-barter-600" />}
            <span className="text-xs font-bold uppercase tracking-wider">{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>
        </div>

        {/* Hover user details floating tooltip preview */}
        <AnimatePresence>
          {hoveredUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              style={{
                position: 'absolute',
                left: nodePositions[mockUsers.findIndex(u => u.id === hoveredUser.id)].left,
                top: `calc(${nodePositions[mockUsers.findIndex(u => u.id === hoveredUser.id)].top} - 105px)`,
                transform: 'translateX(-50%)',
              }}
              className="z-30 pointer-events-none bg-background/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-card shadow-2xl flex flex-col gap-1.5 w-60 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-text text-sm">{hoveredUser.name}</span>
                {hoveredUser.isVerified && <ShieldCheck className="w-4 h-4 text-action fill-action/10" />}
              </div>
              <p className="text-[10px] text-text/70 line-clamp-2">{hoveredUser.bio}</p>
              <div className="flex justify-between items-center mt-1 border-t border-card/40 pt-1.5">
                <span className="text-[10px] bg-action/10 text-action px-2 py-0.5 rounded-full font-bold uppercase">
                  {hoveredUser.skills[0]?.name}
                </span>
                <span className="text-[10px] text-text/50 font-semibold flex items-center gap-0.5">
                  ★ {hoveredUser.trustScore.overall}/100 Trust
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Constellation Nodes */}
        {mockUsers.map((user, idx) => {
          const position = nodePositions[idx];
          const isMatched = isUserInCategory(user, selectedCategory);
          const isHovered = hoveredUser?.id === user.id;

          return (
            <motion.div
              key={user.id}
              style={{
                position: 'absolute',
                left: position.left,
                top: position.top,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                y: [0, idx % 2 === 0 ? -15 : 15, 0],
                x: [0, idx % 3 === 0 ? 10 : -10, 0],
                opacity: isMatched ? 1 : 0.12,
                scale: isMatched ? (isHovered ? 1.15 : 1.0) : 0.82,
              }}
              transition={{
                y: {
                  duration: 7 + (idx * 0.4),
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                x: {
                  duration: 6 + (idx * 0.6),
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: { duration: 0.35 },
                scale: { type: 'spring', stiffness: 350, damping: 18 }
              }}
              className={`z-10 ${isMatched ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}`}
              onMouseEnter={() => isMatched && setHoveredUser(user)}
              onMouseLeave={() => setHoveredUser(null)}
              onClick={() => isMatched && setSelectedUser(user)}
            >
              <div className="relative flex flex-col items-center">
                
                {/* Glowing bubble halo */}
                <div className={`absolute -inset-1 rounded-full bg-gradient-to-tr from-action to-barter opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-30 blur-md' : ''}`} />

                {/* Avatar container */}
                <div 
                  className={`w-28 h-28 p-1.5 transition-all duration-500 overflow-hidden flex items-center justify-center shadow-lg ${
                    isHovered 
                      ? 'bg-gradient-to-tr from-action to-barter scale-105 shadow-action/20' 
                      : 'bg-card border-[3px] border-white'
                  } ${idx % 2 === 0 ? 'liquid-bubble shadow-soft' : 'liquid-bubble-fast shadow-soft'}`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{ borderRadius: 'inherit' }}
                  />

                  {/* Play Equalizer Hover Overlay */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-1.5" style={{ borderRadius: 'inherit' }}>
                      <Play className="w-6 h-6 text-white fill-white animate-pulse" />
                      
                      {/* Equalizer animation */}
                      <div className="flex gap-0.5 h-3.5 items-end">
                        <div className="w-0.5 h-full bg-white/90 rounded-full eq-bar" />
                        <div className="w-0.5 h-full bg-white/90 rounded-full eq-bar" />
                        <div className="w-0.5 h-full bg-white/90 rounded-full eq-bar" />
                        <div className="w-0.5 h-full bg-white/90 rounded-full eq-bar" />
                        <div className="w-0.5 h-full bg-white/90 rounded-full eq-bar" />
                        <div className="w-0.5 h-full bg-white/90 rounded-full eq-bar" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Pulsating badge */}
                <div className="absolute top-1 right-1 w-6.5 h-6.5 bg-barter text-text rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-text animate-pulse" />
                </div>

                {/* User Tag */}
                <div className="mt-3 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full shadow-md border border-card/70 flex flex-col items-center text-center max-w-[125px]">
                  <span className="text-[11px] font-extrabold text-text truncate w-full">{user.name.split(' ')[0]}</span>
                  <span className="text-[9px] text-text/50 truncate w-full font-medium">{user.skills[0]?.name}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="absolute bottom-4 left-6 text-[10px] text-text/45 font-semibold z-0 tracking-wider uppercase">
          ✦ Hover nodes to preview • Click to inspect & initiate swap
        </div>
      </div>

      {/* Drawer Detail Panel */}
      <ProfileDetailDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};
