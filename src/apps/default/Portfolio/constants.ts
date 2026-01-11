import { ButtonDetailProps } from '@components/PortfolioNavbar/PortfolioNavbar';
import {
  BriefcaseRegular,
  CodeRegular,
  DocumentRegular,
  MailRegular,
  PersonRegular,
} from '@fluentui/react-icons';

export type PortfolioSectionId =
  | 'portfolio-about'
  | 'portfolio-projects'
  | 'portfolio-skills'
  | 'portfolio-contact'
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
    id: 'portfolio-contact',
    name: "Let's Connect",
    image: MailRegular,
  },
];
