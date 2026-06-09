'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, MapPin, Check, Sparkles, 
  ShieldCheck, ArrowLeftRight, User as UserIcon, Send
} from 'lucide-react';
import { Gig } from '@/models/Gig';
import { mockUsers } from '@/lib/constants/mockData';

interface GigDetailDrawerProps {
  gig: Gig | null;
  onClose: () => void;
}

export const GigDetailDrawer: React.FC<GigDetailDrawerProps> = ({ gig, onClose }) => {
  const [proposalState, setProposalState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [selectedSkillToSwap, setSelectedSkillToSwap] = useState('');
  const [proposalMessage, setProposalMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Riya Sharma is mockUsers[0], who is the active user
  const activeUser = mockUsers[0];

  useEffect(() => {
    setProposalState('idle');
    setSelectedSkillToSwap('');
    setProposalMessage('');
    setErrorMsg('');
  }, [gig]);

  if (!gig) return null;

  const postedBy = mockUsers.find(u => u.id === gig.postedBy);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkillToSwap) {
      setErrorMsg('Please select a skill to barter.');
      return;
    }
    
    setErrorMsg('');
    setProposalState('sending');
    setTimeout(() => {
      setProposalState('sent');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {gig && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[620px] bg-background border-l border-card shadow-2xl z-50 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-card bg-card/30 flex justify-between items-center sticky top-0 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-action to-barter flex items-center justify-center shadow-soft text-white">
                  <Sparkles className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-extrabold text-text">Gig Details</h3>
                  <p className="text-[10px] text-text/50 font-bold uppercase tracking-wider">Barter Marketplace Hub</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 bg-card/40 rounded-full hover:bg-card text-text/60 hover:text-text transition-all focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div className="space-y-7">
                {/* Title and Category */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-action/10 border border-action/20 rounded-full text-[10px] font-bold text-action uppercase tracking-widest mb-3.5">
                    <span>★ {gig.category}</span>
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-text leading-tight">{gig.title}</h2>
                  
                  <div className="flex flex-wrap gap-4.5 mt-4 text-xs text-text/60 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4.5 h-4.5 text-text/45 shrink-0" />
                      Scope: {gig.duration.estimatedHours} Hours
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4.5 h-4.5 text-text/45 shrink-0" />
                      Start: {gig.duration.startDate ? new Date(gig.duration.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Flexible'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-text/50">Objective & Description</h4>
                  <div className="bg-card/20 border border-card/45 p-5 rounded-2xl">
                    <p className="text-sm text-text/85 leading-relaxed whitespace-pre-wrap">{gig.description}</p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-text/50">Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {gig.skillsRequired.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-card/70 rounded-xl shadow-sm">
                        <span className="text-sm font-bold text-text">{skill.name}</span>
                        <span className="text-[10px] font-bold text-action bg-action/10 px-2 py-0.5 rounded-full uppercase">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client / Poster Information */}
                {postedBy && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-text/50">Posted By</h4>
                    <div className="bg-white border border-card/50 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-13 h-13 rounded-xl overflow-hidden border border-card/60 shrink-0">
                          <img src={postedBy.avatar} alt={postedBy.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-text text-sm">{postedBy.name}</span>
                            {postedBy.isVerified && <ShieldCheck className="w-4.5 h-4.5 text-action fill-action/5" />}
                          </div>
                          <span className="text-xs text-text/60 font-medium flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-action" />
                            {postedBy.location.city}, {postedBy.location.state}
                          </span>
                        </div>
                      </div>

                      {/* Trust Score */}
                      <div className="text-right">
                        <span className="text-[10px] text-text/45 font-bold uppercase tracking-wider block mb-0.5">Reputation</span>
                        <div className="inline-flex items-center gap-1 bg-barter/30 px-2.5 py-1 rounded-lg border border-barter/55">
                          <span className="text-xs font-black text-text">{postedBy.trustScore.overall}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Barter Proposal Panel */}
              <div className="border-t border-card/75 pt-6 mt-8">
                <AnimatePresence mode="wait">
                  {proposalState === 'idle' && (
                    <form onSubmit={handleSubmitProposal} className="space-y-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        <ArrowLeftRight className="w-5 h-5 text-action" />
                        <h4 className="font-heading font-extrabold text-text">Propose a Barter Swap</h4>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text/60 block">Select a skill you want to offer in trade:</label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {activeUser.skills.map((s) => (
                            <button
                              type="button"
                              key={s.id}
                              onClick={() => {
                                setSelectedSkillToSwap(s.name);
                                setErrorMsg('');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col gap-0.5 items-center justify-center leading-tight focus:outline-none ${
                                selectedSkillToSwap === s.name
                                  ? 'bg-action border-action text-white shadow-soft-rose'
                                  : 'bg-white border-card hover:bg-card/20 text-text/80'
                              }`}
                            >
                              <span>{s.name}</span>
                              <span className={`text-[8px] font-bold uppercase ${selectedSkillToSwap === s.name ? 'text-white/80' : 'text-text/40'}`}>
                                {s.level}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-text/60 block">Proposal Message (Optional):</label>
                        <textarea
                          placeholder="Hey! I saw your gig and would love to trade my skills. Here is what I can do..."
                          rows={3}
                          value={proposalMessage}
                          onChange={(e) => setProposalMessage(e.target.value)}
                          className="w-full p-3 bg-white border border-card/80 rounded-xl focus:border-action focus:outline-none text-xs leading-relaxed"
                        />
                      </div>

                      {errorMsg && (
                        <p className="text-[#E57373] text-xs font-semibold">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full py-4 bg-action text-white rounded-full font-bold shadow-lg shadow-soft-rose transition-all flex items-center justify-center gap-2 group focus:outline-none hover:opacity-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Barter Proposal</span>
                      </button>
                    </form>
                  )}

                  {proposalState === 'sending' && (
                    <motion.div
                      key="sending-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full py-5 bg-card/40 text-text/80 border border-card rounded-2xl font-bold flex items-center justify-center gap-3"
                    >
                      <div className="w-5 h-5 border-2 border-action border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting proposal packages...</span>
                    </motion.div>
                  )}

                  {proposalState === 'sent' && (
                    <motion.div
                      key="success-btn"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full p-5 bg-barter/25 border border-barter rounded-2xl flex items-start gap-4 text-text"
                    >
                      <div className="w-9 h-9 rounded-full bg-barter flex items-center justify-center shrink-0 shadow-md">
                        <Check className="w-5 h-5 text-text font-black" />
                      </div>
                      <div>
                        <span className="font-extrabold block text-sm mb-0.5">Barter Trade Offer Sent!</span>
                        <span className="text-xs text-text/70 leading-relaxed block">
                          You proposed trading your **{selectedSkillToSwap}** skill. We have notified {postedBy?.name}. Track updates on your Hustle Board.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
