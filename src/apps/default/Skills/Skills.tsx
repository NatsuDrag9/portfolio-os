import './Skills.scss';
import { ComponentType } from 'react';

export interface SkillItem {
  id: number;
  name: string;
}

export interface Skill {
  id: number;
  title: string;
  skillItems: SkillItem[];
  image: string | ComponentType<{ className: string }>;
}

export interface SkillsProps {
  items: Skill[];
}

function Skills({ items }: SkillsProps) {
  return (
    <div className="skills">
      {items.map((item, index: number) => {
        const isFluentIcon = typeof item.image !== 'string';
        const FluentIconComponent = isFluentIcon ? item.image : null;
        return (
          <>
            <div className="skills__section" key={item.id}>
              {/* Display title and corresponding icon on the top */}
              <div className="skills__top">
                <h6 className="skills__title">{item.title}</h6>
                {FluentIconComponent ? (
                  <FluentIconComponent className="skills__fluent-icon" />
                ) : (
                  <img
                    src={!isFluentIcon ? (item.image as string) : ''}
                    alt={`${item.title}-logo`}
                    className="skills__image"
                  />
                )}
              </div>
              {/* Display the list of skills on the right */}
              <ul className="skills__bottom">
                {item.skillItems.map((skillItem: SkillItem) => {
                  return (
                    <li key={skillItem.id} className="skills__skill-item">
                      {skillItem.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Don't display separator if it's the last element */}
            {index !== items.length - 1 && (
              <div className="skills__separator" />
            )}
          </>
        );
      })}
    </div>
  );
}

export default Skills;
