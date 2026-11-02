import React from 'react';
import { ProjectedPoints } from './ProjectedPoints';

export const CanvasView: React.FC = () => {
  return (
    <div
      data-gl-canvas=""
      className="canvas-w"
    >
      <ProjectedPoints />
    </div>
  );
};
