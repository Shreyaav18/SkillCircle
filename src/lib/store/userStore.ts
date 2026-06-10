'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Skill, SkillCategory, SkillLevel, PortfolioProject } from '@/models/User';
import { mockUsers } from '@/lib/constants/mockData';

// Custom types for Settings
export interface UpiSettings {
  upiId: string;
  verified: boolean;
}

export interface NotificationPreferences {
  emailMatches: boolean;
  emailGigs: boolean;
  emailSystem: boolean;
  pushRealtime: boolean;
  pushSecurity: boolean;
}

export interface DeveloperSettings {
  databaseMode: 'mock' | 'sqlite' | 'postgres' | 'firebase';
  enableSync: boolean;
  apiUrl: string;
  mockDelay: number; // in milliseconds
  offlineSync: 'queue' | 'ignore' | 'prompt';
  debugLogging: boolean;
}

interface UserState {
  currentUser: User;
  upiSettings: UpiSettings;
  notifications: NotificationPreferences;
  developerSettings: DeveloperSettings;
  
  // Actions
  updateCurrentUser: (fields: Partial<User>) => void;
  updateUpiSettings: (fields: Partial<UpiSettings>) => void;
  updateNotifications: (fields: Partial<NotificationPreferences>) => void;
  updateDeveloperSettings: (fields: Partial<DeveloperSettings>) => void;
  
  // Skill & Wants Actions
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (skillId: string) => void;
  addWant: (want: Omit<Skill, 'id'>) => void;
  removeWant: (wantId: string) => void;
  
  // Portfolio Actions
  addPortfolioProject: (project: Omit<PortfolioProject, 'id'>) => void;
  removePortfolioProject: (projectId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Default state loaded from mock data
      currentUser: {
        ...mockUsers[0],
        // Ensure joinedAt can be read back as Date if serialized
        joinedAt: new Date(mockUsers[0].joinedAt),
      },
      upiSettings: {
        upiId: 'riya.sharma@okaxis',
        verified: true,
      },
      notifications: {
        emailMatches: true,
        emailGigs: true,
        emailSystem: false,
        pushRealtime: true,
        pushSecurity: true,
      },
      developerSettings: {
        databaseMode: 'mock',
        enableSync: false,
        apiUrl: 'https://api.skillcircle.in/v1',
        mockDelay: 300,
        offlineSync: 'queue',
        debugLogging: false,
      },

      updateCurrentUser: (fields) =>
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            ...fields,
            portfolio: fields.portfolio 
              ? { ...state.currentUser.portfolio, ...fields.portfolio }
              : state.currentUser.portfolio,
            location: fields.location
              ? { ...state.currentUser.location, ...fields.location }
              : state.currentUser.location,
          },
        })),

      updateUpiSettings: (fields) =>
        set((state) => ({
          upiSettings: {
            ...state.upiSettings,
            ...fields,
          },
        })),

      updateNotifications: (fields) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            ...fields,
          },
        })),

      updateDeveloperSettings: (fields) =>
        set((state) => ({
          developerSettings: {
            ...state.developerSettings,
            ...fields,
          },
        })),

      addSkill: (skill) =>
        set((state) => {
          const newSkill: Skill = {
            ...skill,
            id: skill.name.toLowerCase().replace(/\s+/g, '-'),
          };
          // Avoid duplicate skill ID
          if (state.currentUser.skills.some(s => s.id === newSkill.id)) {
            return {};
          }
          return {
            currentUser: {
              ...state.currentUser,
              skills: [...state.currentUser.skills, newSkill],
            },
          };
        }),

      removeSkill: (skillId) =>
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            skills: state.currentUser.skills.filter((s) => s.id !== skillId),
          },
        })),

      addWant: (want) =>
        set((state) => {
          const newWant: Skill = {
            ...want,
            id: want.name.toLowerCase().replace(/\s+/g, '-'),
          };
          if (state.currentUser.wants.some(w => w.id === newWant.id)) {
            return {};
          }
          return {
            currentUser: {
              ...state.currentUser,
              wants: [...state.currentUser.wants, newWant],
            },
          };
        }),

      removeWant: (wantId) =>
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            wants: state.currentUser.wants.filter((w) => w.id !== wantId),
          },
        })),

      addPortfolioProject: (project) =>
        set((state) => {
          const newProj: PortfolioProject = {
            ...project,
            id: `p-${Date.now()}`,
          };
          const currentPortfolio = state.currentUser.portfolio || {};
          const currentProjects = currentPortfolio.projects || [];
          return {
            currentUser: {
              ...state.currentUser,
              portfolio: {
                ...currentPortfolio,
                projects: [...currentProjects, newProj],
              },
            },
          };
        }),

      removePortfolioProject: (projectId) =>
        set((state) => {
          const currentPortfolio = state.currentUser.portfolio || {};
          const currentProjects = currentPortfolio.projects || [];
          return {
            currentUser: {
              ...state.currentUser,
              portfolio: {
                ...currentPortfolio,
                projects: currentProjects.filter((p) => p.id !== projectId),
              },
            },
          };
        }),
    }),
    {
      name: 'skill-circle-user-settings',
    }
  )
);
