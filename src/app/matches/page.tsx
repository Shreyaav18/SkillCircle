'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarterTinderDeck } from '@/components/ui/BarterTinderDeck';
import { useBarterMatch } from '@/hooks/useBarterMatch';
import { mockUsers } from '@/lib/constants/mockData';
import { User } from '@/models/User';

export default function MatchesPage() {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    setCurrentUser(mockUsers[0]);
  }, []);

  const { matches } = useBarterMatch(currentUser, mockUsers);

  const handleMatchAction = (match: any, action: 'like' | 'pass') => {
    console.log(`${action} on`, match.userB.name);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-card/50">
        <div className="container mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-heading font-bold text-text">
              Barter Tinder Deck
            </h1>
            <p className="text-text/60 mt-1">
              Swipe to find your perfect skill swap match
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {currentUser ? (
          <BarterTinderDeck
            matches={matches}
            onMatchAction={handleMatchAction}
          />
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-action border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text/60">Finding barter matches...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}