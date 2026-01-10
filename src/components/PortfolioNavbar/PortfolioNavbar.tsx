import { ComponentType } from 'react';
import './PortfolioNavbar.scss';

export interface ButtonDetailProps {
  name: string;
  onButtonClick: (id: string | number) => void;
  id: string | number;
  isActive: boolean;
  image: ComponentType<{ className?: string }> | string;
}

export interface PortfolioNavbarProps {
  buttons: ButtonDetailProps[];
}

function PortfolioNavbar({ buttons }: PortfolioNavbarProps) {
  return (
    <nav className="portfolio-navbar">
      {buttons.map((item) => {
        const isFluentIcon = typeof item.image !== 'string';
        const FluentIconComponent = isFluentIcon ? item.image : null;
        return (
          <button
            key={item.id}
            type="button"
            className={`portfolio-navbar__button ${item.isActive ? 'portfolio-navbar__button--active' : ''}`}
            onClick={() => item.onButtonClick(item.id)}
            aria-current={item.isActive ? 'page' : undefined}
            title={item.name}
          >
            {FluentIconComponent ? (
              <FluentIconComponent className="portfolio-navbar__fluent-icon" />
            ) : (
              <img
                src={item.image as string}
                alt={item.name}
                className="portfolio-navbar__image"
              />
            )}
            <span className="portfolio-navbar__button-name">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default PortfolioNavbar;
