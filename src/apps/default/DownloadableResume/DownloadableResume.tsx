import './DownloadableResume.scss';

function DownloadableResume() {
  // Automatic download is now triggered in Portfolio.tsx handleSectionChange
  // when the Resume button is clicked. Code below kept for reference.

  /* const handleButtonClick = () => {
    const resumePath = '/docs/Rohit_Resume_Frontend_2.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Rohit_Resume_Frontend.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; */

  return (
    <div className="download-resume">
      <h6 className="download-resume__title">
        Your resume is being downloaded...
      </h6>
      {/* <button
        className="download-resume__download-button"
        onClick={handleButtonClick}
      >
        <span className="download-resume__text-two">Resume</span>
        <DocumentArrowDownRegular className="download-resume__fluent-icon" />
      </button> */}
    </div>
  );
}

export default DownloadableResume;
