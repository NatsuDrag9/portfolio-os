import { ReactNode, useEffect, useRef } from 'react';
import AboutMe from '../AboutMe/AboutMe';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import WorkExperience from '../WorkExperience/WorkExperience';
import DownloadableResume from '../DownloadableResume/DownloadableResume';
import {
  ABOUT_ME_DETAILS,
  WORK_EXPERIENCE_DETAILS,
  SKILLS,
  PROJECTS_DATA,
} from '@constants/portfolioConstants';
import './Portfolio.scss';

interface PortfolioSectionProps {
  appId?: string;
}

function PortfolioSection({ appId }: PortfolioSectionProps) {
  const hasDownloadedRef = useRef(false);

  useEffect(() => {
    // Trigger resume download when Resume section is opened (only once)
    if (appId === 'portfolio-resume' && !hasDownloadedRef.current) {
      hasDownloadedRef.current = true;
      const resumePath = '/portfolio-os/Rohit_Resume_Frontend_2.pdf';
      const link = document.createElement('a');
      link.href = resumePath;
      link.download = 'Rohit_Resume_Frontend.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [appId]);

  const renderSection = (): ReactNode => {
    switch (appId) {
      case 'portfolio-about':
        return (
          <AboutMe
            name={ABOUT_ME_DETAILS.name}
            education={ABOUT_ME_DETAILS.education}
            otherActitvities={ABOUT_ME_DETAILS.otherActitvities}
            quote={ABOUT_ME_DETAILS.quote}
          />
        );
      case 'portfolio-projects':
        return <Projects projects={PROJECTS_DATA} />;
      case 'portfolio-skills':
        return <Skills items={SKILLS.items} />;
      case 'portfolio-workexp':
        return <WorkExperience experience={WORK_EXPERIENCE_DETAILS} />;
      case 'portfolio-resume':
        return <DownloadableResume />;
      default:
        return (
          <div className="portfolio-section">
            <p className="portfolio-section__error">
              Invalid portfolio section
            </p>
          </div>
        );
    }
  };

  return <div className="portfolio-section dark-theme">{renderSection()}</div>;
}

export default PortfolioSection;
