'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../models/User';
import { SkillLevel } from '../../models/User';
import { ShieldCheck, MapPin, Sparkles, Star } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  onClick?: () => void;
  className?: string;
}

const skillLevelColors: Record<SkillLevel, string> = {
  [SkillLevel.BEGINNER]: 'bg-barter/15 text-text/80 border-barter/30',
  [SkillLevel.INTERMEDIATE]: 'bg-barter/30 text-text/90 border-barter/50',
  [SkillLevel.ADVANCED]: 'bg-action/15 text-action border-action/30',
  [SkillLevel.EXPERT]: 'bg-action/35 text-white border-action/50'
};

const skillLevelLabels: Record<SkillLevel, string> = {
  [SkillLevel.BEGINNER]: 'Beg',
  [SkillLevel.INTERMEDIATE]: 'Int',
  [SkillLevel.ADVANCED]: 'Adv',
  [SkillLevel.EXPERT]: 'Exp'
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClick, className }) => {
  return (
    <motion.div
      className={`bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-card/60 shadow-soft hover:shadow-soft-rose hover:border-action/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full relative overflow-hidden ${className || ''}`}
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onClick}
    >
      {/* Background radial glow */}
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-action/5 rounded-full blur-xl group-hover:bg-action/10 transition-colors pointer-events-none" />
      
      <div>
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-barter to-action/40 p-0.5 shadow-md overflow-hidden group-hover:scale-105 transition-transform duration-300">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-text/60">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 bg-action rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <span className="text-white text-[10px] font-bold">✓</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="text-base font-bold text-text truncate group-hover:text-action transition-colors">
                {user.name}
              </h3>
              {user.isVerified && <ShieldCheck className="w-4.5 h-4.5 text-action fill-action/5 shrink-0" />}
            </div>
            <div className="flex items-center gap-1 text-xs text-text/55 font-medium">
              <MapPin className="w-3 h-3 text-action shrink-0" />
              <span className="truncate">{user.location.city}, {user.location.state}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-text/75 leading-relaxed line-clamp-3 mb-5 min-h-[54px]">
          {user.bio}
        </p>

        {/* Trust Score Panel */}
        <div className="bg-white/80 border border-card/45 p-3.5 rounded-2xl mb-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-text/65 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-action" />
              Reputation
            </span>
            <div className="flex items-center gap-0.5 text-xs font-extrabold text-action">
              <span>{user.trustScore.overall}</span>
              <span className="text-[10px] text-text/40">/100</span>
            </div>
          </div>
          
          <div className="flex gap-1 h-1.5 bg-card/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-action to-action/80 rounded-full"
              style={{ width: `${user.trustScore.quality}%` }}
              title={`Quality: ${user.trustScore.quality}%`}
            />
            <div
              className="h-full bg-gradient-to-r from-barter-600 to-barter-500 rounded-full"
              style={{ width: `${user.trustScore.speed}%` }}
              title={`Speed: ${user.trustScore.speed}%`}
            />
            <div
              className="h-full bg-[#8DA59E] rounded-full"
              style={{ width: `${user.trustScore.barterHistory}%` }}
              title={`Barter History: ${user.trustScore.barterHistory}%`}
            />
          </div>
          
          <div className="flex justify-between text-[8px] text-text/45 font-bold uppercase tracking-wider mt-1.5">
            <span>Quality</span>
            <span>Speed</span>
            <span>History</span>
          </div>
        </div>
      </div>

      {/* Skills list */}
      <div>
        <div className="mb-4">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-text/50 block mb-2">Capabilities</span>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${skillLevelColors[skill.level]}`}
              >
                {skill.name} • {skillLevelLabels[skill.level]}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="px-2 py-1 bg-card/60 border border-card/40 text-[9px] font-bold text-text/75 rounded-full">
                +{user.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Wants list */}
        {user.wants.length > 0 && (
          <div className="border-t border-card/30 pt-3.5 mt-1.5">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-text/50 block mb-2">Exchange Seek</span>
            <div className="flex flex-wrap gap-1.5">
              {user.wants.slice(0, 2).map((want, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-barter/25 border border-barter/50 text-[10px] font-bold text-text/80 rounded-full"
                >
                  🔍 {want.name}
                </span>
              ))}
              {user.wants.length > 2 && (
                <span className="px-2 py-1 bg-card/60 border border-card/40 text-[9px] font-bold text-text/75 rounded-full">
                  +{user.wants.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};