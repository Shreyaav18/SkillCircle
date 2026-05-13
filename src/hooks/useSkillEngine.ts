'use client';

import { useState, useMemo } from 'react';
import { User, SkillCategory, SkillLevel } from '../models/User';
import { Gig, GigStatus } from '../models/Gig';

export interface SkillFilters {
  query: string;
  categories: SkillCategory[];
  skillLevels: SkillLevel[];
  location?: string;
  minRate?: number;
  maxRate?: number;
  remoteOnly?: boolean;
}

export interface GigFilters {
  query: string;
  categories: SkillCategory[];
  urgency?: string;
  minBudget?: number;
  maxBudget?: number;
  remoteOnly?: boolean;
}

export const useSkillEngine = (
  users: User[],
  gigs: Gig[]
) => {
  const [userFilters, setUserFilters] = useState<SkillFilters>({
    query: '',
    categories: [],
    skillLevels: []
  });

  const [gigFilters, setGigFilters] = useState<GigFilters>({
    query: '',
    categories: []
  });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesQuery = !userFilters.query ||
        user.name.toLowerCase().includes(userFilters.query.toLowerCase()) ||
        user.skills.some(skill =>
          skill.name.toLowerCase().includes(userFilters.query.toLowerCase())
        ) ||
        user.wants.some(want =>
          want.name.toLowerCase().includes(userFilters.query.toLowerCase())
        );

      const matchesCategory = userFilters.categories.length === 0 ||
        user.skills.some(skill => userFilters.categories.includes(skill.category)) ||
        user.wants.some(want => userFilters.categories.includes(want.category));

      const matchesLevel = userFilters.skillLevels.length === 0 ||
        user.skills.some(skill => userFilters.skillLevels.includes(skill.level));

      const matchesLocation = !userFilters.location ||
        user.location.city.toLowerCase().includes(userFilters.location.toLowerCase()) ||
        user.location.state.toLowerCase().includes(userFilters.location.toLowerCase());

      const matchesRate = (!userFilters.minRate || !user.hourlyRate || user.hourlyRate >= userFilters.minRate) &&
        (!userFilters.maxRate || !user.hourlyRate || user.hourlyRate <= userFilters.maxRate);

      return matchesQuery && matchesCategory && matchesLevel && matchesLocation && matchesRate;
    });
  }, [users, userFilters]);

  const filteredGigs = useMemo(() => {
    return gigs.filter(gig => {
      const matchesQuery = !gigFilters.query ||
        gig.title.toLowerCase().includes(gigFilters.query.toLowerCase()) ||
        gig.description.toLowerCase().includes(gigFilters.query.toLowerCase()) ||
        gig.skillsRequired.some(skill =>
          skill.name.toLowerCase().includes(gigFilters.query.toLowerCase())
        );

      const matchesCategory = gigFilters.categories.length === 0 ||
        gigFilters.categories.includes(gig.category);

      const matchesUrgency = !gigFilters.urgency || gig.urgency === gigFilters.urgency;

      const matchesBudget = (!gigFilters.minBudget || gig.budget.max >= gigFilters.minBudget) &&
        (!gigFilters.maxBudget || gig.budget.min <= gigFilters.maxBudget);

      const matchesRemote = !gigFilters.remoteOnly || gig.location?.remote === true;

      return matchesQuery && matchesCategory && matchesUrgency && matchesBudget && matchesRemote;
    });
  }, [gigs, gigFilters]);

  const updateFilters = (filterType: 'users' | 'gigs', newFilters: Partial<SkillFilters | GigFilters>) => {
    if (filterType === 'users') {
      setUserFilters(prev => ({ ...prev, ...newFilters }));
    } else {
      setGigFilters(prev => ({ ...prev, ...newFilters }));
    }
  };

  const clearFilters = (filterType: 'users' | 'gigs' | 'all') => {
    const defaultUserFilters: SkillFilters = { query: '', categories: [], skillLevels: [] };
    const defaultGigFilters: GigFilters = { query: '', categories: [] };

    if (filterType === 'users') {
      setUserFilters(defaultUserFilters);
    } else if (filterType === 'gigs') {
      setGigFilters(defaultGigFilters);
    } else {
      setUserFilters(defaultUserFilters);
      setGigFilters(defaultGigFilters);
    }
  };

  return {
    users: filteredUsers,
    gigs: filteredGigs,
    userFilters,
    gigFilters,
    updateFilters,
    clearFilters,
    setUserFilters,
    setGigFilters
  };
};