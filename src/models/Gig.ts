import { User, SkillCategory, Skill } from './User';

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  budget: Budget;
  postedBy: string; // User ID
  skillsRequired: Skill[];
  duration: Duration;
  status: GigStatus;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  urgency?: Urgency;
  location?: {
    remote: boolean;
    city?: string;
    state?: string;
  };
  proposals: Proposal[];
  maxProposals?: number;
}

export interface Budget {
  min: number; // in INR
  max: number; // in INR
  currency: 'INR';
  type: BudgetType;
}

export interface Duration {
  type: DurationType;
  estimatedHours?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface Proposal {
  id: string;
  gigId: string;
  freelancerId: string;
  message: string;
  proposedPrice?: number;
  estimatedDuration?: string;
  status: ProposalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum GigStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  UNDER_REVIEW = 'under_review',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

export enum ProposalStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn'
}

export enum BudgetType {
  FIXED = 'fixed',
  HOURLY = 'hourly',
  RANGE = 'range'
}

export enum DurationType {
  HOURLY = 'hourly',
  FIXED_TERM = 'fixed_term',
  ONGOING = 'ongoing'
}

export enum Urgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}