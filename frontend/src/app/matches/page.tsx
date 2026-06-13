'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarterTinderDeck } from '@/components/ui/BarterTinderDeck';
import { MatchMathPanel } from '@/components/ui/MatchMathPanel';
import { useBarterMatch } from '@/hooks/useBarterMatch';
import { mockUsers } from '@/lib/constants/mockData';
import { User } from '@/models/User';
import { BarterMatch } from '@/models/BarterSwap';
import { Sparkles, Variable } from 'lucide-react';

export default function MatchesPage() {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [activeMatch, setActiveMatch] = React.useState<BarterMatch | null>(null);

  React.useEffect(() => {
    setCurrentUser(mockUsers[0]);
  }, []);

  const { matches } = useBarterMatch(currentUser, mockUsers);

  const handleMatchAction = (match: BarterMatch, action: 'like' | 'pass') => {
    console.log(`${action} on`, match.userB.name);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-card/50">
        <div className="container mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-action/10 rounded-full text-xs font-mono font-bold text-action mb-2">
                <Variable className="w-3 h-3" />
                <span>f(x) = Skills Swap Algorithm</span>
              </div>
              <h1 className="text-3xl font-heading font-bold text-text flex items-center gap-2">
                Barter Match Matrix
              </h1>
              <p className="text-text/60 mt-1 text-sm font-sans">
                Compute skill intersections, geographical distance vectors, and trust scores.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/60 border border-card p-3 rounded-2xl text-xs font-mono text-text/70 shadow-sm self-start md:self-auto">
              <Sparkles className="w-4 h-4 text-action shrink-0" />
              <div>
                <span className="font-bold text-text block">Coordinate Engine</span>
                Mumbai, MH Center Point
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {currentUser ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Swipe Deck */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-40">
              <BarterTinderDeck
                matches={matches}
                onMatchAction={handleMatchAction}
                onActiveMatchChange={setActiveMatch}
              />
            </div>

            {/* Match Math Analyzer */}
            <div className="lg:col-span-7 xl:col-span-8">
              <MatchMathPanel match={activeMatch} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-action border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text/60 font-mono text-sm">Loading coordinate mapping...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}