'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VideoPlayer } from '../ui/VideoPlayer';
import { User } from '../../models/User';

interface VideoBubbleProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const VideoBubble: React.FC<VideoBubbleProps> = ({
  user,
  size = 'md',
  onClick
}) => {
  // This would typically fetch the user's proof-of-skill video URL
  // For demo purposes, we'll use a placeholder
  const videoUrl = `/videos/${user.id}-pitch.mp4`; // Placeholder
  const fallbackImage = user.avatar;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <VideoPlayer
        src={videoUrl}
        fallbackImage={fallbackImage}
        size={size}
        autoPlay={true}
        muted={true}
        loop={true}
      />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-action text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg"
      >
        {user.name}'s Pitch
      </motion.div>

      {/* Status Ring */}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-barter rounded-full border-2 border-white flex items-center justify-center shadow-sm">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

interface VideoBubbleGridProps {
  users: User[];
  maxPerRow?: number;
  onBubbleClick?: (user: User) => void;
}

export const VideoBubbleGrid: React.FC<VideoBubbleGridProps> = ({
  users,
  maxPerRow = 6,
  onBubbleClick
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {users.slice(0, maxPerRow).map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col items-center gap-2"
        >
          <VideoBubble
            user={user}
            size="md"
            onClick={() => onBubbleClick?.(user)}
          />
          <span className="text-sm font-medium text-text text-center">
            {user.name}
          </span>
          <span className="text-xs text-text/60 text-center">
            {user.skills[0]?.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};