'use client';

import { ArrowDownIcon } from '@/utils/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './Collapsible.module.css';
import { Button } from '../UIComponents';

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
  const handleVisible = () => setVisible((prev) => !prev);

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
        className={clsx(
          'flex flex-wrap gap-2 transition-all overflow-clip justify-start w-full px-1',
          visible ? 'max-h-screen' : 'max-h-0',
        )}
        aria-expanded={visible}
        inert={!visible ? true : false}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapsible;
