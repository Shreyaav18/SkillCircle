'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Layers, 
  Play, 
  LayoutDashboard, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  User as UserIcon, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck,
  ArrowLeftRight
} from 'lucide-react';
import { mockUsers } from '@/lib/constants/mockData';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/lib/store/userStore';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Hydration-safe state for currentUser
  const storeUser = useUserStore((state) => state.currentUser);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentUser = mounted ? storeUser : mockUsers[0];
  const barterCredits = 24; // Mock value matching dashboard

  const navItems = [
    { path: '/discovery', label: 'Explore', icon: Compass },
    { path: '/matches', label: 'Swap Deck', icon: ArrowLeftRight },
    { path: '/showcase', label: 'Showcase', icon: Play },
    { path: '/dashboard', label: 'Hustle Board', icon: LayoutDashboard },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <motion.div 
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-action to-barter/80 shadow-soft"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-5 w-5 text-white" />
                <motion.div 
                  className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-action to-barter/80 opacity-0 blur transition group-hover:opacity-40"
                  layout
                />
              </motion.div>
              <span className="font-heading text-2xl font-bold tracking-tight text-text">
                Skill<span className="bg-gradient-to-r from-action to-action bg-clip-text text-action">Circle</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className="relative px-4 py-2 text-sm font-medium text-text/80 transition-colors hover:text-text flex items-center gap-2 rounded-full"
                >
                  <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-action" : "text-text/60")} />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavTab" 
                      className="absolute inset-0 -z-10 bg-card rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions (Credits & Profile Dropdown) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Barter Credits Pill */}
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1 bg-barter/40 border border-barter/60 rounded-full text-xs font-semibold text-text shadow-soft"
              whileHover={{ scale: 1.03 }}
            >
              <ArrowLeftRight className="h-3.5 w-3.5 text-text/80" />
              <span>{barterCredits} Swaps</span>
            </motion.div>

            {/* Profile Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-card/50 transition-all focus:outline-none"
                whileTap={{ scale: 0.98 }}
              >
                {/* Custom Avatar with Gradient Initial */}
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-action to-[#F5B7B7] flex items-center justify-center text-xs font-bold text-white shadow-soft">
                  RS
                </div>
                <ChevronDown className={cn("h-4 w-4 text-text/60 transition-transform duration-200", showDropdown && "rotate-180")} />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-background border border-card p-2 shadow-xl z-50"
                  >
                    {/* User Profile Summary */}
                    <div className="px-3 py-2 border-b border-card/40 mb-1">
                      <p className="font-semibold text-text text-sm">{currentUser.name}</p>
                      <p className="text-xs text-text/60 truncate">{currentUser.email}</p>
                      
                      {/* Trust Score Quick Info */}
                      <div className="mt-2.5 flex items-center justify-between bg-card/40 rounded-xl p-2">
                        <span className="text-xs text-text/60 flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-action" />
                          Trust Score:
                        </span>
                        <span className="text-xs font-bold text-text bg-background px-1.5 py-0.5 rounded border border-card/60">
                          {currentUser.trustScore.overall}/100
                        </span>
                      </div>
                    </div>

                    {/* Menu Actions */}
                    <div className="space-y-0.5">
                      <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-text/80 hover:text-text rounded-xl hover:bg-card/50 transition-colors">
                        <LayoutDashboard className="h-4 w-4 text-text/60" />
                        <span>Hustle Dashboard</span>
                      </Link>
                      <Link href="/matches" className="flex items-center gap-2 px-3 py-2 text-sm text-text/80 hover:text-text rounded-xl hover:bg-card/50 transition-colors">
                        <ArrowLeftRight className="h-4 w-4 text-text/60" />
                        <span>Barter Matches</span>
                      </Link>
                      <Link 
                        href="/settings" 
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text/80 hover:text-text rounded-xl hover:bg-card/50 transition-colors text-left focus:outline-none"
                      >
                        <Settings className="h-4 w-4 text-text/60" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-card/40 my-1" />

                    <button 
                      onClick={() => alert('Sign out placeholder')} 
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#E57373] hover:text-[#DC9B9B] rounded-xl hover:bg-card/30 transition-colors text-left focus:outline-none"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Barter Credits Pill (Mobile) */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-barter/40 border border-barter/60 rounded-full text-[11px] font-semibold text-text shadow-soft">
              <span>{barterCredits} Swaps</span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-text/80 hover:bg-card/50 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-card/30 bg-background overflow-hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium transition-colors",
                      isActive 
                        ? "bg-card text-text" 
                        : "text-text/75 hover:bg-card/40 hover:text-text"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive ? "text-action" : "text-text/60")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Profile Info Panel */}
            <div className="border-t border-card/30 px-4 py-4 bg-card/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-action to-[#F5B7B7] flex items-center justify-center text-sm font-bold text-white shadow-soft">
                  RS
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{currentUser.name}</p>
                  <p className="text-xs text-text/60">{currentUser.email}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between bg-card/40 rounded-xl px-3 py-2 text-xs">
                <span className="text-text/60 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-action" />
                  Trust Score
                </span>
                <span className="font-bold text-text">
                  {currentUser.trustScore.overall}/100
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <Link 
                  href="/settings" 
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text/80 rounded-xl hover:bg-card/40 transition-colors text-left"
                >
                  <Settings className="h-4 w-4 text-text/60" />
                  <span>Account Settings</span>
                </Link>
                <button 
                  onClick={() => alert('Sign out placeholder')} 
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#E57373] rounded-xl hover:bg-card/20 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
