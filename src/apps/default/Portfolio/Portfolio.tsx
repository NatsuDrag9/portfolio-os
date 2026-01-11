import { ReactNode, useState } from 'react';
import './Portfolio.scss';
import Sidebar from './Sidebar/Sidebar';
import { PortfolioNavbar } from '@components/index';
import AboutMe from '../AboutMe/AboutMe';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import LetsConnect from '../LetsConnect/LetsConnect';
import { PORTFOLIO_NAV_BUTTONS, PortfolioSectionId } from './constants';
import { ButtonDetailProps } from '@components/PortfolioNavbar/PortfolioNavbar';
import WorkExperience from '../WorkExperience/WorkExperience';

// NOTE: Portfolio is by default set to dark theme

function Portfolio() {
  const [activeSection, setActiveSection] =
    useState<PortfolioSectionId>('portfolio-about');

  const handleSectionChange = (id: string | number) => {
    setActiveSection(id as PortfolioSectionId);
  };

  const renderSection = (): ReactNode => {
    switch (activeSection) {
      case 'portfolio-about':
        return <AboutMe />;
      case 'portfolio-projects':
        return <Projects />;
      case 'portfolio-skills':
        return <Skills />;
      case 'portfolio-workexp':
        return <WorkExperience />;
      case 'portfolio-contact':
        return <LetsConnect />;
      default:
        return <AboutMe />;
    }
  };

  const navButtons: ButtonDetailProps[] = PORTFOLIO_NAV_BUTTONS.map((btn) => ({
    ...btn,
    isActive: btn.id === activeSection,
    onButtonClick: handleSectionChange,
  }));

  return (
    <div className="portfolio dark-theme">
      <Sidebar />
      <div className="portfolio__main">
        <PortfolioNavbar buttons={navButtons} />
        <div className="portfolio__section-wrapper">{renderSection()}</div>
      </div>
    </div>
  );
}

export default Portfolio;
