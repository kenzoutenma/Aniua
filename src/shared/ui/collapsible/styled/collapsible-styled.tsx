'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './collapsible.module.scss';

interface Props {
  label: string;
  hidden?: boolean;
  children?: React.ReactNode;
}

function Collapsible({ label, hidden = false, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(!hidden);
  const collapseContentRef = useRef<HTMLDivElement | null>(null);

  const toggleVisible = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (collapseContentRef.current) {
        collapseContentRef.current.style.setProperty(
          '--collapsible-content-height',
          `${collapseContentRef.current.scrollHeight + 2}px`,
        );
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [children]);

  return (
    <div
      role="button"
      aria-labelledby="clpse-title"
      className={styles.cllpsble}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls="collapsible-options"
    >
      <label id="clpse-title" className={styles['clpse-label']}>
        <input type="checkbox" onChange={toggleVisible} checked={isOpen} value={label} />
        <h3>{label}</h3>
      </label>

      <div
        id="collapsible-options"
        ref={collapseContentRef}
        className={styles.collapsible_child}
        aria-expanded={isOpen}
        data-inert={!isOpen ? '' : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapsible;
