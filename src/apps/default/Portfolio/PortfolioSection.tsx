import { useState } from 'react';
import {
  PORTFOLIO_ABOUT_LINK,
  PORTFOLIO_PROJECTS_LINK,
  PORTFOLIO_SKILLS_LINK,
  PORTFOLIO_CONTACT_LINK,
} from '@constants/appConstants';
import Loader from '@components/Loader/Loader';
import './Portfolio.scss';

interface PortfolioSectionProps {
  appId?: string;
}

function PortfolioSection({ appId }: PortfolioSectionProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Map app IDs to portfolio URLs
  const sectionMap: Record<string, string> = {
    'portfolio-about': PORTFOLIO_ABOUT_LINK,
    'portfolio-projects': PORTFOLIO_PROJECTS_LINK,
    'portfolio-skills': PORTFOLIO_SKILLS_LINK,
    'portfolio-contact': PORTFOLIO_CONTACT_LINK,
  };

  const url = sectionMap[appId || ''];

  if (!url) {
    return (
      <div className="portfolio-section">
        <p className="portfolio-section__error">Invalid portfolio section</p>
      </div>
    );
  }

  return (
    <div className="portfolio-section">
      {isLoading && (
        <div className="portfolio-section__loader">
          <Loader />
        </div>
      )}
      <iframe
        src={url}
        className="portfolio-section__iframe"
        title={`Portfolio - ${appId?.replace('portfolio-', '')}`}
        onLoad={() => setIsLoading(false)}
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          display: isLoading ? 'none' : 'block',
        }}
      />
    </div>
  );
}

export default PortfolioSection;
