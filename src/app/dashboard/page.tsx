'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/layout/BentoGrid';
import { Wallet, ArrowLeftRight, TrendingUp, Award, Calendar, Clock } from 'lucide-react';
import { mockUsers } from '@/lib/constants/mockData';
import { HexagonalTrustRadar } from '@/components/ui/HexagonalTrustRadar';
import { useUserStore } from '@/lib/store/userStore';

const mockEarnings = {
  totalEarnings: 125000,
  barterCredits: 24,
  monthlyBreakdown: [
    { month: 'Jan 2026', inr: 15000, barterCredits: 3, gigsCompleted: 2, swapsCompleted: 4 },
    { month: 'Feb 2026', inr: 18000, barterCredits: 5, gigsCompleted: 3, swapsCompleted: 2 },
    { month: 'Mar 2026', inr: 22000, barterCredits: 4, gigsCompleted: 4, swapsCompleted: 3 },
    { month: 'Apr 2026', inr: 16500, barterCredits: 3, gigsCompleted: 2, swapsCompleted: 2 },
    { month: 'May 2026', inr: 28000, barterCredits: 8, gigsCompleted: 4, swapsCompleted: 5 },
  ]
};

export default function DashboardPage() {
  const storeUser = useUserStore((state) => state.currentUser);
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentUser = mounted ? storeUser : mockUsers[0];

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
              The Hustle Dashboard
            </h1>
            <p className="text-text/60 mt-1">
              Track your earnings and barter activity
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <BentoGridItem delay={0}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-action/20 rounded-xl flex items-center justify-center">
                <Wallet className="text-action" size={24} />
              </div>
              <div>
                <p className="text-text/60 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-text">₹{mockEarnings.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </BentoGridItem>

          <BentoGridItem delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-barter/50 rounded-xl flex items-center justify-center">
                <ArrowLeftRight className="text-text" size={24} />
              </div>
              <div>
                <p className="text-text/60 text-sm">Barter Credits</p>
                <p className="text-2xl font-bold text-text">{mockEarnings.barterCredits}</p>
              </div>
            </div>
          </BentoGridItem>

          <BentoGridItem delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-action/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-action" size={24} />
              </div>
              <div>
                <p className="text-text/60 text-sm">This Month</p>
                <p className="text-2xl font-bold text-text">₹{mockEarnings.monthlyBreakdown[mockEarnings.monthlyBreakdown.length - 1].inr.toLocaleString()}</p>
              </div>
            </div>
          </BentoGridItem>

          <BentoGridItem delay={0.3}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-barter/50 rounded-xl flex items-center justify-center">
                <Award className="text-text" size={24} />
              </div>
              <div>
                <p className="text-text/60 text-sm">Rating</p>
                <p className="text-2xl font-bold text-text">{currentUser.trustScore.overall}/100</p>
              </div>
            </div>
          </BentoGridItem>
        </div>

        {/* Trust Radar & Profile */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <BentoGridItem className="lg:col-span-1">
            <h3 className="text-lg font-heading font-semibold text-text mb-4">Your Trust Score</h3>
            <HexagonalTrustRadar
              trustScore={currentUser.trustScore}
              size="md"
              showLabels={true}
            />
          </BentoGridItem>

          <BentoGridItem className="lg:col-span-2">
            <h3 className="text-lg font-heading font-semibold text-text mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { type: 'gig', title: 'React Native App', amount: '₹50,000', date: '2 days ago', status: 'completed' },
                { type: 'swap', title: 'UI Design for Code', amount: '1 credit', date: '5 days ago', status: 'completed' },
                { type: 'gig', title: 'E-commerce Integration', amount: '₹25,000', date: '1 week ago', status: 'in-progress' },
                { type: 'swap', title: 'Writing for Design', amount: '1 credit', date: '1 week ago', status: 'completed' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-card/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'gig' ? 'bg-action/20' : 'bg-barter/50'
                    }`}>
                      {activity.type === 'gig' ? (
                        <Wallet size={18} className="text-action" />
                      ) : (
                        <ArrowLeftRight size={18} className="text-text" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text">{activity.title}</p>
                      <p className="text-sm text-text/60">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text">{activity.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'completed' ? 'bg-barter/50 text-text' : 'bg-action/20 text-action'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </BentoGridItem>
        </div>

        {/* Monthly Breakdown */}
        <BentoGridItem>
          <h3 className="text-lg font-heading font-semibold text-text mb-4">Monthly Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card/50">
                  <th className="text-left py-2 text-sm font-medium text-text/60">Month</th>
                  <th className="text-right py-2 text-sm font-medium text-text/60">Earnings</th>
                  <th className="text-right py-2 text-sm font-medium text-text/60">Barter</th>
                  <th className="text-right py-2 text-sm font-medium text-text/60">Gigs</th>
                  <th className="text-right py-2 text-sm font-medium text-text/60">Swaps</th>
                </tr>
              </thead>
              <tbody>
                {mockEarnings.monthlyBreakdown.map((month, idx) => (
                  <motion.tr
                    key={month.month}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-b border-card/50 last:border-0"
                  >
                    <td className="py-3 text-text">{month.month}</td>
                    <td className="py-3 text-right font-medium text-action">₹{month.inr.toLocaleString()}</td>
                    <td className="py-3 text-right font-medium text-text">{month.barterCredits}</td>
                    <td className="py-3 text-right text-text">{month.gigsCompleted}</td>
                    <td className="py-3 text-right text-text">{month.swapsCompleted}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoGridItem>
      </div>
    </div>
  );
}