'use client';

import React from 'react';
import { User, Skill } from '../models/User';
import { BarterMatch } from '../models/BarterSwap';

export interface BarterMatchResult {
  matches: BarterMatch[];
  isLoading: boolean;
  error: string | null;
}

export const useBarterMatch = (
  currentUser: User | null,
  allUsers: User[]
): BarterMatchResult => {
  const findBarterMatches = (user: User, candidates: User[]): BarterMatch[] => {
    const matches: BarterMatch[] = [];

    for (const candidate of candidates) {
      if (candidate.id === user.id) continue;

      const userSkillIds = new Set(user.skills.map(s => s.id));
      const userWantIds = new Set(user.wants.map(w => w.id));
      const candidateSkillIds = new Set(candidate.skills.map(s => s.id));
      const candidateWantIds = new Set(candidate.wants.map(w => w.id));

      const candidateHasWhatUserWants = Array.from(userWantIds).filter(
        wantId => candidateSkillIds.has(wantId)
      );

      const userHasWhatCandidateWants = Array.from(candidateWantIds).filter(
        wantId => userSkillIds.has(wantId)
      );

      if (candidateHasWhatUserWants.length > 0 && userHasWhatCandidateWants.length > 0) {
        const offeredByA = user.skills.filter(skill =>
          userHasWhatCandidateWants.includes(skill.id)
        );

        const offeredByB = candidate.skills.filter(skill =>
          candidateHasWhatUserWants.includes(skill.id)
        );

        const compatibilityFactors: string[] = [];
        const score = Math.min(100, 50 +
          (offeredByA.length * 10) +
          (offeredByB.length * 10) +
          (Math.abs(user.trustScore.overall - candidate.trustScore.overall) < 20 ? 15 : 0) +
          (user.location.city === candidate.location.city ? 10 : 0)
        );

        if (offeredByA.length > 0) compatibilityFactors.push('mutual-skills');
        if (user.location.city === candidate.location.city) compatibilityFactors.push('local');
        if (Math.abs(user.trustScore.overall - candidate.trustScore.overall) < 20) compatibilityFactors.push('trust-aligned');

        matches.push({
          userA: user,
          userB: candidate,
          mutualSkills: {
            offeredByA,
            offeredByB,
            requestedByA: user.wants.filter(w => candidateSkillIds.has(w.id)),
            requestedByB: candidate.wants.filter(w => userSkillIds.has(w.id))
          },
          matchScore: score,
          compatibilityFactors
        });
      }
    }

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  if (!currentUser || !allUsers.length) {
    return { matches: [], isLoading: false, error: null };
  }

  try {
    const matches = findBarterMatches(currentUser, allUsers);
    return { matches, isLoading: false, error: null };
  } catch (err) {
    return { matches: [], isLoading: false, error: 'Failed to calculate matches' };
  }
};

export const useBarterTinderDeck = (
  currentUser: User | null,
  allUsers: User[]
) => {
  const { matches, isLoading, error } = useBarterMatch(currentUser, allUsers);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentMatch = matches[currentIndex] || null;
  const hasMore = currentIndex < matches.length - 1;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentMatch) {
      // Handle match action (in real app, would trigger API call)
    }
    if (hasMore) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const resetDeck = () => setCurrentIndex(0);

  return {
    currentMatch,
    hasMore,
    isLoading,
    error,
    handleSwipe,
    resetDeck,
    totalMatches: matches.length
  };
};

