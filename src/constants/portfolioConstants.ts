import { AboutMeProps } from '@apps/default/AboutMe/AboutMe';
import { SkillsProps, Skill } from '@apps/default/Skills/Skills';
import { DetailCardProps } from '@apps/default/WorkExperience/DetailsCard/DetailsCard';
import { ProjectsCardProps } from '@apps/default/Projects/ProjectsCard/ProjectsCard';
import {
  CodeBlockEditRegular,
  SettingsCogMultipleRegular,
  BotSparkleRegular,
  DatabaseRegular,
} from '@fluentui/react-icons';
import {
  PortfolioOs,
  ReactStateParadigmDemo,
  Tetris,
  WealthTechCrm,
} from '@assets/images/specifics';

export const ABOUT_ME_DETAILS: AboutMeProps = {
  name: 'Rohit Imandi',
  education: [
    {
      schoolName: 'Technical University of Denmark (DTU)',
      startDateAndYear: 'Feb 2021',
      endDateAndYear: 'Jan 2023',
      degree:
        'Master of Science in Sustainable Energy with Specialization in Electric Energy Systems.',
      description:
        'Focused on variable renewable energy sources integration into power grid and power systems optimization.',
    },
    {
      schoolName: 'Bennett University',
      startDateAndYear: 'Aug 2016',
      endDateAndYear: 'June 2020',
      degree:
        'Bachelor of Technology in Electronics and Communication Engineering',
      description:
        'CGPA 9.8/10. Strong foundation in circuit design and embedded systems.',
    },
  ],
  otherActitvities: [
    'Playing Retro Games',
    'Watching anime',
    'Watching videos on electronics and DIY projects',
    'Bharatiya Jnana Pranali',
  ],
  quote: {
    author: '- Rohit',
    content: 'Commitment to excellence is about eliminating mediocrity today!',
  },
};

export const WORK_EXPERIENCE_DETAILS: DetailCardProps[] = [
  {
    id: 1,
    roleTitle: 'Software Development Engineer',
    companyName: 'Savart',
    employmentType: 'Full-time',
    startDateAndYear: 'Aug 2024',
    endDateAndYear: 'Aug-2026',
    location: 'Hyderabad, India',
    details: [
      {
        id: 1,
        name: 'Primary developer for key web projects, leading UI architecture, component design, and API integration.',
      },
      {
        id: 2,
        name: 'CRM Applications (Vite + React + TypeScript)',
        description: [
          'Built and maintained two workflow CRM web applications — one as part of a small three-member team, and another independently from the ground up based on a reusable scaffolding template created for new React+Vite projects.',
          'Created a reusable JSON-driven form builder using React Hook Form, shared across modules to speed up feature development.',
          'Set up Storybook documentation and wrote unit tests with Vitest & React Testing Library for reusable components.',
          'Utilized RTK Query for client-side API integration, state normalization, and response data caching.',
        ],
      },
      {
        id: 3,
        name: 'Company Landing Page (Next.js)',
        description: [
          'Developed the official company landing page with Next.js, focusing on SEO, responsive design, and performance (achieving green Lighthouse scores across all categories).',
          'Designed a custom API client factory module that dynamically generated authenticated Axios client instances for payment and auth API workflows.',
          'Integrated Razorpay payment gateway workflows requiring user authentication and mobile verification.',
          'Configured Next.js server API proxies to eliminate CORS issues and protect sensitive endpoints, documenting configurations in internal wiki.',
          'Implemented smooth page animations using Framer Motion.',
        ],
      },
      {
        id: 4,
        name: 'Cross-functional Collaboration & Code Quality',
        description: [
          'Co-designed RESTful API endpoints and payload schemas with backend engineering teams for seamless frontend-backend integration.',
          'Improved maintainability through reusable component design, testing suites, and developer documentation.',
        ],
      },
      {
        id: 5,
        name: 'AI-Assisted Frontend Development',
        description: [
          'Leveraged AI-assisted development tools such as Claude Code for code generation, codebase exploration, debugging, refactoring, testing, and evaluating implementation approaches.',
        ],
      },
    ],
  },
];

