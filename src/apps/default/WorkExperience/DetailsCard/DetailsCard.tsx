import './DetailsCard.scss';

export interface Detail {
  // In bullet points with bullet having its own sub-list / bullets
  id: number;
  name: string;
  description?: string[]; // Sub-bullet / sub-list
}

export interface DetailCardProps {
  id: number;
  roleTitle: string;
  companyName: string;
  employmentType: string;
  location: string;
  startDateAndYear: string;
  endDateAndYear: string;
  details: Detail[];
}

function DetailsCard({
  roleTitle,
  companyName,
  employmentType,
  location,
  startDateAndYear,
  endDateAndYear,
  details,
}: DetailCardProps) {
  return (
    <div className="details-card">
      <div className="details-card__top">
        {/* NOTE: The order is important as .details-card__top will be styled as a grid */}
        <h6 className="details-card__title">{roleTitle}</h6>
        <p className="details-card__duration">
          {startDateAndYear} - {endDateAndYear}
        </p>
        <p className="details-card__company-name">
          {companyName} - {employmentType}
        </p>
        <p className="details-card__location">{location}</p>
      </div>
      <ul className="details-card__detail-list">
        {details.map((item: Detail) => {
          return (
            <li key={item.id} className="details-card__detail-list-item">
              {item.name}
              {item.description && (
                <ul className="details-card__sub-list">
                  {item.description.map((subItem, index) => (
                    <li key={index} className="details-card__sub-list-item">
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DetailsCard;
