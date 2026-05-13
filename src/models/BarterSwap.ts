import { User, Skill } from './User';

export interface BarterSwap {
  id: string;
  status: SwapStatus;
  initiatedBy: string; // User ID
  participants: {
    userA: User;
    userB: User;
  };
  skills: {
    offered: {
      byUserA: Skill;
      byUserB: Skill;
    };
    requested: {
      byUserA: Skill;
      byUserB: Skill;
    };
  };
  timeline: SwapTimeline[];
  messages: SwapMessage[];
  createdAt: Date;
  updatedAt: Date;
  expirationDate?: Date;
  terms?: SwapTerms;
  rating?: {
    fromUserA: number; // 1-5 stars
    fromUserB: number; // 1-5 stars
    comment?: string;
  };
}

export interface SwapTimeline {
  id: string;
  action: SwapAction;
  timestamp: Date;
  performedBy: string; // User ID
  details?: string;
}

export interface SwapMessage {
  id: string;
  senderId: string; // User ID
  content: string;
  type: MessageType;
  timestamp: Date;
  isRead: boolean;
}

export interface SwapTerms {
  estimatedDuration: string;
  deliverables: string[];
  communicationMethod: string;
  deadline?: Date;
  backupPlan?: string;
}

export enum SwapStatus {
  PROPOSED = 'proposed',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  DISPUTED = 'disputed'
}

export enum SwapAction {
  PROPOSED = 'proposed',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  STARTED = 'started',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RATED = 'rated'
}

export enum MessageType {
  TEXT = 'text',
  FILE = 'file',
  SYSTEM = 'system',
  DELIVERABLE = 'deliverable'
}

export interface BarterMatch {
  userA: User;
  userB: User;
  mutualSkills: {
    offeredByA: Skill[];
    offeredByB: Skill[];
    requestedByA: Skill[];
    requestedByB: Skill[];
  };
  matchScore: number; // 0-100
  compatibilityFactors: string[];
}