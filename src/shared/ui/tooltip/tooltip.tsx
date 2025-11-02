'use client';

import clsx from 'clsx';
import React, { useRef } from 'react';
import styles from './tooltip.module.css';
import { useTooltipPosition } from './utils/useToolTipPosition';

interface TooltipInterface extends React.HTMLAttributes<HTMLDivElement> {
  tooltipContent: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'left' | 'right';
}

const Tooltip = ({ tooltipContent, children, position = 'right', ...props }: TooltipInterface) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const side = useTooltipPosition(wrapperRef, tooltipRef);
  return (
    <div {...props} ref={wrapperRef}>
      {children}

      <div
        className={clsx(
          styles.tooltip,
          side === position ? styles['tooltip-right'] : styles['tooltip-left'],
        )}
        ref={tooltipRef}
      >
        {tooltipContent}
      </div>
    </div>
  );
};

export default Tooltip;
