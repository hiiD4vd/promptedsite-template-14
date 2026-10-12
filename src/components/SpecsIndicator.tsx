import React from 'react';

export const SpecsIndicator: React.FC = () => {
  return (
    <a href="/specs" className="indicator-w w-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 23 22" fill="none" className="indicator__icon indicator__icon"><circle cx="11.295" cy="11.116" r="10.499" stroke="currentColor" strokeWidth="0.5"></circle><circle cx="11.295" cy="11.116" r="6.15967" stroke="currentColor" strokeWidth="0.5"></circle><circle cx="11.297" cy="11.116" r="1.5" fill="currentColor"></circle></svg><div className="indicator__label">[ xxx ]</div></a>
  );
};
