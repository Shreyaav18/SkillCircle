import { User, Skill, SkillCategory, SkillLevel } from '../../models/User';
import { Gig, BudgetType, DurationType, GigStatus, Urgency } from '../../models/Gig';
import { BarterSwap, SwapStatus, SwapAction } from '../../models/BarterSwap';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Riya Sharma',
    email: 'riya.sharma@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Full-stack developer with 5+ years of experience building scalable web applications.',
    skills: [
      {
        id: 'react',
        name: 'React',
        category: SkillCategory.CODING,
        level: SkillLevel.EXPERT,
        yearsOfExperience: 5
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        category: SkillCategory.CODING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 4
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: SkillCategory.CODING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 3
      }
    ],
    wants: [
      {
        id: 'ui-design',
        name: 'UI/UX Design',
        category: SkillCategory.DESIGN,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: undefined
      },
      {
        id: 'python',
        name: 'Python',
        category: SkillCategory.CODING,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: undefined
      },
      {
        id: 'seo',
        name: 'SEO Optimization',
        category: SkillCategory.MARKETING,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: undefined
      }
    ],
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      coordinates: {
        latitude: 19.0760,
        longitude: 72.8777
      }
    },
    trustScore: {
      quality: 95,
      speed: 88,
      barterHistory: 92,
      reliability: 94,
      communication: 90,
      cooperation: 91,
      overall: 92
    },
    portfolio: {
      github: 'https://github.com/riyasharma',
      behance: 'https://behance.net/riyasharma',
      projects: [
        {
          id: 'p1',
          title: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with React and Node.js',
          imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=600&h=400&q=80',
          url: 'https://github.com/riyasharma/ecommerce',
          tags: ['React', 'Node.js', 'MongoDB']
        }
      ]
    },
    joinedAt: new Date('2023-01-15'),
    isVerified: true,
    hourlyRate: 1500
  },
  {
    id: '2',
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Creative UI/UX designer passionate about creating intuitive digital experiences.',
    skills: [
      {
        id: 'figma',
        name: 'Figma',
        category: SkillCategory.DESIGN,
        level: SkillLevel.EXPERT,
        yearsOfExperience: 6
      },
      {
        id: 'ui-design',
        name: 'UI Design',
        category: SkillCategory.DESIGN,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 5
      },
      {
        id: 'prototyping',
        name: 'Prototyping',
        category: SkillCategory.DESIGN,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 4
      }
    ],
    wants: [
      {
        id: 'react',
        name: 'React Development',
        category: SkillCategory.CODING,
        level: SkillLevel.BEGINNER,
        yearsOfExperience: undefined
      },
      {
        id: 'animation',
        name: 'Animation',
        category: SkillCategory.DESIGN,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: undefined
      }
    ],
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946
      }
    },
    trustScore: {
      quality: 92,
      speed: 90,
      barterHistory: 85,
      reliability: 91,
      communication: 88,
      cooperation: 89,
      overall: 89
    },
    portfolio: {
      behance: 'https://behance.net/arjunpatel',
      website: 'https://arjunpatel.design',
      projects: [
        {
          id: 'p2',
          title: 'Banking App Design',
          description: 'Mobile banking app UI/UX design system',
          imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&h=400&q=80',
          url: 'https://behance.net/arjunpatel/banking-app',
          tags: ['Figma', 'UI Design', 'Mobile App']
        }
      ]
    },
    joinedAt: new Date('2023-02-20'),
    isVerified: true,
    hourlyRate: 1200
  },
  {
    id: '3',
    name: 'Priya Singh',
    email: 'priya.singh@email.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Content writer specializing in tech blogs and marketing copy.',
    skills: [
      {
        id: 'tech-writing',
        name: 'Tech Writing',
        category: SkillCategory.WRITING,
        level: SkillLevel.EXPERT,
        yearsOfExperience: 7
      },
      {
        id: 'copywriting',
        name: 'Copywriting',
        category: SkillCategory.WRITING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 5
      },
      {
        id: 'content-strategy',
        name: 'Content Strategy',
        category: SkillCategory.MARKETING,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: 3
      }
    ],
    wants: [
      {
        id: 'seo',
        name: 'SEO Optimization',
        category: SkillCategory.MARKETING,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: undefined
      },
      {
        id: 'video-editing',
        name: 'Video Editing',
        category: SkillCategory.DESIGN,
        level: SkillLevel.BEGINNER,
        yearsOfExperience: undefined
      }
    ],
    location: {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      coordinates: {
        latitude: 28.6139,
        longitude: 77.2090
      }
    },
    trustScore: {
      quality: 94,
      speed: 86,
      barterHistory: 90,
      reliability: 95,
      communication: 93,
      cooperation: 92,
      overall: 90
    },
    portfolio: {
      website: 'https://priyasinghwrites.com',
      projects: [
        {
          id: 'p3',
          title: 'Tech Blog Series',
          description: 'Comprehensive guide series on web development',
          imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&h=400&q=80',
          url: 'https://priyasinghwrites.com/web-dev-guide',
          tags: ['Tech Writing', 'Blogging', 'Education']
        }
      ]
    },
    joinedAt: new Date('2023-03-10'),
    isVerified: true,
    hourlyRate: 800
  },
  {
    id: '4',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@email.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Python developer with expertise in data science and machine learning.',
    skills: [
      {
        id: 'python',
        name: 'Python',
        category: SkillCategory.CODING,
        level: SkillLevel.EXPERT,
        yearsOfExperience: 8
      },
      {
        id: 'ml',
        name: 'Machine Learning',
        category: SkillCategory.CODING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 5
      },
      {
        id: 'data-analysis',
        name: 'Data Analysis',
        category: SkillCategory.BUSINESS,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 4
      }
    ],
    wants: [
      {
        id: 'react',
        name: 'React Development',
        category: SkillCategory.CODING,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: undefined
      },
      {
        id: 'ui-design',
        name: 'UI Design',
        category: SkillCategory.DESIGN,
        level: SkillLevel.BEGINNER,
        yearsOfExperience: undefined
      }
    ],
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      coordinates: {
        latitude: 17.3850,
        longitude: 78.4867
      }
    },
    trustScore: {
      quality: 91,
      speed: 87,
      barterHistory: 88,
      reliability: 90,
      communication: 86,
      cooperation: 87,
      overall: 89
    },
    portfolio: {
      github: 'https://github.com/vikramreddy',
      projects: [
        {
          id: 'p4',
          title: 'ML Prediction Model',
          description: 'Machine learning model for sales prediction',
          imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=600&h=400&q=80',
          url: 'https://github.com/vikramreddy/sales-prediction',
          tags: ['Python', 'Machine Learning', 'Pandas']
        }
      ]
    },
    joinedAt: new Date('2023-04-05'),
    isVerified: true,
    hourlyRate: 2000
  },
  {
    id: '5',
    name: 'Ananya Desai',
    email: 'ananya.desai@email.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Digital marketer helping businesses grow their online presence.',
    skills: [
      {
        id: 'social-media',
        name: 'Social Media Marketing',
        category: SkillCategory.MARKETING,
        level: SkillLevel.EXPERT,
        yearsOfExperience: 6
      },
      {
        id: 'seo',
        name: 'SEO',
        category: SkillCategory.MARKETING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 5
      },
      {
        id: 'content-marketing',
        name: 'Content Marketing',
        category: SkillCategory.MARKETING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 4
      }
    ],
    wants: [
      {
        id: 'typescript',
        name: 'TypeScript Development',
        category: SkillCategory.CODING,
        level: SkillLevel.INTERMEDIATE,
        yearsOfExperience: undefined
      },
      {
        id: 'graphic-design',
        name: 'Graphic Design',
        category: SkillCategory.DESIGN,
        level: SkillLevel.BEGINNER,
        yearsOfExperience: undefined
      }
    ],
    location: {
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      coordinates: {
        latitude: 18.5204,
        longitude: 73.8567
      }
    },
    trustScore: {
      quality: 93,
      speed: 89,
      barterHistory: 91,
      reliability: 93,
      communication: 92,
      cooperation: 90,
      overall: 91
    },
    portfolio: {
      website: 'https://ananyadesai.in',
      projects: [
        {
          id: 'p5',
          title: 'Brand Campaign Strategy',
          description: 'Complete digital marketing campaign for startup',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80',
          url: 'https://ananyadesai.in/startup-campaign',
          tags: ['Social Media', 'SEO', 'Strategy']
        }
      ]
    },
    joinedAt: new Date('2023-05-12'),
    isVerified: true,
    hourlyRate: 1000
  }
];

