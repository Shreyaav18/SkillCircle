'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gig } from '../../models/Gig';
import { mockUsers } from '../../lib/constants/mockData';
import { SkillCategory } from '../../models/User';

interface GigCardProps {
  gig: Gig;
  onClick?: () => void;
}

const categoryIcons: Record<SkillCategory, string> = {
  [SkillCategory.CODING]: '💻',
  [SkillCategory.DESIGN]: '🎨',
  [SkillCategory.WRITING]: '✍️',
  [SkillCategory.MARKETING]: '📈',
  [SkillCategory.BUSINESS]: '💼',
  [SkillCategory.OTHER]: '🔧'
};

export const GigCard: React.FC<GigCardProps> = ({ gig, onClick }) => {
  const postedBy = mockUsers.find(user => user.id === gig.postedBy);
  const budgetText = gig.budget.type === 'fixed'
    ? `₹${gig.budget.min.toLocaleString()} - ₹${gig.budget.max.toLocaleString()}`
    : `₹${gig.budget.min.toLocaleString()} - ₹${gig.budget.max.toLocaleString()}/hr`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-soft-rose transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{categoryIcons[gig.category]}</span>
            <h3 className="text-lg font-heading font-semibold text-text group-hover:text-action transition-colors">
              {gig.title}
            </h3>
          </div>
          <p className="text-sm text-text/70 line-clamp-2">{gig.description}</p>
        </div>
      </div>

      {/* Budget */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text/80">Budget</span>
          <span className="text-lg font-semibold text-action">₹{gig.budget.min.toLocaleString()}</span>
        </div>
        {gig.budget.type === 'range' && (
          <span className="text-sm text-text/60">to ₹{gig.budget.max.toLocaleString()}</span>
        )}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <span className="text-sm font-medium text-text/80 block mb-2">Skills Needed</span>
        <div className="flex flex-wrap gap-2">
          {gig.skillsRequired.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-barter/50 text-xs font-medium text-text rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-card/50">
        <div className="flex items-center gap-2">
          {postedBy?.avatar && (
            <img
              src={postedBy.avatar}
              alt={postedBy.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span className="text-sm text-text/70">{postedBy?.name}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-text/60 block">{gig.duration.estimatedHours} hrs</span>
          <span className="text-xs text-text/60">
            {gig.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};