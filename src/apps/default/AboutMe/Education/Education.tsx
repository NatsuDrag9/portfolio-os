import { HatGraduationRegular } from '@fluentui/react-icons';
import './Education.scss';

export interface EducationProps {
  schoolName: string;
  degree: string;
  startDateAndYear: string;
  endDateAndYear: string;
  description?: string;
}

function Education({
  schoolName,
  degree,
  startDateAndYear,
  endDateAndYear,
  description,
}: EducationProps) {
  return (
    <div className="education">
      <div className="education__left">
        <HatGraduationRegular className="education__fluent-icon" />
      </div>

      <div className="education__right">
        <div className="education__right-top">
          <h6 className="education__school-name">{schoolName}</h6>
          <div className="education__duration">
            {startDateAndYear} - {endDateAndYear}
          </div>
        </div>
        <div className="education__degree">{degree}</div>
        {description && (
          <div className="education__description">{description}</div>
        )}
      </div>
    </div>
  );
}

export default Education;
