export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: Skill[];
  wants: Skill[];
  location: Location;
  trustScore: TrustScore;
  portfolio?: Portfolio;
  joinedAt: Date;
  isVerified?: boolean;
  hourlyRate?: number;
  bio?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  yearsOfExperience?: number;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface TrustScore {
  quality: number; // 0-100
  speed: number; // 0-100
  barterHistory: number; // 0-100
  reliability: number; // 0-100
  communication: number; // 0-100
  cooperation: number; // 0-100
  overall: number; // 0-100
}

export interface Portfolio {
  github?: string;
  behance?: string;
  website?: string;
  projects?: PortfolioProject[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  tags: string[];
}

export enum SkillCategory {
  CODING = 'coding',
  DESIGN = 'design',
  WRITING = 'writing',
  MARKETING = 'marketing',
  BUSINESS = 'business',
  OTHER = 'other'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}