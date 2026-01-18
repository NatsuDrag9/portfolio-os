import { useEffect, useState } from 'react';
import './FileExplorer.scss';
import { Loader } from '@components/index';
import Portfolio from '../Portfolio/Portfolio';

// To Do: Add container queries to Portfolio

function FileExplorer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set is loading to false after 0.5s
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div className="file-explorer">
      {isLoading && (
        <div className="file-explorer__loader">
          <Loader />
        </div>
      )}
      <Portfolio />
    </div>
  );
}

export default FileExplorer;
