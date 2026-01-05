import './Loader.scss';

export interface LoaderProps {
  customText?: string[]; // Display custom text
  fullscreen?: boolean; // Fill entire screen (for transitions)
}

function Loader({ customText, fullscreen = false }: LoaderProps) {
  const renderText = () => {
    if (customText) {
      return customText.map((item, index) => (
        <p className="loader__text" key={`${index + 1}`}>
          {item}
        </p>
      ));
    }
    return (
      <>
        <p className="loader__text">React + Typescript</p>
        <p className="loader__text">Vite</p>
        <p className="loader__text">Zustand store</p>
        <p className="loader__text">Microsoft Fluent UI and Design Tokens</p>
      </>
    );
  };

  return (
    <div className={`loader ${fullscreen ? 'loader--fullscreen' : ''}`}>
      <span className="loader__spinner" />
      <div className="loader__text-container">{renderText()}</div>
    </div>
  );
}

export default Loader;
