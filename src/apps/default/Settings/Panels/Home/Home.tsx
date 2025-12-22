import { useAuth, useSystemUIState, useWorkspaceState } from '@store/store';
import './Home.scss';
import {
  BrightnessHighRegular,
  Speaker0Regular,
  Wifi1Regular,
} from '@fluentui/react-icons';

function Home() {
  const { activeBackground } = useWorkspaceState();
  const { brightnessLevel, volumeLevel } = useSystemUIState();
  const { username } = useAuth();

  // Get browser details
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown Browser';
    let browserVersion = '';

    if (userAgent.indexOf('Firefox') > -1) {
      browserName = 'Firefox';
      browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)?.[1] || '';
    } else if (userAgent.indexOf('Edg') > -1) {
      browserName = 'Microsoft Edge';
      browserVersion = userAgent.match(/Edg\/(\d+\.\d+)/)?.[1] || '';
    } else if (userAgent.indexOf('Chrome') > -1) {
      browserName = 'Chrome';
      browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)?.[1] || '';
    } else if (userAgent.indexOf('Safari') > -1) {
      browserName = 'Safari';
      browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)?.[1] || '';
    }

    const info = `${browserName} ${browserVersion} on ${navigator.platform}`;
    return info.length > 100 ? `${info.substring(0, 97)}...` : info;
  };

  return (
    <div className="home">
      <section className="home__section-one">
        <div className="user-card">
          <img
            src={activeBackground}
            srcSet={`${activeBackground} 1x, ${activeBackground} 2x`}
            className="user-card__image"
            alt="Active wallpaper"
          />

          <div className="user-card__user-details">
            <h6 className="user-card__title">{username}</h6>
            <p className="user-card__content">{getBrowserInfo()}</p>
          </div>
        </div>
        <div className="home__info-cards">
          <div className="info-card">
            <Wifi1Regular className="info-card__fluent-icon" />
            <div className="info-card__details">
              <h6 className="info-card__title">Airtel_X947</h6>
              <p className="info-card__content">Connected, Secure</p>
            </div>
          </div>

          <div className="info-card">
            <BrightnessHighRegular className="info-card__fluent-icon" />
            <div className="info-card__details">
              <h6 className="info-card__title">Brightness</h6>
              <p className="info-card__content">{brightnessLevel}%</p>
            </div>
          </div>

          <div className="info-card">
            <Speaker0Regular className="info-card__fluent-icon" />
            <div className="info-card__details">
              <h6 className="info-card__title">Volume</h6>
              <p className="info-card__content">{volumeLevel}%</p>
            </div>
          </div>
        </div>
      </section>
      <section className="home__section-two">
        <div className="home__header">
          <h6 className="home__title">System Information</h6>
          <p className="home__content">
            Details about your current session and device
          </p>
        </div>

        <div className="home__info-grid">
          <div className="system-info-item">
            <p className="system-info-item__label">Device Name</p>
            <p className="system-info-item__value">Portfolio OS Desktop</p>
          </div>

          <div className="system-info-item">
            <p className="system-info-item__label">Operating System</p>
            <p className="system-info-item__value">{navigator.platform}</p>
          </div>

          <div className="system-info-item">
            <p className="system-info-item__label">Screen Resolution</p>
            <p className="system-info-item__value">
              {window.screen.width} × {window.screen.height}
            </p>
          </div>

          <div className="system-info-item">
            <p className="system-info-item__label">Browser Language</p>
            <p className="system-info-item__value">{navigator.language}</p>
          </div>

          <div className="system-info-item">
            <p className="system-info-item__label">Color Depth</p>
            <p className="system-info-item__value">
              {window.screen.colorDepth}-bit
            </p>
          </div>

          <div className="system-info-item">
            <p className="system-info-item__label">Viewport Size</p>
            <p className="system-info-item__value">
              {window.innerWidth} × {window.innerHeight}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
