'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  fallbackImage?: string;
  size?: 'sm' | 'md' | 'lg';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  fallbackImage,
  size = 'md',
  autoPlay = true,
  muted = true,
  loop = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const playVideo = () => {
    if (videoRef.current && !isHovered) {
      videoRef.current.play().catch(e => console.log('Video play failed:', e));
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (isHovered && videoRef.current) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isHovered]);

  const handleVideoError = () => {
    setHasError(true);
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div
      className={`relative rounded-full overflow-hidden bg-white shadow-lg border-2 border-action ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Video Element */}
      {!hasError && (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          muted={muted}
          loop={loop}
          playsInline
          onError={handleVideoError}
          onLoad={handleVideoLoad}
          style={{ display: isLoaded ? 'block' : 'none' }}
        />
      )}

      {/* Fallback Image or Loading State */}
      {hasError || !isLoaded ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-action/20 to-barter/20">
          {fallbackImage ? (
            <img
              src={fallbackImage}
              alt="Video preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-4xl">🎬</div>
          )}
        </div>
      ) : null}

      {/* Play/Pause Overlay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-action"
            >
              {isHovered ? (
                <polygon points="5 3 19 12 5 21 5 3" />
              ) : (
                <>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </>
              )}
            </svg>
          </div>
        </motion.div>
      )}

      {/* Duration Indicator */}
      <div className="absolute bottom-1 right-1 bg-action/90 text-white text-xs px-2 py-1 rounded">
        0:15
      </div>
    </motion.div>
  );
};