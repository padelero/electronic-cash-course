
import { Course, Module, Lesson, Quiz, UserProgress } from "@/types";

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Bitcoin Fundamentals",
    description: "Learn the basics of Bitcoin, its history, and how it works as a decentralized digital currency.",
    imageUrl: "https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    instructor: "Alex Rivera",
    price: 99,
    currency: "USD",
    estimatedHours: 10,
    level: "beginner",
    tags: ["Bitcoin", "Blockchain", "Cryptocurrency"],
    modules: [
      {
        id: "1-1",
        title: "Introduction to Bitcoin",
        description: "Understanding the origins and purpose of Bitcoin",
        order: 1,
        lessons: []
      },
      {
        id: "1-2",
        title: "Bitcoin Technology",
        description: "How the blockchain technology powers Bitcoin",
        order: 2,
        lessons: []
      },
      {
        id: "1-3",
        title: "Bitcoin Wallets",
        description: "Setting up and securing your Bitcoin wallet",
        order: 3,
        lessons: []
      }
    ],
    rewardThresholds: [
      {
        percentage: 80,
        rewardAmount: 0.005
      },
      {
        percentage: 100,
        rewardAmount: 0.01
      }
    ]
  },
  {
    id: "2",
    title: "Bitcoin Cash for Businesses",
    description: "Implement Bitcoin Cash payments for your business, reduce fees and increase global reach.",
    imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2797&q=80",
    instructor: "Maria Chen",
    price: 0.05,
    currency: "BCH",
    estimatedHours: 8,
    level: "intermediate",
    tags: ["Bitcoin Cash", "Business", "Payments"],
    modules: [
      {
        id: "2-1",
        title: "BCH Payment Processing",
        description: "Setting up Bitcoin Cash payments for your business",
        order: 1,
        lessons: []
      },
      {
        id: "2-2",
        title: "Integration Strategies",
        description: "Different ways to integrate BCH into your business",
        order: 2,
        lessons: []
      }
    ],
    rewardThresholds: [
      {
        percentage: 90,
        rewardAmount: 0.01
      }
    ]
  },
  {
    id: "3",
    title: "Advanced Bitcoin Programming",
    description: "Deep dive into Bitcoin scripting, transactions, and building on the Bitcoin network.",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
    instructor: "David Johnson",
    price: 199,
    currency: "USD",
    estimatedHours: 20,
    level: "advanced",
    tags: ["Bitcoin", "Programming", "Development"],
    modules: [
      {
        id: "3-1",
        title: "Bitcoin Protocol",
        description: "Understanding the Bitcoin protocol in depth",
        order: 1,
        lessons: []
      },
      {
        id: "3-2",
        title: "Bitcoin Scripting",
        description: "Writing and understanding Bitcoin scripts",
        order: 2,
        lessons: []
      },
      {
        id: "3-3",
        title: "Lightning Network",
        description: "Building applications on the Lightning Network",
        order: 3,
        lessons: []
      }
    ],
    rewardThresholds: [
      {
        percentage: 70,
        rewardAmount: 0.01
      },
      {
        percentage: 90,
        rewardAmount: 0.03
      }
    ]
  },
  {
    id: "4",
    title: "Bitcoin Cash Development",
    description: "Learn how to build applications using Bitcoin Cash and leverage its unique features.",
    imageUrl: "https://images.unsplash.com/photo-1642082238299-41bf94367ce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    instructor: "James Wong",
    price: 0.08,
    currency: "BCH",
    estimatedHours: 15,
    level: "advanced",
    tags: ["Bitcoin Cash", "Development", "Programming"],
    modules: [
      {
        id: "4-1",
        title: "BCH Protocol",
        description: "Understanding the Bitcoin Cash protocol",
        order: 1,
        lessons: []
      },
      {
        id: "4-2",
        title: "Smart Contracts on BCH",
        description: "Building smart contracts with Bitcoin Cash",
        order: 2,
        lessons: []
      }
    ],
    rewardThresholds: [
      {
        percentage: 80,
        rewardAmount: 0.02
      }
    ]
  },
  {
    id: "5",
    title: "Crypto Trading Fundamentals",
    description: "Learn the basics of cryptocurrency trading, market analysis, and risk management.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    instructor: "Sophia Rodriguez",
    price: 149,
    currency: "USD",
    estimatedHours: 12,
    level: "beginner",
    tags: ["Trading", "Cryptocurrency", "Investment"],
    modules: [
      {
        id: "5-1",
        title: "Market Basics",
        description: "Understanding cryptocurrency markets",
        order: 1,
        lessons: []
      },
      {
        id: "5-2",
        title: "Technical Analysis",
        description: "Introduction to technical analysis",
        order: 2,
        lessons: []
      },
      {
        id: "5-3",
        title: "Risk Management",
        description: "Managing risk in cryptocurrency trading",
        order: 3,
        lessons: []
      }
    ],
    rewardThresholds: [
      {
        percentage: 100,
        rewardAmount: 0.01
      }
    ]
  },
  {
    id: "6",
    title: "Blockchain for Enterprise",
    description: "Explore how enterprises can leverage blockchain technology for various business applications.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    instructor: "Robert Chang",
    price: 249,
    currency: "USD",
    estimatedHours: 18,
    level: "intermediate",
    tags: ["Blockchain", "Enterprise", "Business"],
    modules: [
      {
        id: "6-1",
        title: "Enterprise Use Cases",
        description: "Blockchain applications for businesses",
        order: 1,
        lessons: []
      },
      {
        id: "6-2",
        title: "Implementation Strategies",
        description: "How to implement blockchain in business operations",
        order: 2,
        lessons: []
      }
    ],
    rewardThresholds: [
      {
        percentage: 85,
        rewardAmount: 0.015
      }
    ]
  }
];

// Mock User Progress
export const mockUserProgress: UserProgress[] = [
  {
    userId: "1",
    courseId: "1",
    completedLessons: ["1-1-1", "1-1-2"],
    quizScores: [
      {
        quizId: "q1",
        score: 85,
        attempts: 1,
        lastAttemptDate: new Date()
      }
    ],
    certificateIssued: false,
    rewardsEarned: 0,
    percentComplete: 25
  },
  {
    userId: "1",
    courseId: "2",
    completedLessons: ["2-1-1", "2-1-2", "2-1-3", "2-2-1"],
    quizScores: [
      {
        quizId: "q2",
        score: 90,
        attempts: 1,
        lastAttemptDate: new Date()
      }
    ],
    certificateIssued: false,
    rewardsEarned: 0.005,
    percentComplete: 60
  }
];

// Populate lesson data for the first course
mockCourses[0].modules.forEach((module, moduleIndex) => {
  const lessons: Lesson[] = [];
  
  for (let i = 1; i <= 3; i++) {
    lessons.push({
      id: `1-${moduleIndex+1}-${i}`,
      title: `Lesson ${i} of ${module.title}`,
      description: `Detailed explanation for lesson ${i} of module ${moduleIndex+1}`,
      content: "Content placeholder",
      type: i % 3 === 0 ? "quiz" : i % 2 === 0 ? "video" : "text",
      order: i,
      duration: 15,
      completed: false,
      resources: [
        {
          id: `r-1-${moduleIndex+1}-${i}`,
          title: `Resource for Lesson ${i}`,
          type: "pdf",
          url: "#"
        }
      ]
    });
  }
  
  module.lessons = lessons;
});
