'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/layout/BentoGrid';
import { GigCard } from '@/components/cards/GigCard';
import { ProfileCard } from '@/components/cards/ProfileCard';
import { mockUsers, mockGigs } from '@/lib/constants/mockData';
import { Search, Filter, MapPin, Clock } from 'lucide-react';

export default function DiscoveryPage() {
  const [activeTab, setActiveTab] = useState<'gigs' | 'profiles' | 'both'>('both');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGigs = mockGigs.filter(gig =>
    gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gig.skillsRequired.some(skill =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.skills.some(skill =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    user.wants.some(want =>
      want.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <h1 className="text-3xl font-heading font-bold text-text">
              Discovery Hub
            </h1>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/50" size={20} />
              <input
                type="text"
                placeholder="Search skills, gigs, or people..."
                className="w-full pl-10 pr-4 py-2 bg-card rounded-xl border border-card/50 focus:border-action focus:outline-none transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-card/50 p-1 rounded-xl">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'gigs'
                    ? 'bg-action text-white'
                    : 'text-text hover:bg-card'
                }`}
                onClick={() => setActiveTab('gigs')}
              >
                Gigs
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'profiles'
                    ? 'bg-barter text-white'
                    : 'text-text hover:bg-card'
                }`}
                onClick={() => setActiveTab('profiles')}
              >
                Profiles
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'both'
                    ? 'bg-action text-white'
                    : 'text-text hover:bg-card'
                }`}
                onClick={() => setActiveTab('both')}
              >
                Both
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <BentoGridItem className="text-center">
            <div className="text-2xl font-bold text-action">{filteredGigs.length}</div>
            <div className="text-sm text-text/60">Active Gigs</div>
          </BentoGridItem>
          <BentoGridItem className="text-center">
            <div className="text-2xl font-bold text-barter">{filteredUsers.length}</div>
            <div className="text-sm text-text/60">Talents</div>
          </BentoGridItem>
          <BentoGridItem className="text-center">
            <div className="text-2xl font-bold text-action">12</div>
            <div className="text-sm text-text/60">Categories</div>
          </BentoGridItem>
          <BentoGridItem className="text-center">
            <div className="text-2xl font-bold text-barter">₹50L+</div>
            <div className="text-sm text-text/60">Total Value</div>
          </BentoGridItem>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-card/50 hover:border-action transition-colors">
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-card/50 hover:border-barter transition-colors">
            <MapPin size={16} />
            <span>Near Me</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-card/50 hover:border-action transition-colors">
            <Clock size={16} />
            <span>Urgent First</span>
          </button>
        </div>

        {/* Content Grid */}
        <BentoGrid>
          {(activeTab === 'gigs' || activeTab === 'both') && filteredGigs.map((gig, index) => (
            <BentoGridItem key={gig.id} delay={index * 0.1}>
              <GigCard gig={gig} />
            </BentoGridItem>
          ))}

          {(activeTab === 'profiles' || activeTab === 'both') && filteredUsers.map((user, index) => (
            <BentoGridItem key={user.id} delay={(filteredGigs.length + index) * 0.1}>
              <ProfileCard user={user} />
            </BentoGridItem>
          ))}
        </BentoGrid>

        {/* Empty State */}
        {searchQuery && filteredGigs.length === 0 && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-heading font-semibold text-text mb-2">
                No results found
              </h3>
              <p className="text-text/60">
                Try adjusting your search terms or browse all available options.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}