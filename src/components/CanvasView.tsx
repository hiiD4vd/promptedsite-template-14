import React from 'react';
import { PROJECTED_POINTS_HTML } from './projectedPointsHtml';

export const CanvasView: React.FC = () => {
  return (
    <div
      data-gl-canvas=""
      className="canvas-w"
      dangerouslySetInnerHTML={{ __html: PROJECTED_POINTS_HTML }}
    />
  );
};
