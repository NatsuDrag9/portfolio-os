import { AboutMeProps } from '@apps/default/AboutMe/AboutMe';
import { SkillsProps, Skill } from '@apps/default/Skills/Skills';
import { DetailCardProps } from '@apps/default/WorkExperience/DetailsCard/DetailsCard';
import { ProjectsCardProps } from '@apps/default/Projects/ProjectsCard/ProjectsCard';
import {
  CodeBlockEditRegular,
  SettingsCogMultipleRegular,
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
    endDateAndYear: 'Present',
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
    ],
  },
];

const SKILLS_DATA: Skill[] = [
  {
    id: 1,
    title: 'Frontend Engineering',
    image: CodeBlockEditRegular,
    skillItems: [
      {
        id: 1,
        name: 'React, Next.js, TypeScript, JavaScript (ES6+)',
      },
      {
        id: 2,
        name: 'State Management: Redux Toolkit, RTK Query, Zustand',
      },
      {
        id: 3,
        name: 'Testing & Docs: Vitest, Jest, React Testing Library, Storybook',
      },
      {
        id: 4,
        name: 'Styling & UI: HTML5, CSS3, SASS/SCSS, Framer Motion, Flexbox/Grid',
      },
      {
        id: 5,
        name: 'Accessibility (WCAG) & Responsive Web Design',
      },
    ],
  },
  {
    id: 2,
    title: 'Backend Engineering & Databases',
    image: SettingsCogMultipleRegular,
    skillItems: [
      {
        id: 1,
        name: 'Java & Spring Boot (REST APIs, Spring Data JPA, Dependency Injection)',
      },
      {
        id: 2,
        name: 'Node.js & Express.js (RESTful APIs, Middleware, JWT Authentication)',
      },
      {
        id: 3,
        name: 'Real-Time Web: Socket.io / WebSockets',
      },
      {
        id: 4,
        name: 'Databases: MongoDB, PostgreSQL, MySQL',
      },
      {
        id: 5,
        name: 'API Design & Client Architecture (Axios, Interceptors, Proxies)',
      },
    ],
  },
  {
    id: 3,
    title: 'Tools & Workflows',
    image: SettingsCogMultipleRegular,
    skillItems: [
      { id: 1, name: 'Version Control: Git, GitHub, GitLab' },
      { id: 2, name: 'Build & Dev Tools: Vite, Postman, VSCode, React Dev Tools' },
      { id: 3, name: 'Quality & Automation: Git Hooks (Husky), Lighthouse, Shell Scripting' },
      { id: 4, name: 'AI Coding Tools: Antigravity CLI, Claude Code CLI, ChatGPT' },
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
