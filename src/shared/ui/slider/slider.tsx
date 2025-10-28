import React from 'react';

interface SliderProps {
  children: React.ReactNode;
}

function Slider({ children }: SliderProps) {
  return (
    <div style={{ overflow: 'hidden', marginRight: 'calc(50% - 75vw)', width: '100%' }}>
      <div style={{ display: 'flex', overflowX: 'scroll' }}>{children}</div>
    </div>
  );
}

export default Slider;
