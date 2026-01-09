import { ComponentType } from 'react';
import './DisplayCard.scss';

export interface DisplayCardProps {
  image: string | ComponentType<{ className: string }>;
  label: string;
  content: string;
  contentType?: 'email' | 'link' | string;
}

function DisplayCard({ image, label, content, contentType }: DisplayCardProps) {
  const isFluentIcon = typeof image !== 'string';
  const FluentIconComponent = isFluentIcon ? image : null;

  const renderContent = () => {
    if (contentType === 'email') {
      return (
        <a
          href={`mailto:${content}`}
          className="display-card__value email"
          title={content}
        >
          {content}
        </a>
      );
    }
    if (contentType === 'link') {
      return (
        <a
          href={content}
          className="display-card__value link"
          title={content}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <p className="display-card__value" title={content}>
        {content}
      </p>
    );
  };

  return (
    <div className="display-card">
      <div
        className={`display-card__left ${isFluentIcon ? 'fluent-icon' : ''}`}
      >
        {FluentIconComponent ? (
          <FluentIconComponent className="display-card__fluent-icon" />
        ) : (
          <img
            src={!isFluentIcon ? image : ''}
            alt="sidebar-avatar"
            className="display-card__image"
          />
        )}
      </div>
      <div className="display-card__right">
        <h6 className="display-card__label" data-tool>
          {label}
        </h6>
        {renderContent()}
      </div>
    </div>
  );
}

export default DisplayCard;
