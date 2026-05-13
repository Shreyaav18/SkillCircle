'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../models/User';
import { SkillLevel } from '../../models/User';

interface ProfileCardProps {
  user: User;
  onClick?: () => void;
  className?: string;
}

const skillLevelColors: Record<SkillLevel, string> = {
  [SkillLevel.BEGINNER]: 'bg-barter/20 text-barter',
  [SkillLevel.INTERMEDIATE]: 'bg-barter/40 text-barter',
  [SkillLevel.ADVANCED]: 'bg-action/20 text-action',
  [SkillLevel.EXPERT]: 'bg-action/40 text-action'
};

const skillLevelLabels: Record<SkillLevel, string> = {
  [SkillLevel.BEGINNER]: 'Beginner',
  [SkillLevel.INTERMEDIATE]: 'Intermediate',
  [SkillLevel.ADVANCED]: 'Advanced',
  [SkillLevel.EXPERT]: 'Expert'
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClick, className }) => {
  return (
    <motion.div
      className={`bg-card rounded-2xl p-6 shadow-soft hover:shadow-soft-rose transition-all duration-300 cursor-pointer group ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-barter/20 flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-heading text-text">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-action rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-text mb-1">
            {user.name}
          </h3>
          <p className="text-sm text-text/70 line-clamp-2">{user.bio}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-text/60">
              {user.location.city}, {user.location.state}
            </span>
            {user.hourlyRate && (
              <span className="text-xs font-medium text-action">
                ₹{user.hourlyRate}/hr
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Trust Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text/80">Trust Score</span>
          <span className="text-lg font-semibold text-action">{user.trustScore.overall}/100</span>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-2 bg-card/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-action"
              style={{ width: `${user.trustScore.quality}%` }}
            />
          </div>
          <div className="flex-1 h-2 bg-card/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-barter"
              style={{ width: `${user.trustScore.speed}%` }}
            />
          </div>
          <div className="flex-1 h-2 bg-card/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-text/50"
              style={{ width: `${user.trustScore.barterHistory}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text/60">Quality</span>
          <span className="text-xs text-text/60">Speed</span>
          <span className="text-xs text-text/60">Barter</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <span className="text-sm font-medium text-text/80 block mb-2">Skills</span>
        <div className="flex flex-wrap gap-2">
          {user.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${skillLevelColors[skill.level]}`}
            >
              {skill.name} ({skillLevelLabels[skill.level]})
            </span>
          ))}
          {user.skills.length > 3 && (
            <span className="px-3 py-1 bg-card/50 text-xs font-medium text-text rounded-full">
              +{user.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Wants */}
      {user.wants.length > 0 && (
        <div>
          <span className="text-sm font-medium text-text/80 block mb-2">Looking for</span>
          <div className="flex flex-wrap gap-2">
            {user.wants.slice(0, 2).map((want, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-barter text-xs font-medium text-text rounded-full"
              >
                {want.name}
              </span>
            ))}
            {user.wants.length > 2 && (
              <span className="px-3 py-1 bg-card/50 text-xs font-medium text-text rounded-full">
                +{user.wants.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};