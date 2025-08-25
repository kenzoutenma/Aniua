'use client';

import clsx from 'clsx';
import React from 'react';
import styles from './Tooltip.module.css';

interface TooltipInterface extends React.HTMLAttributes<HTMLDivElement> {
  tooltipContent: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'left' | 'right';
}

const Tooltip = ({ tooltipContent, children, position = 'right', ...props }: TooltipInterface) => {
  return (
    <div
      {...props}
      className={styles['tooltip-wrapper']}
    >
      {children}

      <div
        className={clsx(
          styles.tooltip,
          styles[`tooltip-${position}`],
        )}
      >
        {tooltipContent}
      </div>
    </div>
  );
};

export default Tooltip;
