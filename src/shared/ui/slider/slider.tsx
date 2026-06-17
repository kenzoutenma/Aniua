import React from 'react';
import styles from './slider.module.scss';

interface SliderProps {
  children: React.ReactNode;
}

function Slider({ children }: SliderProps) {
  return (
    <div className={styles['slider-wrap']}>
      <div className={styles['slider-content']}>
        {React.Children.map(children, (child, i) => (
          <div className={styles['slider-item']} key={i}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
