'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VideoBubbleGrid } from '@/components/cards/VideoBubble';
import { HexagonalTrustRadar } from '@/components/ui/HexagonalTrustRadar';
import { mockUsers } from '@/lib/constants/mockData';

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-heading font-bold text-text mb-4">
            SkillCircle Showcase
          </h1>
          <p className="text-lg text-text/70">
            Experience the innovative features that make SkillCircle unique
          </p>
        </motion.div>
      </div>

      {/* Video Bubbles Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-heading font-bold text-text mb-8">
            Proof-of-Skill Video Bubbles
          </h2>
          <p className="text-lg text-text/70 mb-8">
            Hover over the bubbles to see 15-second video pitches from talented professionals
          </p>

          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <VideoBubbleGrid
              users={mockUsers}
              maxPerRow={6}
              onBubbleClick={(user) => console.log('Clicked on:', user.name)}
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Radar Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-heading font-bold text-text mb-8">
            Hexagonal Trust Radar
          </h2>
          <p className="text-lg text-text/70 mb-8">
            Visual representation of a user's trustworthiness across three key dimensions
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {mockUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-soft text-center"
              >
                <h3 className="text-xl font-heading font-semibold text-text mb-4">
                  {user.name}
                </h3>
                <HexagonalTrustRadar
                  trustScore={user.trustScore}
                  size="md"
                  showLabels={true}
                  className="mb-4"
                />
                <p className="text-text/60">
                  Overall Trust Score: <span className="font-semibold text-action">{user.trustScore.overall}/100</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-heading font-bold text-text mb-8">
            More Features Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Barter Match Engine', desc: 'Find perfect skill swaps' },
              { title: 'Hyperlocal Filters', desc: 'Connect with nearby talents' },
              { title: 'UPI Checkout', desc: 'Seamless payments' },
              { title: 'Portfolio Connectors', desc: 'Showcase your work' },
              { title: 'Live Spotlight', desc: 'Real-time demos' },
              { title: 'Squad Bidding', desc: 'Team up for big projects' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-soft-rose transition-all cursor-pointer"
              >
                <h3 className="text-xl font-heading font-semibold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-text/70">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}