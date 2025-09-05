'use client';

import { ArrowDownIcon } from '@/utils/icons';
import clsx from 'clsx';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../UIComponents';
import styles from './Collapsible.module.css';

function Collapsible({
  label,
  children,
  hidden,
}: {
  label: string;
  children: React.ReactNode;
  hidden?: boolean;
}) {
  const [visible, setVisible] = useState(hidden && true);
  const [display, setDisplay] = useState(hidden && true);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      el.style.setProperty('--collapsible-content-height', `${el.scrollHeight}px`);
    }
  }, [children, visible]);

  const handleVisible = () => {
    if (visible) {
      setVisible(false);
    } else {
      setDisplay(true);
      requestAnimationFrame(() => setVisible(true));
    }
  };

  const handleAnimationEnd = () => {
    if (!visible) {
      setDisplay(false);
    }
  };

  return (
    <div
      className={styles.block}
      aria-haspopup="listbox"
      aria-expanded={visible}
      aria-controls="dropdown-options"
    >
      <Button onClick={handleVisible} style={{ justifyContent: 'space-between' }}>
        {label}
        <ArrowDownIcon
          style={{ transform: `rotate(${visible ? `0deg` : `180deg`})`, transition: 'all .1s' }}
        />
      </Button>
      <div
        ref={contentRef}
        className={clsx(styles.collapsible_child)}
        data-expanded={visible}
        inert={!visible}
        style={{ display: display ? 'flex' : 'none' }}
        onTransitionEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapsible;
