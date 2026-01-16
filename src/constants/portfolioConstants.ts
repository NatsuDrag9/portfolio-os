import { AboutMeProps } from '@apps/default/AboutMe/AboutMe';

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
