'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  ArrowRight, 
  Heart 
} from 'lucide-react';

// Custom SVG Icons to avoid lucide-react version compatibility issues
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { label: 'Discover Gigs', href: '/discovery?tab=gigs' },
        { label: 'Meet Talent', href: '/discovery?tab=profiles' },
        { label: 'Success Showcase', href: '/showcase' },
        { label: 'Hustle Board', href: '/dashboard' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Swap Deck', href: '/matches' },
        { label: 'Trust Radar', href: '/' },
        { label: 'How it Works', href: '/' },
        { label: 'Success Stories', href: '/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/' },
        { label: 'Careers', href: '/' },
        { label: 'Terms of Swap', href: '/' },
        { label: 'Privacy Policy', href: '/' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-card bg-background py-16 text-text">
      {/* Decorative Blur Blobs to Match Hero Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-barter/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-40 -left-20 w-80 h-80 bg-action/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 0.95, 1.1],
            x: [0, -10, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="group flex items-center gap-2">
              <motion.div 
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-action to-barter/80 shadow-soft"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-5 w-5 text-white" />
                <motion.div 
                  className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-action to-barter/80 opacity-0 blur transition group-hover:opacity-40"
                />
              </motion.div>
              <span className="font-heading text-2xl font-bold tracking-tight text-text">
                Skill<span className="bg-gradient-to-r from-action to-action bg-clip-text text-action">Circle</span>
              </span>
            </Link>
            <p className="text-text/75 text-sm leading-relaxed max-w-sm">
              India's premier skill-based marketplace. Trade your skills, collaborate in real time, and grow your squad without spending a rupee.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
                { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
                { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' }
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-card/60 hover:bg-card border border-card/40 text-text/80 hover:text-action transition-all shadow-soft"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="h-4.5 w-4.5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="lg:col-span-1 space-y-4">
              <h4 className="font-heading text-lg font-bold text-text">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} passHref>
                      <motion.span
                        className="text-sm text-text/75 hover:text-action cursor-pointer block w-fit transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading text-lg font-bold text-text">
              Get Weekly Swap Alerts
            </h4>
            <p className="text-text/75 text-sm leading-relaxed">
              No spam. Just the hottest barter opportunities and top-rated squads in your area.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/40" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-card/60 rounded-xl border border-card/40 focus:border-action focus:ring-1 focus:ring-action/20 focus:outline-none transition-all text-sm"
                />
              </div>
              <motion.button
                type="submit"
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-action hover:opacity-95 hover:shadow-soft-rose text-white rounded-xl font-medium shadow-soft text-sm transition-all whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>
            {isSubscribed && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-medium text-action mt-2"
              >
                🎉 Swapping magic on the way! Thank you for subscribing.
              </motion.p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text/60">
          <p>
            &copy; {new Date().getFullYear()} SkillCircle. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-action fill-action animate-pulse" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
