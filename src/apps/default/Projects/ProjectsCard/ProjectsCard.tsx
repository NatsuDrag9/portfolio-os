import {
  CodeRegular,
  PlayRegular,
  DocumentEditRegular,
} from '@fluentui/react-icons';
import './ProjectsCard.scss';

export interface Badge {
  codeUrl?: string;
  demoUrl?: string;
  articleUrl?: string;
}

export interface ProjectsCardProps {
  title: string;
  description: string;
  coverImage: string;
  badges?: Badge;
}

function ProjectsCard({
  title,
  description,
  coverImage,
  badges,
}: ProjectsCardProps) {
  return (
    <div className="projects-card">
      <div className="projects-card__section image-wrapper">
        <img
          className="projects-card__cover-image"
          src={coverImage}
          alt={title}
        />
      </div>
      <div className="projects-card__section text">
        <h6 className="projects-card__title">{title}</h6>
        <p className="projects-card__description">{description}</p>
      </div>

      <div className="projects-card__section badges">
        {badges?.codeUrl && (
          <a
            href={badges.codeUrl}
            rel="noopener noreferrer"
            target="_blank"
            className="projects-card__link"
            title="Code"
          >
            <CodeRegular className="projects-card__fluent-icon" />
          </a>
        )}
        {badges?.demoUrl && (
          <a
            href={badges.demoUrl}
            rel="noopener noreferrer"
            target="_blank"
            className="projects-card__link"
            title="Demo"
          >
            <PlayRegular className="projects-card__fluent-icon" />
          </a>
        )}
        {badges?.articleUrl && (
          <a
            href={badges.articleUrl}
            rel="noopener noreferrer"
            target="_blank"
            className="projects-card__link"
            title="Article"
          >
            <DocumentEditRegular className="projects-card__fluent-icon" />
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectsCard;
