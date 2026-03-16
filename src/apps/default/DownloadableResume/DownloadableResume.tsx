import { useEffect } from 'react';
import './DownloadableResume.scss';
import { DOWNLOADABLE_RESUME_LINK } from '@constants/appConstants';

function DownloadableResume() {
  useEffect(() => {
    // A short delay for the message to be displayed briefly
    setTimeout(() => {
      window.open(DOWNLOADABLE_RESUME_LINK, '_blank');
    }, 1000);
  }, []);

  return (
    <div className="download-resume">
      <h6 className="download-resume__title">
        Redirecting to google drive link...
      </h6>
    </div>
  );
}

export default DownloadableResume;
