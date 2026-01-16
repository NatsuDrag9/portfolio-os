import DetailsCard, { DetailCardProps } from './DetailsCard/DetailsCard';
import './WorkExperience.scss';

export interface WorkExperienceProps {
  experience: DetailCardProps[];
}

function WorkExperience({ experience }: WorkExperienceProps) {
  return (
    <div className="work-exp">
      {experience.map((item: DetailCardProps, index: number) => {
        return (
          <div className="work-exp__section" key={item.id}>
            <DetailsCard
              companyName={item.companyName}
              details={item.details}
              employmentType={item.employmentType}
              endDateAndYear={item.endDateAndYear}
              startDateAndYear={item.startDateAndYear}
              location={item.location}
              roleTitle={item.roleTitle}
              id={item.id}
            />
            {/* Don't display separator if it's the last element */}
            {index !== experience.length - 1 && (
              <div className="work-exp__separator" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WorkExperience;
