'use client';

import Link from "next/link";
import { ArrowRight, Play, Sparkles, ArrowLeftRight, ChevronRight, Check, Zap, VolumeX, Star, MapPin, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import { InteractiveTalentShowcase } from "@/components/cards/InteractiveTalentShowcase";
import { mockUsers } from "@/lib/constants/mockData";
import { BentoGridItem } from "@/components/layout/BentoGrid";
import { HexagonalTrustRadar } from "@/components/ui/HexagonalTrustRadar";
import { MatchMathPanel } from "@/components/ui/MatchMathPanel";
import { useState } from "react";
import { BarterMatch } from "@/models/BarterSwap";

/* ─── Simulator Data ─────────────────────────────────────────────── */
const simulatorOptions = [
  {
    category: 'DEV',
    offer: 'React Frontend',
    want: 'UI/UX Design',
    partner: 'Arjun Patel',
    partnerSkill: 'UI/UX Design',
    partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    matchScore: 94,
    city: 'Bangalore',
    color: '#DC9B9B'
  },
  {
    category: 'DESIGN',
    offer: 'UI/UX Design',
    want: 'Copywriting',
    partner: 'Priya Singh',
    partnerSkill: 'Copywriting',
    partnerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    matchScore: 89,
    city: 'Delhi',
    color: '#C0E1D2'
  },
  {
    category: 'WRITE',
    offer: 'Tech Writing',
    want: 'SEO Growth',
    partner: 'Ananya Desai',
    partnerSkill: 'SEO Optimization',
    partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    matchScore: 91,
    city: 'Pune',
    color: '#DC9B9B'
  },
  {
    category: 'MKT',
    offer: 'SEO & Growth',
    want: 'Mobile Dev',
    partner: 'Riya Sharma',
    partnerSkill: 'React Native',
    partnerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    matchScore: 92,
    city: 'Mumbai',
    color: '#C0E1D2'
  }
];

/* ─── Hero Swap Simulator ─────────────────────────────────────────── */
function HeroSwapSimulator() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const opt = simulatorOptions[activeIdx];

  const handleSwap = () => {
    setIsSimulating(true);
    setShowSuccess(false);
    setTimeout(() => { setIsSimulating(false); setShowSuccess(true); }, 1100);
  };

  const selectCat = (idx: number) => {
    setActiveIdx(idx);
    setIsSimulating(false);
    setShowSuccess(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-action/10 to-barter/10 rounded-[2.5rem] blur-2xl pointer-events-none" />
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-action via-[#E57373] to-barter" />
        
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-card/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-text/40">Live Swap Simulator</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping inline-block" />
              LIVE
            </span>
          </div>
          {/* Category pills */}
          <div className="flex gap-1.5">
            {simulatorOptions.map((o, i) => (
              <button
                key={o.category}
                onClick={() => selectCat(i)}
                className={`flex-1 py-1.5 text-[10px] font-black rounded-xl border transition-all duration-200 ${
                  activeIdx === i
                    ? 'bg-text text-background border-text scale-105 shadow-md'
                    : 'text-text/50 border-card hover:border-text/30 hover:text-text/80 bg-card/30'
                }`}
              >
                {o.category}
              </button>
            ))}
          </div>
        </div>

        {/* Swap Cards */}
        <div className="p-5">
          <div className="flex items-center gap-3">
            {/* You card */}
            <div className="flex-1 bg-gradient-to-br from-action/8 to-action/3 border border-action/20 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-action to-[#E57373] flex items-center justify-center text-xs font-black text-white mx-auto mb-2 shadow-md">
                YOU
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-text/40 mb-1.5">OFFERING</div>
              <div className="text-xs font-black text-text bg-white/80 border border-action/20 rounded-xl px-2 py-1.5 shadow-sm leading-tight">
                {opt.offer}
              </div>
            </div>

            {/* Swap button */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <motion.button
                onClick={handleSwap}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                animate={isSimulating ? { rotate: 360 } : showSuccess ? { scale: [1, 1.2, 1] } : {}}
                transition={isSimulating ? { duration: 0.8, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-colors ${
                  showSuccess
                    ? 'bg-barter border-barter/50 text-text'
                    : 'bg-white border-action/30 text-action hover:bg-action/5 hover:border-action'
                }`}
              >
                {showSuccess ? <Check className="w-5 h-5" strokeWidth={3} /> : <ArrowLeftRight className="w-5 h-5" />}
              </motion.button>
              <span className="text-[8px] font-black text-text/30 uppercase tracking-widest">SWAP</span>
            </div>

            {/* Partner card */}
            <div className="flex-1 bg-gradient-to-br from-barter/10 to-barter/3 border border-barter/30 rounded-2xl p-4 text-center">
              <img
                src={opt.partnerAvatar}
                alt={opt.partner}
                className="w-10 h-10 rounded-full object-cover mx-auto mb-2 border-2 border-white shadow-md"
              />
              <div className="text-[9px] font-black uppercase tracking-widest text-text/40 mb-1.5">WANTS</div>
              <div className="text-xs font-black text-text bg-white/80 border border-barter/30 rounded-xl px-2 py-1.5 shadow-sm leading-tight">
                {opt.partnerSkill}
              </div>
            </div>
          </div>

          {/* Result zone */}
          <div className="mt-4 min-h-[56px] flex items-center justify-center">
            {isSimulating ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-1 bg-action rounded-full animate-bounce"
                      style={{ height: `${8 + (i % 3) * 6}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-text/50">Calculating match score...</span>
              </div>
            ) : showSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex items-center justify-between bg-gradient-to-r from-barter/20 to-barter/10 border border-barter/40 rounded-2xl px-4 py-3"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Sparkles className="w-3 h-3 text-action" />
                    <span className="text-xs font-black text-text">Perfect Match!</span>
                  </div>
                  <span className="text-[10px] text-text/50 font-semibold flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />{opt.city} · Trust verified
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-heading font-black text-text leading-none">{opt.matchScore}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-action">% match</div>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={handleSwap}
                className="flex items-center gap-2 text-xs font-black text-action/80 hover:text-action transition-colors uppercase tracking-wider"
              >
                Try the simulator <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom partner strip */}
        <div className="px-5 py-3 border-t border-card/50 bg-card/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={opt.partnerAvatar} alt={opt.partner} className="w-6 h-6 rounded-full object-cover border border-white" />
            <span className="text-[11px] font-bold text-text">{opt.partner}</span>
            <span className="text-[10px] text-text/40">· {opt.city}</span>
          </div>
          <span className="text-[9px] font-black text-action/70 uppercase tracking-wider bg-action/8 px-2 py-0.5 rounded-full">Verified ✓</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Framer Variants ─────────────────────────────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
};

/* ─── Mock Data ───────────────────────────────────────────────────── */
const mockMatch: BarterMatch = {
  userA: mockUsers[0],
  userB: mockUsers[1],
  mutualSkills: {
    offeredByA: [mockUsers[0].skills[0]],
    offeredByB: [mockUsers[1].skills[1]],
    requestedByA: [mockUsers[0].wants[0]],
    requestedByB: [mockUsers[1].wants[0]],
  },
  matchScore: 94,
  compatibilityFactors: ['Coordinates matrix within bounds', 'Trust delta within tolerance', 'High skill swap index'],
};

const previewTrustScore = {
  quality: 92, speed: 85, barterHistory: 90,
  reliability: 94, communication: 88, cooperation: 91, overall: 91
};

const liveSwaps = [
  { userA: 'Riya S.', userB: 'Arjun P.', skillA: 'React', skillB: 'Figma', time: '2m', avatarA: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80', avatarB: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80' },
  { userA: 'Priya S.', userB: 'Vikram R.', skillA: 'Copywriting', skillB: 'Python', time: '14m', avatarA: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80', avatarB: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80' },
  { userA: 'Ananya D.', userB: 'Arjun P.', skillA: 'SEO', skillB: 'Logo', time: '31m', avatarA: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80', avatarB: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80' },
];

const topHustlers = [
  { name: 'Riya Sharma', skill: 'React Expert', trust: 92, swaps: 18, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80' },
  { name: 'Priya Singh', skill: 'Tech Writer', trust: 90, swaps: 11, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80' },
  { name: 'Arjun Patel', skill: 'UI Designer', trust: 89, swaps: 14, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80' },
];

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function Home() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-grid-pattern">
        {/* Ambient blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[560px] h-[560px] bg-action/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[480px] h-[480px] bg-barter/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center">

            {/* ── Left: Copy ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start"
            >
              {/* Eyebrow badge */}
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-action/20 shadow-md text-xs font-bold text-text/80 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-action" />
                  {"India's First Barter-Based Skill Marketplace"}
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                className="font-heading font-black text-text leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
              >
                Where Skills<br />
                <span className="relative inline-block">
                  <span className="text-gradient-rose">Meet Magic</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6">
                    <path d="M0 5 Q50 0 100 5 Q150 0 200 5" stroke="#DC9B9B" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-text/65 mb-8 max-w-lg leading-relaxed"
              >
                Trade your React skills for UI design. Swap copywriting for SEO. Build real projects with talented Indian creators — <strong className="text-text/85 font-semibold">zero platform fees.</strong>
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                <Link href="/discovery">
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#DC9B9B] to-[#E06060] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all text-sm"
                  >
                    Explore Marketplace
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
                <Link href="/showcase">
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-white border border-card text-text rounded-2xl font-bold hover:bg-card/30 hover:border-card/80 transition-all shadow-md text-sm"
                  >
                    <Play className="w-4 h-4 fill-action/50 text-action" />
                    Watch Showcases
                  </motion.div>
                </Link>
              </motion.div>

              {/* Proof strip */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
                {[
                  { icon: Users, val: '10K+', lbl: 'Creators' },
                  { icon: ArrowLeftRight, val: '50K+', lbl: 'Swaps done' },
                  { icon: Shield, val: '98%', lbl: 'Satisfaction' },
                ].map(({ icon: Icon, val, lbl }) => (
                  <div key={lbl} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-action/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-action" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-text leading-none">{val}</div>
                      <div className="text-[10px] text-text/45 font-semibold">{lbl}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Simulator ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.15 }}
            >
              <HeroSwapSimulator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF TICKER ─────────────────────────────────────── */}
      <div className="bg-text/[0.03] border-y border-card/50 py-3 overflow-hidden">
        <div className="flex gap-10 items-center animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max">
          {[...Array(3)].flatMap(() => [
            '🔄 Riya swapped React for Figma with Arjun · Mumbai',
            '✅ Priya completed a Writing ↔ SEO trade · Delhi',
            '⭐ Vikram earned 92/100 trust rating this week',
            '🎬 Ananya uploaded her 15s pitch video · Pune',
            '🔄 Deepak swapped Branding for React dev · Bangalore',
          ]).map((t, i) => (
            <span key={i} className="text-xs text-text/50 font-semibold px-4">{t}</span>
          ))}
        </div>
      </div>

      {/* ── MEET THE CREATORS ────────────────────────────────────────── */}
      <section className="py-20 bg-card/15 border-b border-card/40">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Left: heading + sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-barter/30 border border-barter/60 rounded-full text-[10px] font-black uppercase tracking-widest text-text/60 mb-4">
                  <Zap className="w-3 h-3" />
                  Live Network
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-text mb-3 leading-tight">
                  Meet the<br />Creators
                </h2>
                <p className="text-sm text-text/60 leading-relaxed">
                  Click nodes to inspect profiles, view 15s video pitches, and initiate a skill swap instantly.
                </p>
              </div>

              {/* Live Feed */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text/45">Live Swaps</span>
                </div>
                <div className="space-y-2.5">
                  {liveSwaps.map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5 py-2 border-b border-card/30 last:border-0 last:pb-0">
                      <div className="flex -space-x-2 shrink-0">
                        <img src={s.avatarA} alt={s.userA} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                        <img src={s.avatarB} alt={s.userB} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-text truncate">{s.userA} ⇆ {s.userB}</div>
                        <div className="text-[10px] text-text/45 truncate">{s.skillA} · {s.skillB}</div>
                      </div>
                      <span className="text-[9px] text-text/35 font-bold shrink-0">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-md p-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-text/45 mb-3">🏆 Top Hustlers</div>
                <div className="space-y-3">
                  {topHustlers.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="text-xs font-black text-text/20 w-4">{i + 1}</span>
                      <img src={h.avatar} alt={h.name} className="w-8 h-8 rounded-full object-cover border border-card" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-text truncate">{h.name}</div>
                        <div className="text-[10px] text-text/45">{h.skill}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[11px] font-black text-action">{h.trust}★</div>
                        <div className="text-[9px] text-text/40">{h.swaps} swaps</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Constellation */}
            <div className="lg:col-span-2">
              <InteractiveTalentShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ──────────────────────────────────────────── */}
      <section className="py-24 border-b border-card/40 bg-background">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mb-14"
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-action bg-action/8 border border-action/20 px-3 py-1 rounded-full mb-4">Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-text mb-4 leading-tight">
              A Marketplace<br />Reimagined
            </h2>
            <p className="text-text/60 text-sm leading-relaxed">
              Intelligent matching, hexagonal trust scores, UPI escrow, and 15-second video pitches — all in one ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Barter Engine — 2-col */}
            <BentoGridItem className="md:col-span-2 relative overflow-hidden min-h-[280px] flex flex-col justify-between group hover:shadow-lg transition-shadow">
              <div className="relative z-10 max-w-sm">
                <div className="w-12 h-12 rounded-2xl bg-action/10 flex items-center justify-center mb-5">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-heading font-black text-text mb-2">Intelligent Barter Engine</h3>
                <p className="text-text/65 text-sm leading-relaxed">
                  Maps your offered skills to requested skills. The algorithm verifies direct swaps, calculates intersection, and ranks matches by trust + proximity.
                </p>
              </div>
              {/* Venn preview */}
              <div className="absolute right-5 bottom-5 w-44 h-32 bg-white/60 border border-white rounded-2xl flex items-center justify-center shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                <svg width="120" height="84" viewBox="0 0 120 84">
                  <circle cx="44" cy="42" r="30" fill="rgba(220,155,155,0.2)" stroke="rgba(220,155,155,0.6)" strokeWidth="1.5" />
                  <circle cx="76" cy="42" r="30" fill="rgba(192,225,210,0.2)" stroke="rgba(192,225,210,0.6)" strokeWidth="1.5" />
                  <text x="28" y="44" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2D3436" opacity="0.7">You</text>
                  <text x="92" y="44" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2D3436" opacity="0.7">Them</text>
                  <text x="60" y="44" textAnchor="middle" fontSize="8" fontWeight="900" fill="#DC9B9B">SWAP!</text>
                </svg>
              </div>
            </BentoGridItem>

            {/* Trust Radar — 1-col */}
            <BentoGridItem className="relative overflow-hidden min-h-[280px] flex flex-col group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-barter/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-heading font-black text-text mb-2">Trust Radar</h3>
              <p className="text-text/65 text-xs leading-relaxed mb-3">
                Hexagonal visualization of speed, quality, and barter history across 6 dimensions.
              </p>
              <div className="flex-1 flex items-center justify-center">
                <HexagonalTrustRadar
                  trustScore={previewTrustScore}
                  size="sm"
                  showLabels={false}
                  className="hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </div>
            </BentoGridItem>

            {/* UPI — 1-col */}
            <BentoGridItem className="relative overflow-hidden min-h-[260px] flex flex-col group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-lg font-heading font-black text-text mb-2">UPI Escrow Trades</h3>
              <p className="text-text/65 text-xs leading-relaxed mb-4">
                Back swaps with UPI escrow. Zero fees for pure barters, instant release on completion.
              </p>
              <div className="bg-background border border-card rounded-xl p-3 font-mono text-[10px] space-y-1.5 mt-auto">
                <div className="flex justify-between items-center pb-1.5 border-b border-card/60">
                  <span className="font-black text-text/40 text-[9px] uppercase tracking-wider">BARTER RECEIPT</span>
                  <span className="text-action font-black">₹0.00</span>
                </div>
                <div className="flex justify-between"><span className="text-text/50">SWAP ID</span><span className="font-bold text-text">#S-849301</span></div>
                <div className="flex justify-between"><span className="text-text/50">STATUS</span>
                  <span className="text-green-600 font-black flex items-center gap-0.5"><Check className="w-2.5 h-2.5" strokeWidth={3} /> VERIFIED</span>
                </div>
              </div>
            </BentoGridItem>

            {/* Hyperlocal — 1-col */}
            <BentoGridItem className="relative overflow-hidden min-h-[260px] flex flex-col group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-barter/20 flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-heading font-black text-text mb-2">Hyperlocal Discovery</h3>
              <p className="text-text/65 text-xs leading-relaxed mb-4">
                Find creators within your city. Meet over coffee, collaborate in coworking spaces.
              </p>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-20 h-20 rounded-full border border-card/50 bg-card/20 flex items-center justify-center">
                  <div className="absolute inset-3 rounded-full border border-card/30" />
                  <div className="absolute inset-6 rounded-full border border-card/20" />
                  <span className="absolute top-3 left-5 w-2 h-2 bg-action rounded-full animate-ping" />
                  <span className="absolute bottom-5 right-4 w-2 h-2 bg-barter rounded-full animate-pulse" />
                  <span className="absolute top-5 right-3 w-1.5 h-1.5 bg-action/60 rounded-full" />
                  <div className="absolute inset-0 rounded-full border-r-2 border-t-2 border-action/30 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>
            </BentoGridItem>

            {/* Video Pitches — 2-col */}
            <BentoGridItem className="md:col-span-2 relative overflow-hidden min-h-[260px] flex flex-col md:flex-row gap-6 items-center group hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-action/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="text-xl font-heading font-black text-text mb-2">15-Second Video Pitches</h3>
                <p className="text-text/65 text-sm leading-relaxed">
                  Creators upload short video bubbles onto the live constellation map. See the person, hear their pitch, and decide instantly.
                </p>
              </div>
              <div className="w-full md:w-52 bg-background border border-card rounded-2xl overflow-hidden shadow-md shrink-0">
                <div className="relative aspect-video bg-card overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=200&q=80"
                    alt="Video pitch preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-action shadow-lg hover:scale-110 transition-transform"
                    >
                      {isPlayingVideo ? <VolumeX className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-action" />}
                    </button>
                  </div>
                  {isPlayingVideo && (
                    <div className="absolute bottom-2 left-2 flex gap-0.5 items-end h-4">
                      {[7, 10, 14, 8, 12, 9].map((h, i) => (
                        <div key={i} className="w-0.5 bg-white/80 rounded-full animate-bounce" style={{ height: h, animationDelay: `${i * 0.12}s` }} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-3 py-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-text/60">Priya Singh · Pitch</span>
                  <span className="text-[10px] font-black text-action">00:15</span>
                </div>
              </div>
            </BentoGridItem>

          </div>
        </div>
      </section>

      {/* ── MATCH MATH ──────────────────────────────────────────────── */}
      <section className="py-24 bg-card/15 border-b border-card/40">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <MatchMathPanel match={mockMatch} />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-action bg-action/8 border border-action/20 px-3 py-1 rounded-full mb-5">Powered by Math</span>
              <h2 className="text-4xl font-heading font-black text-text mb-5 leading-tight">
                Prove the Match<br />Before the Swap
              </h2>
              <p className="text-text/60 text-sm leading-relaxed mb-7">
                Every swap is verified by the Skill Circle matching algorithm using Haversine distance, skill intersection theory, and trust delta matrices.
              </p>
              <div className="space-y-4">
                {[
                  { n: 1, t: 'Skill Intersection', d: 'Verifies direct skill overlaps between both parties before confirming compatibility.', c: 'action' },
                  { n: 2, t: 'Trust Alignment', d: 'Evaluates trust score deviations — quality, speed, and communication must align.', c: 'barter' },
                  { n: 3, t: 'Geographical Matrix', d: 'Haversine distance calculated for proximity matching and local collaboration.', c: 'action' },
                ].map(s => (
                  <div key={s.n} className="flex gap-4 items-start">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${s.c === 'action' ? 'bg-action/10 text-action' : 'bg-barter/25 text-text/70'}`}>
                      {s.n}
                    </div>
                    <div>
                      <div className="text-sm font-black text-text mb-0.5">{s.t}</div>
                      <div className="text-xs text-text/55 leading-relaxed">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-card/40 bg-white/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '10K+', lbl: 'Active Creators', sub: 'Across India' },
              { val: '50K+', lbl: 'Skills Swapped', sub: 'This year' },
              { val: '₹2Cr+', lbl: 'Value Created', sub: 'Zero cash spent' },
              { val: '98%', lbl: 'Satisfaction', sub: 'Verified ratings' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white/70 border border-card rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-heading font-black text-text mb-1">{s.val}</div>
                <div className="text-xs font-bold text-text/70">{s.lbl}</div>
                <div className="text-[10px] text-text/40 font-semibold mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-text/40 mb-4">Community Stories</span>
            <h2 className="text-4xl font-heading font-black text-text mb-3">What Creators Say</h2>
            <p className="text-text/55 text-sm max-w-sm mx-auto">Real barter success stories from the Skill Circle community.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { quote: "I swapped my brand identity work for Riya's React development. Zero cash, just skills. Smoothest collaboration I've ever had.", author: 'Deepak Kumar', role: 'Creative Director', swap: 'Branding ⇆ React', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80', rating: 5 },
              { quote: "Tech articles for a portfolio website. The trust score system gave me confidence to swap with someone I'd never met before.", author: 'Priya Singh', role: 'Freelance Copywriter', swap: 'Writing ⇆ Dev', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80', rating: 5 },
              { quote: "Connected with Vikram locally in Bangalore. Swapped SEO strategies for a Python API. Zero cost. The hyperlocal feature is brilliant.", author: 'Ananya Desai', role: 'SEO Consultant', swap: 'SEO ⇆ Python', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80', rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/80 border border-white rounded-3xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-action text-action" />
                    ))}
                  </div>
                  <p className="text-text/70 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex gap-3 items-center pt-4 border-t border-card/40">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <div className="text-xs font-black text-text">{t.author}</div>
                    <div className="text-[10px] text-text/45 mb-1">{t.role}</div>
                    <span className="text-[9px] font-black bg-barter/25 text-text/70 px-2 py-0.5 rounded-full">{t.swap}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-br from-action/8 via-background to-barter/8 border-t border-card/40">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        {/* Large decorative circles */}
        <div className="absolute -right-32 -top-32 w-64 h-64 rounded-full bg-action/5 blur-2xl" />
        <div className="absolute -left-32 -bottom-32 w-64 h-64 rounded-full bg-barter/8 blur-2xl" />

        <div className="container mx-auto px-6 text-center max-w-2xl relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-action to-[#E06060] flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-text mb-5 leading-tight">
            Ready to Swap<br />Your First Skill?
          </h2>
          <p className="text-text/60 text-base mb-10 max-w-md mx-auto leading-relaxed">
            Join 10,000+ Indian professionals trading code, design, and content — with zero fees and verified trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/discovery">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#DC9B9B] to-[#E06060] text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-sm"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            <Link href="/matches">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white border border-card text-text rounded-2xl font-bold hover:bg-card/30 transition-all shadow-md text-sm"
              >
                Browse Swap Matches
                <ArrowLeftRight className="w-4 h-4 text-text/50" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
