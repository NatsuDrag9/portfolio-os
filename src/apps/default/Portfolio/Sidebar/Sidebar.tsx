import { SocialIcon } from 'react-social-icons';
import { DeviMa } from '@assets/images/specifics';
import './Sidebar.scss';
import {
  DESIGNATION,
  NAME,
  SIDEBAR_CARD_DATA,
  SIDEBAR_SOCIAL_LINKS,
} from './constants';
import { DisplayCard } from '@components/index';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 820px)');

  return (
    <aside className={`sidebar ${isMobile && isOpen ? 'open' : ''}`}>
      <div className="sidebar__top">
        {isMobile && (
          <button
            type="button"
            className="sidebar__toggle-display-button"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <ChevronDownRegular
              className={`sidebar__fluent-icon ${isOpen ? 'open' : ''}`}
            />
          </button>
        )}
        <div className="sidebar__image-wrapper">
          <img src={DeviMa} alt="user-avatar" className="sidebar__image" />
        </div>
        <div className="sidebar__content">
          <p className="sidebar__name">{NAME}</p>
          <p className="sidebar__designation">{DESIGNATION}</p>
        </div>
      </div>

      <div className="sidebar__divider" />

      <div className="sidebar__bottom">
        <div className="sidebar__display-cards">
          {SIDEBAR_CARD_DATA.map((item, index) => (
            <DisplayCard
              key={`${index + 1}`}
              content={item.content}
              image={item.image}
              label={item.label}
              contentType={item.contentType}
            />
          ))}
        </div>
        <div className="sidebar__socials">
          {Object.entries(SIDEBAR_SOCIAL_LINKS).map(([socialPlatform]) => (
            <SocialIcon
              key={socialPlatform}
              url={SIDEBAR_SOCIAL_LINKS[socialPlatform].url}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar__social-icon"
              style={{
                width: '2.75rem',
                height: '2.75rem',
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
