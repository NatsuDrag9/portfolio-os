import { DisplayCardProps } from '@components/DisplayCard/DisplayCard';
import { SocialLinkData } from '@definitions/portfolioTypes';
import { LocationRegular, MailRegular } from '@fluentui/react-icons';

export const SIDEBAR_CARD_DATA: DisplayCardProps[] = [
  {
    image: MailRegular,
    label: 'Email',
    content: 'rohitimandi9@zoho.com',
    contentType: 'email',
  },
  {
    image: LocationRegular,
    label: 'Location',
    content: 'Hyderabad, Bharat',
    contentType: 'string',
  },
];

export const SIDEBAR_SOCIAL_LINKS: Record<string, SocialLinkData> = {
  linkedin: {
    url: 'https://www.linkedin.com/in/rohit-imandi/',
  },
  medium: {
    url: 'https://rohitimandi.medium.com/',
  },
  github: {
    url: 'https://github.com/NatsuDrag9',
  },
};

export const DESIGNATION = 'Frontend Developer';
export const NAME = 'ROHIT IMANDI';
