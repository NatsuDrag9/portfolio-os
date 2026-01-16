import { ButtonDetailProps } from '@components/PortfolioNavbar/PortfolioNavbar';
import {
  BriefcaseRegular,
  CodeRegular,
  DocumentRegular,
  ArrowDownRegular,
  PersonRegular,
} from '@fluentui/react-icons';

export type PortfolioSectionId =
  | 'portfolio-about'
  | 'portfolio-projects'
  | 'portfolio-skills'
  | 'portfolio-resume'
  | 'portfolio-workexp';

export const PORTFOLIO_NAV_BUTTONS: Omit<
  ButtonDetailProps,
  'isActive' | 'onButtonClick'
>[] = [
  {
    id: 'portfolio-about',
    name: 'About',
    image: PersonRegular,
  },
  {
    id: 'portfolio-workexp',
    name: 'Work Experience',
    image: BriefcaseRegular,
  },
  {
    id: 'portfolio-projects',
    name: 'Projects',
    image: DocumentRegular,
  },
  {
    id: 'portfolio-skills',
    name: 'Skills',
    image: CodeRegular,
  },
  {
    id: 'portfolio-resume',
    name: 'Resume',
    image: ArrowDownRegular,
  },
];
