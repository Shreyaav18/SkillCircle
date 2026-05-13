'use client';

import Link from "next/link";
import { ArrowRight, Play, Sparkles, ArrowLeftRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoBubbleGrid } from "@/components/cards/VideoBubble";
import { mockUsers } from "@/lib/constants/mockData";
import { BentoGrid, BentoGridItem } from "@/components/layout/BentoGrid";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-barter/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-action/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full text-sm font-medium text-text mb-8 shadow-soft"
            >
              <Sparkles className="w-4 h-4 text-action" />
              India's First Barter-Based Skill Marketplace
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={item}
              className="text-6xl md:text-8xl font-heading font-bold text-text mb-6 leading-tight"
            >
              Where Skills
              <motion.span
                className="text-action block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Meet Magic
              </motion.span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-text/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Connect with talented professionals through skill swaps, video pitches, and real-time collaboration.
              No money needed — just skills.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/discovery">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 px-8 py-4 bg-action text-white rounded-full font-medium hover:bg-action/90 transition-all shadow-lg">
                    <span>Explore Marketplace</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>

              <Link href="/showcase">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-barter text-text rounded-full font-medium hover:bg-barter/80 transition-all shadow-soft"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Showcase</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
              Meet Our Talent
            </h2>
            <p className="text-lg text-text/70 max-w-2xl mx-auto">
              See their skills in action with 15-second video pitches
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 shadow-soft"
          >
            <VideoBubbleGrid users={mockUsers.slice(0, 6)} maxPerRow={6} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-text/70 max-w-3xl mx-auto">
              Transforming how professionals connect, collaborate, and create value together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔄",
                title: "Barter Match Engine",
                desc: "Find perfect skill swaps with intelligent matching. Trade your React skills for UI design, writing for marketing — the possibilities are endless.",
                color: "action",
              },
              {
                icon: "📍",
                title: "Hyperlocal Discovery",
                desc: "Connect with talented professionals in your city. Find collaborators for coffee shop meetings or local workshops.",
                color: "barter",
              },
              {
                icon: "💳",
                title: "UPI-Native Payments",
                desc: "Seamless transactions with India's preferred payment method. Pay or earn with instant UPI transfers.",
                color: "action",
              },
              {
                icon: "🎬",
                title: "Video Pitches",
                desc: "15-second video bubbles showcasing skills and personality. See beyond the resume with authentic introductions.",
                color: "barter",
              },
              {
                icon: "📊",
                title: "Trust Radar",
                desc: "Hexagonal visualization of reliability and performance across Quality, Speed, and Barter History.",
                color: "action",
              },
              {
                icon: "👥",
                title: "Squad Bidding",
                desc: "Team up with complementary skills for bigger projects. One designer + one developer = perfect team.",
                color: "barter",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <BentoGridItem className="text-center h-full">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-heading font-semibold text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text/70 leading-relaxed">
                    {feature.desc}
                  </p>
                </BentoGridItem>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "50K+", label: "Skills Swapped" },
              { value: "₹2Cr+", label: "Value Created" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-8 text-action" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
              Ready to Transform Your Skills?
            </h2>
            <p className="text-xl text-text/70 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals building meaningful connections through
              skill-based collaboration. Your next opportunity is just a swap away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/discovery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-action text-white rounded-full font-medium hover:bg-action/90 transition-all shadow-lg"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/matches">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-barter text-text rounded-full font-medium hover:bg-barter/80 transition-all shadow-soft"
                >
                  Find Barter Matches
                  <ArrowLeftRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
