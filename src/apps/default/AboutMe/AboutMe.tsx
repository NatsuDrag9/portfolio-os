import './AboutMe.scss';
import Education, { EducationProps } from './Education/Education';

export interface AboutMeProps {
  name: string;
  education: EducationProps[];
  otherActitvities?: string[];
  quote?: {
    author: string;
    content: string;
  };
}

function AboutMe({ name, education, otherActitvities, quote }: AboutMeProps) {
  return (
    <div className="about-me">
      <h5 className="about-me__heading">Hello Everyone, I am {name}</h5>

      <div className="about-me__section">
        {education.map((item, index) => (
          <Education
            key={`${index + 1}`}
            degree={item.degree}
            description={item.description}
            endDateAndYear={item.endDateAndYear}
            schoolName={item.schoolName}
            startDateAndYear={item.startDateAndYear}
          />
        ))}
      </div>

      {otherActitvities && (
        <div className="about-me__section">
          <h6 className="about-me__sub-heading">
            Apart from coding, other activities that I enjoy:
            <ul className="about-me__activity-list">
              {otherActitvities.map((item, index) => (
                <li key={`${index + 1}`} className="about-me__activity-item">
                  {item}
                </li>
              ))}
            </ul>
          </h6>
        </div>
      )}

      {quote && (
        <div className="about-me__section">
          <blockquote className="about-me__quote">{quote.content}</blockquote>
          <p className="about-me__author">{quote.author}</p>
        </div>
      )}
    </div>
  );
}

export default AboutMe;
