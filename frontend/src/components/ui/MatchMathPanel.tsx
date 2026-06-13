'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarterMatch } from '@/models/BarterSwap';
import { Compass, GitMerge, Award, MapPin, Calculator, BookOpen } from 'lucide-react';

interface MatchMathPanelProps {
  match: BarterMatch | null;
}

export const MatchMathPanel: React.FC<MatchMathPanelProps> = ({ match }) => {
  if (!match) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-card/60 shadow-soft h-full flex flex-col items-center justify-center text-center min-h-[500px]">
        <div className="w-16 h-16 bg-action/10 rounded-full flex items-center justify-center mb-4 text-action">
          <Calculator className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-text mb-2">
          Match Math Engine
        </h3>
        <p className="text-text/60 max-w-xs text-sm">
          Swipe or select a talent card to analyze the compatibility algorithm in real-time.
        </p>
      </div>
    );
  }

  const { userA, userB, mutualSkills, matchScore, compatibilityFactors } = match;

  // 1. Calculate Geographical Coordinates and Euclidean / Haversine Distance
  const coordA = userA.location.coordinates || { latitude: 19.0760, longitude: 72.8777 }; // default Mumbai
  const coordB = userB.location.coordinates || { latitude: 12.9716, longitude: 77.5946 }; // default Bangalore

  const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distance = calculateHaversineDistance(
    coordA.latitude,
    coordA.longitude,
    coordB.latitude,
    coordB.longitude
  );

  // Proximity details
  const isSameCity = userA.location.city === userB.location.city;
  const proximityBonus = isSameCity ? 10 : 0;

  // 2. Trust Score Delta
  const trustDelta = Math.abs(userA.trustScore.overall - userB.trustScore.overall);
  const trustBonus = trustDelta < 20 ? 15 : 0;

  // 3. Skill Overlap Counts
  const skillCountA = mutualSkills.offeredByA.length;
  const skillCountB = mutualSkills.offeredByB.length;
  const skillsBonus = (skillCountA * 10) + (skillCountB * 10);

  // Equation components
  const baseScore = 50;

  return (
    <motion.div
      key={userB.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-card/60 shadow-soft h-full flex flex-col justify-between overflow-hidden relative"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(45, 52, 70, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(45, 52, 70, 0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {/* Background Math Formula Watermark */}
      <div className="absolute right-4 bottom-2 text-text/5 font-mono text-[9px] select-none pointer-events-none text-right font-semibold">
        f(x) = ∫(Skills) dx + ΔTrust + Proximity<br />
        d(A,B) = √((x₂-x₁)² + (y₂-y₁)²)<br />
        SkillCircle Match Engine v1.2
      </div>

      <div>
        {/* Title */}
        <div className="flex items-center gap-2 mb-6 border-b border-card pb-4">
          <Calculator className="w-6 h-6 text-action" />
          <div>
            <h2 className="text-xl font-heading font-bold text-text">Match Proof</h2>
            <p className="text-xs text-text/50">Mathematical swap verification</p>
          </div>
        </div>

        {/* 1. The compatibility equation */}
        <div className="bg-white/80 border border-card p-4 rounded-2xl mb-6 shadow-sm font-mono text-sm text-text">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-text/45 mb-2 flex items-center justify-between">
            <span>Algorithm Formula</span>
            <span className="text-action font-semibold">Active Equation</span>
          </div>
          <div className="text-center py-3 bg-card/30 rounded-lg border border-card/50 mb-3 font-semibold overflow-x-auto text-base">
            <span className="text-text/40">Score =</span> {baseScore} + 10(S<sub>A</sub>) + 10(S<sub>B</sub>) + W<sub>dist</sub> + W<sub>trust</sub>
          </div>
          <div className="space-y-1.5 text-xs text-text/70">
            <div className="flex justify-between">
              <span>Base Score:</span>
              <span className="font-bold text-text">{baseScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Your Swapped Skills (S<sub>A</sub> = {skillCountA}):</span>
              <span className="font-bold text-text">+{skillCountA * 10}</span>
            </div>
            <div className="flex justify-between">
              <span>Their Swapped Skills (S<sub>B</sub> = {skillCountB}):</span>
              <span className="font-bold text-text">+{skillCountB * 10}</span>
            </div>
            <div className="flex justify-between">
              <span>Proximity Coefficient (W<sub>dist</sub>):</span>
              <span className="font-bold text-text">+{proximityBonus}</span>
            </div>
            <div className="flex justify-between">
              <span>Trust Alignment (W<sub>trust</sub>):</span>
              <span className="font-bold text-text">+{trustBonus}</span>
            </div>
            <div className="border-t border-card/60 pt-2 flex justify-between font-bold text-sm text-action">
              <span>Final Match Score:</span>
              <span>{matchScore}%</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Venn Diagram */}
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-text/50 block mb-3">
            Skill Circle Venn Diagram
          </span>
          <div className="flex items-center justify-center p-4 bg-white/70 border border-card/50 rounded-2xl shadow-sm relative min-h-[170px]">
            {/* Venn SVG */}
            <svg width="220" height="150" viewBox="0 0 220 150" className="overflow-visible">
              {/* Circle A (You) */}
              <motion.circle
                cx="85"
                cy="75"
                r="55"
                className="fill-action/15 stroke-action/40 stroke-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Circle B (Them) */}
              <motion.circle
                cx="135"
                cy="75"
                r="55"
                className="fill-barter/15 stroke-barter/40 stroke-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              
              {/* Intersecting overlay */}
              <path
                d="M 110,31 A 55,55 0 0,0 110,119 A 55,55 0 0,0 110,31 Z"
                className="fill-gradient-to-r from-action to-barter opacity-25"
              />

              {/* Labels inside Venn Circle A */}
              <text x="50" y="70" textAnchor="middle" className="fill-text/80 text-[10px] font-bold">
                You
              </text>
              
              {/* Labels inside Venn Circle B */}
              <text x="170" y="70" textAnchor="middle" className="fill-text/80 text-[10px] font-bold">
                {userB.name.split(' ')[0]}
              </text>

              {/* Intersecting Label */}
              <text x="110" y="77" textAnchor="middle" className="fill-action text-[9px] font-extrabold uppercase tracking-wide">
                SWAP!
              </text>
            </svg>

            {/* Micro details of Venn */}
            <div className="absolute top-2 left-4 text-[9px] font-mono text-text/60 max-w-[80px]">
              <span className="font-bold text-action">Your Skills</span>
              <div className="truncate">{userA.skills.map(s => s.name).join(', ')}</div>
            </div>
            <div className="absolute top-2 right-4 text-[9px] font-mono text-text/60 max-w-[80px] text-right">
              <span className="font-bold text-barter">Their Skills</span>
              <div className="truncate">{userB.skills.map(s => s.name).join(', ')}</div>
            </div>
            <div className="absolute bottom-2 inset-x-0 text-[10px] font-mono text-center text-text/85 px-4 font-semibold">
              Intersection: <span className="text-action">{mutualSkills.offeredByA.map(s => s.name).join(', ')}</span> ⇆ <span className="text-barter">{mutualSkills.offeredByB.map(s => s.name).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* 3. Coordinate Distance Calculation */}
        <div className="space-y-4">
          <div className="bg-white/80 border border-card p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-text/50 block mb-2.5">
              Geographical Metric (Euclidean Coordinates)
            </span>
            <div className="grid grid-cols-2 gap-3 mb-3 text-xs font-mono">
              <div className="p-2 bg-card/40 rounded-xl border border-card/30">
                <span className="text-[9px] text-text/40 block">Coord A (Mumbai)</span>
                lat: {coordA.latitude.toFixed(4)}<br />
                lon: {coordA.longitude.toFixed(4)}
              </div>
              <div className="p-2 bg-card/40 rounded-xl border border-card/30">
                <span className="text-[9px] text-text/40 block">Coord B ({userB.location.city})</span>
                lat: {coordB.latitude.toFixed(4)}<br />
                lon: {coordB.longitude.toFixed(4)}
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/25 p-3 rounded-xl border border-card/40">
              <Compass className="w-8 h-8 text-action shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-text/50 block">Distance Matrix</span>
                <span className="text-sm font-extrabold text-text font-mono">
                  {distance} km
                </span>
                <span className="text-[10px] text-text/55 block">
                  {isSameCity ? 'Proximity limit met (Same City): Bonus 100%' : `Proximity limit: ${distance < 1000 ? 'Mid-Range (50% score)' : 'Long-Range (0% bonus)'}`}
                </span>
              </div>
            </div>
          </div>
          
          {/* 4. Trust Delta Matrix */}
          <div className="bg-white/80 border border-card p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-text/50 block mb-2.5">
              Trust Score Delta (ΔT)
            </span>
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <div className="text-center flex-1">
                <span className="text-[9px] text-text/45 block">Your Score</span>
                <span className="text-sm font-bold text-action">{userA.trustScore.overall}</span>
              </div>
              <div className="px-2 text-text/30 text-lg font-light">|</div>
              <div className="text-center flex-1">
                <span className="text-[9px] text-text/45 block">Their Score</span>
                <span className="text-sm font-bold text-barter">{userB.trustScore.overall}</span>
              </div>
              <div className="px-2 text-text/30 text-lg font-light">|</div>
              <div className="text-center flex-1">
                <span className="text-[9px] text-text/45 block">Difference (Δ)</span>
                <span className="text-sm font-bold text-text">{trustDelta}</span>
              </div>
            </div>
            
            <div className="w-full bg-card/40 rounded-full h-2 overflow-hidden mb-2">
              <div 
                className="h-full bg-action" 
                style={{ width: `${Math.max(0, 100 - (trustDelta * 4))}%` }} 
              />
            </div>
            <div className="text-[10px] text-text/50 font-medium flex justify-between">
              <span>Δ Limit: &lt; 20 (Aligned)</span>
              <span className={trustDelta < 20 ? 'text-action font-bold' : 'text-text/60'}>
                {trustDelta < 20 ? '✓ Trust Matrix Matches' : '⚠️ Deviates'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