const SKILLS_DATA: Skill[] = [
  {
    id: 1,
    title: 'Frontend Engineering & State Management',
    image: CodeBlockEditRegular,
    skillItems: [
      {
        id: 1,
        name: 'React, Next.js, Vite',
      },
      {
        id: 2,
        name: 'TypeScript, JavaScript (ES6+), HTML5, CSS3/SASS',
      },
      {
        id: 3,
        name: 'Redux Toolkit, RTK Query, Zustand',
      },
      {
        id: 4,
        name: 'React Hook Form, Yup Validation',
      },
      {
        id: 5,
        name: 'Reusable Component Libraries, Design Tokens',
      },
      {
        id: 6,
        name: 'Storybook, Responsive Web Design, WCAG, Code Splitting',
      },
    ],
  },
  {
    id: 2,
    title: 'Backend, Databases & DevOps',
    image: DatabaseRegular,
    skillItems: [
      {
        id: 1,
        name: 'Java, Spring Boot, Spring MVC, Node.js, Express.js',
      },
      {
        id: 2,
        name: 'Spring Data JPA, Hibernate, PostgreSQL, MongoDB, Redis, SQL',
      },
      {
        id: 3,
        name: 'RESTful APIs, Swagger/OpenAPI, BFF, OAuth2, JWT, RBAC',
      },
      {
        id: 4,
        name: 'Docker, Docker Compose, AWS (EC2, S3)',
      },
      {
        id: 5,
        name: 'GitHub Actions CI/CD, Pino Logging, Prometheus, Grafana',
      },
      {
        id: 6,
        name: 'Controller-Service-Repository Pattern, OOP, SOLID Principles',
      },
    ],
  },
  {
    id: 3,
    title: 'AI-Assisted Development',
    image: BotSparkleRegular,
    skillItems: [
      {
        id: 1,
        name: 'Claude Code CLI, Antigravity CLI, ChatGPT',
      },
      {
        id: 2,
        name: 'LLM APIs, Structured Outputs, Function Calling',
      },
      {
        id: 3,
        name: 'RAG (Retrieval-Augmented Generation), Embeddings, Vector Search',
      },
      {
        id: 4,
        name: 'Agentic AI, LangChain, LangGraph',
      },
      {
        id: 5,
        name: 'Golden Dataset Benchmarking, Recall@K, Faithfulness Checks',
      },
    ],
  },
  {
    id: 4,
    title: 'Testing & Developer Tools',
    image: SettingsCogMultipleRegular,
    skillItems: [
      {
        id: 1,
        name: 'React Testing Library, Vitest, Jest, Storybook',
      },
      {
        id: 2,
        name: 'JUnit, Vitest (State Graph & Tool-Calling Tests)',
      },
      {
        id: 3,
        name: 'Git, GitHub, Maven, Postman, Vite DevTools',
      },
      {
        id: 4,
        name: 'Git Hooks (Husky), ESLint, Prettier, Stylelint',
      },
    ],
  },
];

export const SKILLS: SkillsProps = {
  items: SKILLS_DATA,
};

export const PROJECTS_DATA: ProjectsCardProps[] = [
  /*
  {
    title: 'Compare React State Management Paradigms',
    description:
      'Compares the three primary approaches—Selector (Centralized), Atomic (Jotai/Recoil), and Pure Signal (Preact Signals)—to reveal crucial differences in performance, rendering granularity, and architecture.',
    coverImage: ReactStateParadigmDemo,
    badges: {
      codeUrl: 'https://github.com/NatsuDrag9/react-state-paradigm-demo',
      demoUrl: 'https://natsudrag9.github.io/react-state-paradigm-demo/',
      articleUrl:
        'https://rohitimandi.medium.com/zustand-jotai-and-signals-a-head-to-head-comparison-of-granularity-and-efficiency-077599a4f68e',
    },
  },
  {
    title: 'Tetris Multiplayer Game',
    description:
      'A fullstack web application that allows users to play the classic game of Tetris either solo or against friends in real-time multiplayer mode',
    coverImage: Tetris,
    badges: {
      codeUrl: 'https://github.com/NatsuDrag9/tetris-multiplayer',
      // To Do: Add demoUrl
      articleUrl:
        'https://github.com/NatsuDrag9/tetris-multiplayer/wiki/Recruiters',
    },
  },
  */
  {
    title: 'Wealth-Tech Enterprise CRM & Backend',
    description:
      'Fullstack enterprise CRM built with React, TypeScript, Redux Toolkit & RTK Query on the frontend, and Java Spring Boot (Spring Security, JWT, Spring Data JPA, Hibernate, MySQL/PostgreSQL) on the backend. Features RBAC user management, dynamic form engine, cursor pagination, and portfolio recommendation workflows.',
    coverImage: WealthTechCrm,
    badges: {
      codeUrl: 'https://github.com/NatsuDrag9/wealth-tech-crm/',
      // articleUrl: 'https://github.com/NatsuDrag9/wealth-tech-crm/tree/main/docs',
    },
  },
  {
    title: 'OS Based Portfolio',
    description:
      'A Windows 11-inspired interactive desktop operating system simulation featuring a functional taskbar, start menu, draggable windows, and real-time settings management.',
    coverImage: PortfolioOs,
    badges: {
      codeUrl: 'https://github.com/NatsuDrag9/portfolio-os',
      demoUrl: 'https://rohitimandi-dev.xyz/',
      articleUrl: 'https://github.com/NatsuDrag9/portfolio-os/wiki',
    },
  },
];
