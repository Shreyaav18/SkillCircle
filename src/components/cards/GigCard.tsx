'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gig, Urgency } from '../../models/Gig';
import { mockUsers } from '../../lib/constants/mockData';
import { SkillCategory } from '../../models/User';
import { Calendar, Clock, Sparkles } from 'lucide-react';

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

const categoryBadgeStyles: Record<SkillCategory, string> = {
  [SkillCategory.CODING]: 'bg-action/10 text-action border-action/20',
  [SkillCategory.DESIGN]: 'bg-barter/30 text-text border-barter/50',
  [SkillCategory.WRITING]: 'bg-[#C5C5FF]/20 text-[#6C5CE7] border-[#C5C5FF]/40',
  [SkillCategory.MARKETING]: 'bg-barter/15 text-[#2B7A78] border-barter/30',
  [SkillCategory.BUSINESS]: 'bg-[#FAD390]/15 text-[#E58E26] border-[#FAD390]/30',
  [SkillCategory.OTHER]: 'bg-card text-text/70 border-card/60'
};

export const GigCard: React.FC<GigCardProps> = ({ gig, onClick }) => {
  const postedBy = mockUsers.find(user => user.id === gig.postedBy);
  const budgetText = gig.budget.min.toLocaleString();
  const isHighUrgency = gig.urgency === Urgency.HIGH;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-card/60 shadow-soft hover:shadow-soft-rose hover:border-action/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full relative overflow-hidden"
      onClick={onClick}
    >
      {/* Background glowing corner */}
      <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-barter/10 rounded-full blur-xl group-hover:bg-barter/15 transition-colors pointer-events-none" />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between mb-4.5">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${categoryBadgeStyles[gig.category]}`}>
            <span>{categoryIcons[gig.category]}</span>
            <span className="uppercase tracking-wider">{gig.category}</span>
          </div>

          {/* Urgent Badge */}
          {isHighUrgency && (
            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-[#E57373]/15 text-[#E57373] text-[9px] font-extrabold uppercase rounded-full border border-[#E57373]/30 tracking-wider">
              <span className="w-1.5 h-1.5 bg-[#E57373] rounded-full animate-ping" />
              <span>Urgent</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-text mb-2 line-clamp-1 group-hover:text-action transition-colors leading-tight">
          {gig.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-text/75 leading-relaxed line-clamp-3 mb-5 min-h-[54px]">
          {gig.description}
        </p>

        {/* Budget & Details Grid */}
        <div className="grid grid-cols-2 gap-4 bg-white/70 border border-card/45 p-4 rounded-2xl mb-5 shadow-sm">
          <div>
            <span className="text-[9px] font-bold text-text/45 uppercase tracking-wider block mb-0.5">Barter Valuation</span>
            <div className="flex items-baseline gap-0.5 text-base font-extrabold text-action leading-none">
              <span>₹{budgetText}</span>
              {gig.budget.type === 'range' && (
                <span className="text-xs text-text/50 font-semibold">- ₹{gig.budget.max.toLocaleString()}</span>
              )}
            </div>
          </div>

          <div className="border-l border-card/50 pl-4">
            <span className="text-[9px] font-bold text-text/45 uppercase tracking-wider block mb-0.5">Estimated scope</span>
            <span className="text-sm font-bold text-text leading-none flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-text/55" />
              {gig.duration.estimatedHours} hrs
            </span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div>
        {/* Skills needed list */}
        <div className="mb-4">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-text/45 block mb-2">Required Skills</span>
          <div className="flex flex-wrap gap-1.5">
            {gig.skillsRequired.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-card/60 border border-card/40 text-[9px] font-bold text-text/85 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between pt-4.5 border-t border-card/35 mt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            {postedBy?.avatar ? (
              <img
                src={postedBy.avatar}
                alt={postedBy.name}
                className="w-7.5 h-7.5 rounded-full object-cover border border-white shadow-sm shrink-0"
              />
            ) : (
              <div className="w-7.5 h-7.5 rounded-full bg-barter/35 flex items-center justify-center text-[10px] font-bold text-text shrink-0">
                {postedBy?.name?.charAt(0)}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-text truncate leading-tight">{postedBy?.name}</span>
              <span className="text-[9px] text-text/50 leading-none">Creator</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-text/50">
            <Calendar className="w-3 h-3 text-text/40" />
            <span>{gig.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};