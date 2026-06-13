'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/layout/BentoGrid';
import { GigCard } from '@/components/cards/GigCard';
import { ProfileCard } from '@/components/cards/ProfileCard';
import { mockUsers, mockGigs } from '@/lib/constants/mockData';
import { Gig, Urgency } from '@/models/Gig';
import { User, SkillLevel } from '@/models/User';
import { ProfileDetailDrawer } from '@/components/cards/ProfileDetailDrawer';
import { GigDetailDrawer } from '@/components/cards/GigDetailDrawer';
import { 
  Search, Filter, MapPin, Clock, ShieldCheck, 
  ArrowLeftRight, Sparkles, SlidersHorizontal, Map, List,
  Briefcase, Users, Star, IndianRupee, RotateCcw
} from 'lucide-react';

// Coordinates & metadata for cities represented in map
const mapCities = [
  { name: 'Delhi', x: 230, y: 130, state: 'Delhi' },
  { name: 'Mumbai', x: 140, y: 320, state: 'Maharashtra' },
  { name: 'Pune', x: 165, y: 350, state: 'Maharashtra' },
  { name: 'Hyderabad', x: 235, y: 370, state: 'Telangana' },
  { name: 'Bangalore', x: 210, y: 440, state: 'Karnataka' }
];

export default function DiscoveryPage() {
  const [activeTab, setActiveTab] = useState<'gigs' | 'profiles' | 'both'>('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('default');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Selected details drawer states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedSkillLevel('ALL');
    setSelectedCity('ALL');
    setSortBy('default');
    setVerifiedOnly(false);
    setUrgentOnly(false);
  };

  // Filter Gigs
  const filteredGigs = mockGigs.filter((gig) => {
    // Search query match
    const matchesSearch = 
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.skillsRequired.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category match
    const matchesCategory = selectedCategory === 'ALL' || gig.category === selectedCategory.toLowerCase();

    // Urgent filter
    const matchesUrgent = !urgentOnly || gig.urgency === Urgency.HIGH;

    // Location match
    let matchesLocation = true;
    if (selectedCity !== 'ALL') {
      const gigPoster = mockUsers.find(u => u.id === gig.postedBy);
      if (selectedCity === 'Remote') {
        matchesLocation = gig.location?.remote === true;
      } else {
        matchesLocation = gigPoster?.location.city === selectedCity;
      }
    }

    return matchesSearch && matchesCategory && matchesUrgent && matchesLocation;
  });

  // Filter Users
  const filteredUsers = mockUsers.filter((user) => {
    // Search query match
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.wants.some(w => w.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category match (if user has any skill in this category)
    const matchesCategory = selectedCategory === 'ALL' || user.skills.some(s => s.category === selectedCategory.toLowerCase());

    // Skill level match
    const matchesSkillLevel = selectedSkillLevel === 'ALL' || user.skills.some(s => s.level === selectedSkillLevel.toLowerCase());

    // Location match
    const matchesLocation = selectedCity === 'ALL' || (selectedCity !== 'Remote' && user.location.city === selectedCity);

    // Verified only filter
    const matchesVerified = !verifiedOnly || user.isVerified === true;

    return matchesSearch && matchesCategory && matchesSkillLevel && matchesLocation && matchesVerified;
  });

  // Sort Gigs
  const sortedGigs = [...filteredGigs].sort((a, b) => {
    if (sortBy === 'rate') {
      return b.budget.min - a.budget.min; // budget value desc
    }
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0; // default (no sorting)
  });

  // Sort Users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'trust') {
      return b.trustScore.overall - a.trustScore.overall; // trust score desc
    }
    if (sortBy === 'rate') {
      return (b.hourlyRate || 0) - (a.hourlyRate || 0); // hourly rate desc
    }
    if (sortBy === 'newest') {
      return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
    }
    return 0; // default (no sorting)
  });

  // Unique list of cities from mock data
  const availableCities = Array.from(new Set(mockUsers.map(u => u.location.city)));

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Premium Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-card/30 to-background py-16 border-b border-card/40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-barter/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-action/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 border border-card/65 rounded-full text-xs font-bold text-text/80 shadow-soft mb-6">
            <Sparkles className="w-4 h-4 text-action" />
            <span>Discover Skills & Projects in India</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-text mb-4 leading-tight">
            Marketplace Discovery
          </h1>
          <p className="text-base md:text-lg text-text/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Search active gigs looking for trade or explore expert talents ready to swap skillsets.
          </p>

          {/* Quick Statistics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-card/70 p-5 rounded-3xl shadow-soft">
            <div className="text-center p-2 border-r border-card/50 last:border-0">
              <span className="text-2xl md:text-3xl font-black text-action block">{mockGigs.length}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-text/50">Active Gigs</span>
            </div>
            <div className="text-center p-2 border-r border-card/50 last:border-0">
              <span className="text-2xl md:text-3xl font-black text-barter-600 block">{mockUsers.length}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-text/50">Available Talents</span>
            </div>
            <div className="text-center p-2 border-r border-card/50 last:border-0">
              <span className="text-2xl md:text-3xl font-black text-text/80 block">6</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-text/50">Exchange Categories</span>
            </div>
            <div className="text-center p-2 last:border-0">
              <span className="text-2xl md:text-3xl font-black text-action block">₹1.5L+</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-text/50">Simulated Value</span>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Hub Control Panel */}
      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-md border-b border-card/45 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text/45" size={18} />
              <input
                type="text"
                placeholder="Search skills, details, locations..."
                className="w-full pl-11 pr-4 py-3 bg-card/50 border border-card/65 rounded-2xl focus:border-action focus:bg-white focus:outline-none transition-all text-sm shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Middle Filters Toggle & Options */}
            <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto justify-center">
              
              {/* Type Tabs */}
              <div className="flex p-1 bg-card/60 border border-card/50 rounded-2xl shadow-sm">
                {[
                  { id: 'gigs', label: 'Gigs', icon: Briefcase },
                  { id: 'profiles', label: 'Talent', icon: Users },
                  { id: 'both', label: 'Both', icon: Star }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                      activeTab === t.id
                        ? 'bg-action text-white shadow-soft-rose'
                        : 'text-text/75 hover:bg-card/40 hover:text-text'
                    }`}
                  >
                    <t.icon size={13} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex p-1 bg-card/60 border border-card/50 rounded-2xl shadow-sm">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all focus:outline-none ${
                    viewMode === 'list'
                      ? 'bg-action text-white shadow-soft-rose'
                      : 'text-text/70 hover:bg-card/40'
                  }`}
                  title="List View"
                >
                  <List size={15} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-xl transition-all focus:outline-none ${
                    viewMode === 'map'
                      ? 'bg-action text-white shadow-soft-rose'
                      : 'text-text/70 hover:bg-card/40'
                  }`}
                  title="Map View (Hyperlocal Network)"
                >
                  <Map size={15} />
                </button>
              </div>

              {/* Reset button */}
              <button 
                onClick={handleResetFilters}
                className="p-3.5 bg-card/40 hover:bg-card border border-card/60 rounded-2xl text-text/65 hover:text-text transition-all focus:outline-none"
                title="Reset Filters"
              >
                <RotateCcw size={15} />
              </button>
            </div>

          </div>

          {/* Collapsible Dropdown Advanced Filters bar */}
          <div className="mt-4 pt-3.5 border-t border-card/35 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category selector */}
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-text/45 mb-1.5">Category</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-card/85 text-xs font-bold rounded-xl px-3 py-2 text-text/80 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Categories</option>
                  <option value="CODING">Coding</option>
                  <option value="DESIGN">Design</option>
                  <option value="WRITING">Writing</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="BUSINESS">Business</option>
                </select>
              </div>

              {/* Skill level (Profiles only) */}
              {activeTab !== 'gigs' && (
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-text/45 mb-1.5">Skill Level</span>
                  <select
                    value={selectedSkillLevel}
                    onChange={(e) => setSelectedSkillLevel(e.target.value)}
                    className="bg-white border border-card/85 text-xs font-bold rounded-xl px-3 py-2 text-text/80 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Levels</option>
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>
              )}

              {/* City selector */}
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-text/45 mb-1.5">Location</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-white border border-card/85 text-xs font-bold rounded-xl px-3 py-2 text-text/80 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Locations</option>
                  {availableCities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Remote">Remote Only</option>
                </select>
              </div>

              {/* Sorting selector */}
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-text/45 mb-1.5">Sort Results</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-card/85 text-xs font-bold rounded-xl px-3 py-2 text-text/80 focus:outline-none cursor-pointer"
                >
                  <option value="default">Default Match</option>
                  {activeTab !== 'gigs' && <option value="trust">Highest Trust</option>}
                  <option value="rate">Highest Rates/Valuation</option>
                  <option value="newest">Recently Posted</option>
                </select>
              </div>
            </div>

            {/* Verified/Urgent Checklist Toggles */}
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              {activeTab !== 'gigs' && (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-card text-action focus:ring-action cursor-pointer"
                  />
                  <span className="text-xs font-bold text-text/75 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-action" />
                    Verified Only
                  </span>
                </label>
              )}

              {activeTab !== 'profiles' && (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={urgentOnly}
                    onChange={(e) => setUrgentOnly(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-card text-action focus:ring-action cursor-pointer"
                  />
                  <span className="text-xs font-bold text-text/75 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#E57373]" />
                    Urgent First
                  </span>
                </label>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 mt-8">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {/* Grid Layout */}
              <BentoGrid>
                {/* Render Gigs */}
                {(activeTab === 'gigs' || activeTab === 'both') && sortedGigs.map((gig, idx) => (
                  <BentoGridItem key={gig.id} delay={idx * 0.05} className="p-0 border-0 bg-transparent shadow-none">
                    <GigCard gig={gig} onClick={() => setSelectedGig(gig)} />
                  </BentoGridItem>
                ))}

                {/* Render Profiles */}
                {(activeTab === 'profiles' || activeTab === 'both') && sortedUsers.map((user, idx) => (
                  <BentoGridItem key={user.id} delay={(sortedGigs.length + idx) * 0.05} className="p-0 border-0 bg-transparent shadow-none">
                    <ProfileCard user={user} onClick={() => setSelectedUser(user)} />
                  </BentoGridItem>
                ))}
              </BentoGrid>

              {/* Empty state check */}
              {((activeTab === 'gigs' && sortedGigs.length === 0) ||
                (activeTab === 'profiles' && sortedUsers.length === 0) ||
                (activeTab === 'both' && sortedGigs.length === 0 && sortedUsers.length === 0)) && (
                <div className="text-center py-16 bg-card/20 border border-dashed border-card/65 rounded-3xl max-w-xl mx-auto mt-8">
                  <SlidersHorizontal className="w-12 h-12 mx-auto mb-4 text-text/30" />
                  <h3 className="text-xl font-bold text-text mb-1">No matches found</h3>
                  <p className="text-xs text-text/50 max-w-sm mx-auto">
                    Try adjusting your filters, resetting the search, or checking other categories to discover trades.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-5 px-5 py-2 bg-action text-white rounded-full text-xs font-bold shadow-soft"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Interactive SVG India Network Map View Mode */
            <motion.div
              key="map-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-card/30 p-8 rounded-3xl border border-card/60 shadow-soft"
            >
              
              {/* India Map Canvas Column */}
              <div className="lg:col-span-3 flex flex-col justify-center items-center relative min-h-[460px]">
                
                {/* Styled India Abstract SVG boundary */}
                <svg viewBox="0 0 500 550" className="w-full max-w-md h-[460px] overflow-visible">
                  {/* Outer Map Contour Outline */}
                  <path 
                    d="M210,40 C215,30 225,30 230,40 L240,65 L275,85 L285,115 L260,140 L275,170 L345,160 L380,185 L355,225 L385,270 L345,285 L365,335 L285,340 C280,360 270,370 265,395 L275,420 L245,465 L225,520 C220,530 210,530 205,520 L195,490 L185,445 L155,420 L145,390 L115,360 L135,325 L105,290 L135,270 L145,215 L175,190 L165,140 L190,105 L180,75 Z" 
                    fill="none" 
                    stroke="#DC9B9B" 
                    strokeWidth="2.5" 
                    strokeDasharray="4,6" 
                    className="opacity-45"
                  />

                  {/* Concentric grid rings indicating hyperlocal range */}
                  <circle cx="210" cy="350" r="100" fill="none" stroke="#2D3436" strokeWidth="0.5" strokeDasharray="3,9" opacity="0.2" />
                  <circle cx="210" cy="350" r="200" fill="none" stroke="#2D3436" strokeWidth="0.5" strokeDasharray="3,9" opacity="0.1" />

                  {/* Network lines connecting cities */}
                  <line x1="230" y1="130" x2="140" y2="320" stroke="#2D3436" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
                  <line x1="140" y1="320" x2="165" y2="350" stroke="#2D3436" strokeWidth="1.5" opacity="0.4" />
                  <line x1="165" y1="350" x2="235" y2="370" stroke="#2D3436" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
                  <line x1="235" y1="370" x2="210" y2="440" stroke="#2D3436" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
                  <line x1="165" y1="350" x2="210" y2="440" stroke="#2D3436" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
                  <line x1="230" y1="130" x2="210" y2="440" stroke="#DC9B9B" strokeWidth="0.75" strokeDasharray="6,6" opacity="0.55" />

                  {/* City Hotspot Markers */}
                  {mapCities.map((city) => {
                    const isSelected = selectedCity === city.name;
                    // Count matching items in this city
                    const talentsCount = mockUsers.filter(u => u.location.city === city.name && (selectedCategory === 'ALL' || u.skills.some(s => s.category === selectedCategory.toLowerCase()))).length;
                    const gigsCount = mockGigs.filter(g => {
                      const poster = mockUsers.find(u => u.id === g.postedBy);
                      return poster?.location.city === city.name && (selectedCategory === 'ALL' || g.category === selectedCategory.toLowerCase());
                    }).length;

                    const totalCount = (activeTab === 'both' ? talentsCount + gigsCount : (activeTab === 'gigs' ? gigsCount : talentsCount));

                    return (
                      <g key={city.name} className="cursor-pointer" onClick={() => setSelectedCity(selectedCity === city.name ? 'ALL' : city.name)}>
                        {/* Pulse Ring */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isSelected ? 16 : 10}
                          fill={isSelected ? '#DC9B9B' : '#73A591'}
                          fillOpacity="0.15"
                          className="animate-ping"
                          style={{ animationDuration: isSelected ? '1.5s' : '3s' }}
                        />
                        {/* Node circle */}
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={isSelected ? 7.5 : 5}
                          fill={isSelected ? '#DC9B9B' : '#73A591'}
                          stroke="#fff"
                          strokeWidth="1.5"
                          className="transition-all duration-300"
                        />
                        {/* Text Label */}
                        <text
                          x={city.x + 10}
                          y={city.y + 4}
                          className="text-[10px] font-extrabold fill-text font-sans select-none"
                        >
                          {city.name} {totalCount > 0 && `(${totalCount})`}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Map Legend info */}
                <div className="absolute bottom-2 left-2 text-[10px] text-text/50 font-bold bg-white/75 px-3 py-1.5 rounded-xl border border-card shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-action inline-block" />
                    <span>Selected City Hub</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-barter-600 inline-block" />
                    <span>Active City Hub</span>
                  </div>
                </div>
              </div>

              {/* Side Listings matching selected map city */}
              <div className="lg:col-span-2 flex flex-col justify-between h-full bg-white/95 border border-card/60 p-6 rounded-2xl shadow-sm">
                <div>
                  <div className="flex items-center justify-between border-b border-card pb-4 mb-4">
                    <div>
                      <h3 className="font-heading font-extrabold text-lg text-text">
                        {selectedCity === 'ALL' ? 'All India Network' : `${selectedCity} Hub`}
                      </h3>
                      <p className="text-[10px] uppercase font-extrabold tracking-wider text-text/40">Hyperlocal Swaps</p>
                    </div>
                    {selectedCity !== 'ALL' && (
                      <button
                        onClick={() => setSelectedCity('ALL')}
                        className="text-[10px] font-bold text-action hover:underline uppercase"
                      >
                        Show All
                      </button>
                    )}
                  </div>

                  {/* Listings inside Selected City */}
                  <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                    
                    {/* Filtered City Gigs */}
                    {(activeTab === 'gigs' || activeTab === 'both') && sortedGigs.map(gig => {
                      const gigPoster = mockUsers.find(u => u.id === gig.postedBy);
                      const matchesCity = selectedCity === 'ALL' || gigPoster?.location.city === selectedCity;
                      if (!matchesCity) return null;

                      return (
                        <div
                          key={gig.id}
                          onClick={() => setSelectedGig(gig)}
                          className="p-3.5 bg-card/15 hover:bg-card/45 border border-card/40 rounded-xl cursor-pointer transition-all flex items-start justify-between group"
                        >
                          <div className="min-w-0">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#E57373] bg-[#E57373]/10 px-1.5 py-0.5 rounded mr-1.5">Gig</span>
                            <span className="font-bold text-xs text-text group-hover:text-action truncate">{gig.title}</span>
                            <p className="text-[10px] text-text/50 truncate mt-1">Valuation: ₹{gig.budget.min.toLocaleString()}</p>
                          </div>
                          <span className="text-[10px] text-text/45 shrink-0">→</span>
                        </div>
                      );
                    })}

                    {/* Filtered City Users */}
                    {(activeTab === 'profiles' || activeTab === 'both') && sortedUsers.map(user => {
                      const matchesCity = selectedCity === 'ALL' || user.location.city === selectedCity;
                      if (!matchesCity) return null;

                      return (
                        <div
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className="p-3.5 bg-card/15 hover:bg-card/45 border border-card/40 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white">
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-xs text-text truncate group-hover:text-action">{user.name}</span>
                                {user.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-action fill-action/5 shrink-0" />}
                              </div>
                              <span className="text-[10px] text-text/50 truncate block">{user.skills[0]?.name}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-text/45 shrink-0">→</span>
                        </div>
                      );
                    })}

                    {/* Empty list for selected city */}
                    {selectedCity !== 'ALL' && 
                     (activeTab === 'both' && sortedGigs.filter(g => mockUsers.find(u => u.id === g.postedBy)?.location.city === selectedCity).length === 0 && sortedUsers.filter(u => u.location.city === selectedCity).length === 0) && (
                       <p className="text-xs text-text/40 text-center py-8">No matching active trades inside this city hub.</p>
                     )}
                  </div>
                </div>

                <div className="border-t border-card pt-4 mt-4 text-[10px] text-text/55 font-bold flex items-center gap-1.5 justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-action" />
                  <span>Click listings above to inspect credentials</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Detail Slide-out Drawer */}
      <ProfileDetailDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />

      {/* Gig Detail Slide-out Drawer */}
      <GigDetailDrawer gig={selectedGig} onClose={() => setSelectedGig(null)} />
    </div>
  );
}