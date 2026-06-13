'use client';

import React from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Heart, X, RefreshCw } from 'lucide-react';
import { ProfileCard } from '../cards/ProfileCard';
import { BarterMatch } from '../../models/BarterSwap';

interface BarterTinderDeckProps {
  matches: BarterMatch[];
  onMatchAction?: (match: BarterMatch, action: 'like' | 'pass') => void;
  onActiveMatchChange?: (match: BarterMatch | null) => void;
}

export const BarterTinderDeck: React.FC<BarterTinderDeckProps> = ({
  matches,
  onMatchAction,
  onActiveMatchChange
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Store callback in a ref so it's never a useEffect dependency (avoids infinite loop)
  const onActiveMatchChangeRef = React.useRef(onActiveMatchChange);
  React.useEffect(() => {
    onActiveMatchChangeRef.current = onActiveMatchChange;
  });

  // Notify parent only when currentIndex or matches length changes
  React.useEffect(() => {
    const notify = onActiveMatchChangeRef.current;
    if (!notify) return;
    if (matches.length > 0 && currentIndex < matches.length) {
      notify(matches[currentIndex]);
    } else {
      notify(null);
    }
  }, [currentIndex, matches.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const controls = useAnimation();

  const currentMatch = matches[currentIndex];
  const hasMore = currentIndex < matches.length - 1;

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const { offset } = info;

    if (Math.abs(offset.x) > swipeThreshold) {
      const direction = offset.x > 0 ? 'right' : 'left';
      handleSwipe(direction);
    } else {
      controls.start({ x: 0, y: 0, rotate: 0 });
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const card = document.getElementById(`card-${currentIndex}`);

    if (direction === 'right' && currentMatch) {
      controls.start({
        x: 500,
        y: 0,
        rotate: 30,
        transition: { duration: 0.3 }
      });
      onMatchAction?.(currentMatch, 'like');
    } else if (direction === 'left' && currentMatch) {
      controls.start({
        x: -500,
        y: 0,
        rotate: -30,
        transition: { duration: 0.3 }
      });
      onMatchAction?.(currentMatch, 'pass');
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      controls.set({ x: 0, y: 0, rotate: 0 });
    }, 300);
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    controls.set({ x: 0, y: 0, rotate: 0 });
  };

  if (!matches.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-card rounded-2xl p-8 text-center shadow-soft">
          <h3 className="text-xl font-heading font-semibold text-text mb-2">
            No Matches Yet
          </h3>
          <p className="text-text/60 mb-4">
            We couldn't find any barter matches for you right now.
          </p>
          <button
            onClick={resetDeck}
            className="flex items-center gap-2 px-4 py-2 bg-action text-white rounded-lg font-medium hover:bg-action/90 transition-colors mx-auto"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const remainingCount = matches.length - currentIndex;

  return (
    <div className="relative max-w-sm mx-auto">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-sm text-text/60">
          {currentIndex + 1} of {matches.length}
        </span>
        <div className="flex gap-1">
          {matches.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx < currentIndex ? 'bg-barter' :
                idx === currentIndex ? 'bg-action' : 'bg-card'
              }`}
            />
          ))}
          {matches.length > 5 && (
            <span className="text-xs text-text/40">...</span>
          )}
        </div>
        <span className="text-sm font-medium text-action">
          {remainingCount} left
        </span>
      </div>

      {/* Card Stack */}
      <div className="relative h-[500px]">
        {matches.slice(currentIndex, currentIndex + 3).map((match, idx) => {
          const isTop = idx === 0;
          const zIndex = matches.length - idx;

          return (
            <motion.div
              key={match.userB.id}
              id={`card-${currentIndex + idx}`}
              className="absolute inset-0"
              style={{ zIndex }}
              animate={isTop ? controls : {}}
              initial={{
                scale: 1 - idx * 0.05,
                y: idx * 10,
                rotate: idx * 2
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ scale: 1.05 }}
            >
              {isTop && (
                <>
                  {/* Like Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-barter text-white px-3 py-1 rounded-full font-semibold z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    MATCH!
                  </motion.div>
                  {/* Pass Badge */}
                  <motion.div
                    className="absolute -top-4 -left-4 bg-action text-white px-3 py-1 rounded-full font-semibold z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    PASS
                  </motion.div>
                </>
              )}
              <ProfileCard user={match.userB} className="h-full" />
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 bg-white text-action rounded-full flex items-center justify-center shadow-soft hover:bg-action/10 transition-colors"
        >
          <X size={28} />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 bg-white text-barter rounded-full flex items-center justify-center shadow-soft hover:bg-barter/10 transition-colors"
        >
          <Heart size={28} />
        </button>
      </div>
    </div>
  );
};