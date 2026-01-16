import { AboutMeProps } from '@apps/default/AboutMe/AboutMe';
import { DetailCardProps } from '@apps/default/WorkExperience/DetailsCard/DetailsCard';

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
        name: 'Worked as the primary frontend developer for multiple web projects, handling design, architecture, and implementation.',
      },
      {
        id: 2,
        name: 'CRM Applications (Vite + React)',
        description: [
          'Built and maintained two workflow CRM web applications — one as part of a small three-member team, and another independently from the ground up based on a reusable scaffolding template I created for new React+Vite projects',
          'Created a reusable form builder using React Hook Form, shared across modules and projects.',
          'Set up Storybook documentation and wrote unit tests with React Testing Library for resuable components.',
          'Used RTK Query for API integration and data caching.',
        ],
      },
      {
        id: 3,
        name: 'Company Landing Page (Next.js)',
        description: [
          'Developed the new company landing page with Next.js, focusing on SEO, responsiveness, and performance (green Lighthouse scores in all categories).',
          'Implemented a backend-for-frontend (BFF) layer for authentication and API integration creating a custom class using Axios.',
          'Added Razorpay integration for payments',
          'Added animations using Framer Motion.',
          'Ensured proper API proxy configuration to avoid CORS issues, documented in internal wiki.',
        ],
      },
      {
        id: 4,
        name: 'Code Quality and Collaboration',
        description: [
          'Improved maintainability through reusable components, testing, and documentation.',
          'Collaborated with backend and design teams on API integration and UI improvements.',
        ],
      },
    ],
  },
  {
    id: 2,
    roleTitle: 'Student Worker',
    companyName: 'MoveInnovation',
    employmentType: 'Part-time',
    startDateAndYear: 'Aug 2021',
    endDateAndYear: 'Dec 2022',
    location: 'Copenhagen, Denmark',
    details: [
      {
        id: 1,
        name: 'Tested and debugged PCBs designed in-house',
      },
      {
        id: 2,
        name: 'Assembled and soldered multiple electronic devices (including SMDs)',
      },
      {
        id: 3,
        name: 'Assist engineers and technicians in:',
        description: [
          'Quality check and testing of in-house manufactured electronic devices',
          'Assembling of electronic devices',
        ],
      },
    ],
  },
];
