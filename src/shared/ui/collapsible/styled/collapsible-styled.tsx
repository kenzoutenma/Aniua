'use client';

import { ArrowDownIcon } from '@/shared/icons/index';
import { Button } from '@/shared/ui/index';
import clsx from 'clsx';
import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './collapsible-styled.module.css';

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
      setVisible(true)
    }
  };

  return (
    <div
      className={styles.collapsible_wrap}
      aria-haspopup="listbox"
      aria-expanded={visible}
      aria-controls="dropdown-options"
    >
      <Button className={styles.collapse_button} onClick={handleVisible}>
        {label}
        <ArrowDownIcon />
      </Button>
      <div
        ref={contentRef}
        className={clsx(styles.collapsible_child)}
        aria-expanded={visible}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapsible;
