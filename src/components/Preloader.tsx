import React from 'react';

export const Preloader: React.FC = () => {
  return (
    <div data-module="loader" className="loader-w">
      <div className="loader">
        <div className="loader__circle"></div>
        <div className="loader__circle">
          <div className="loader__dot dot1"></div>
        </div>
        <div className="loader__circle">
          <div className="loader__dot dot2"></div>
        </div>
        <div className="loader__circle">
          <div className="loader__dot dot3"></div>
        </div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
      </div>
      <div data-module="tags" aria-hidden={true} className="tagcloud-w"></div>
    </div>
  );
};
