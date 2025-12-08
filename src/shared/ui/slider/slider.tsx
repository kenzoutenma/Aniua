import React from 'react';
import styles from './slider.module.css';

interface SliderProps {
  children: React.ReactNode;
}

function Slider({ children }: SliderProps) {
  return (
    <div className={styles['slider-wrap']}>
      <div className={styles['slider-content']}>{children}</div>
    </div>
  );
}

export default Slider;
