import './Portfolio.scss';
import Sidebar from './Sidebar/Sidebar';

// NOTE: Portfolio is by default set to dark theme

function Portfolio() {
  return (
    <div className="portfolio dark-theme">
      <Sidebar />
      <div className="portfolio__main">This is main</div>
    </div>
  );
}

export default Portfolio;