export const mockGigs: Gig[] = [
  {
    id: 'g1',
    title: 'React Native Mobile App Development',
    description: 'Need a React Native developer to build a fitness tracking app with social features.',
    category: SkillCategory.CODING,
    budget: {
      min: 50000,
      max: 80000,
      currency: 'INR',
      type: BudgetType.FIXED
    },
    postedBy: '1',
    skillsRequired: [
      {
        id: 'react-native',
        name: 'React Native',
        category: SkillCategory.CODING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 3
      }
    ],
    duration: {
      type: DurationType.FIXED_TERM,
      estimatedHours: 200,
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-08-01')
    },
    status: GigStatus.OPEN,
    createdAt: new Date('2026-05-10'),
    updatedAt: new Date('2026-05-10'),
    tags: ['mobile', 'react-native', 'fitness', 'social'],
    urgency: Urgency.HIGH,
    location: {
      remote: true
    },
    proposals: [],
    maxProposals: 10
  },
  {
    id: 'g2',
    title: 'Brand Identity Design for Tech Startup',
    description: 'Looking for a creative designer to create a complete brand identity including logo, color palette, and brand guidelines.',
    category: SkillCategory.DESIGN,
    budget: {
      min: 30000,
      max: 50000,
      currency: 'INR',
      type: BudgetType.FIXED
    },
    postedBy: '2',
    skillsRequired: [
      {
        id: 'branding',
        name: 'Branding',
        category: SkillCategory.DESIGN,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 5
      }
    ],
    duration: {
      type: DurationType.FIXED_TERM,
      estimatedHours: 80,
      startDate: new Date('2026-05-20'),
      endDate: new Date('2026-06-20')
    },
    status: GigStatus.OPEN,
    createdAt: new Date('2026-05-08'),
    updatedAt: new Date('2026-05-08'),
    tags: ['branding', 'logo', 'identity', 'startup'],
    location: {
      remote: true
    },
    proposals: [],
    maxProposals: 5
  },
  {
    id: 'g3',
    title: 'Content Strategy for Blog Platform',
    description: 'Need an experienced content writer to develop a content strategy and write 10 articles about web development.',
    category: SkillCategory.WRITING,
    budget: {
      min: 25000,
      max: 40000,
      currency: 'INR',
      type: BudgetType.FIXED
    },
    postedBy: '3',
    skillsRequired: [
      {
        id: 'content-strategy',
        name: 'Content Strategy',
        category: SkillCategory.WRITING,
        level: SkillLevel.ADVANCED,
        yearsOfExperience: 5
      }
    ],
    duration: {
      type: DurationType.FIXED_TERM,
      estimatedHours: 60,
      startDate: new Date('2026-05-25'),
      endDate: new Date('2026-06-25')
    },
    status: GigStatus.OPEN,
    createdAt: new Date('2026-05-12'),
    updatedAt: new Date('2026-05-12'),
    tags: ['content', 'blogging', 'web-dev', 'strategy'],
    location: {
      remote: true
    },
    proposals: [],
    maxProposals: 8
  }
];

export const mockBarterSwaps: BarterSwap[] = [
  {
    id: 's1',
    status: SwapStatus.PROPOSED,
    initiatedBy: '1',
    participants: {
      userA: mockUsers[0],
      userB: mockUsers[1]
    },
    skills: {
      offered: {
        byUserA: mockUsers[0].skills[0],
        byUserB: mockUsers[1].skills[0]
      },
      requested: {
        byUserA: mockUsers[0].wants[0],
        byUserB: mockUsers[1].wants[0]
      }
    },
    timeline: [
      {
        id: 't1',
        action: SwapAction.PROPOSED,
        timestamp: new Date('2026-05-13'),
        performedBy: '1'
      }
    ],
    messages: [],
    createdAt: new Date('2026-05-13'),
    updatedAt: new Date('2026-05-13'),
    expirationDate: new Date('2026-05-20')
  }
];