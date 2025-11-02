'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import buttonStyles from './dropdown-button.module.css';
import menuStyles from './dropdown-menu.module.css';
import styles from './dropdown.module.css';

interface DropdownProps {
  trigger?: React.ReactNode; //For show custom element
  currentState?: string; //For show current state
  children?: React.ReactNode; //For show current state as Node
  align?: 'left' | 'right' | 'center'; //For change position of dropdown options menu
}

const Dropdown = ({ trigger, children, align = 'center' }: DropdownProps) => {
  const [visible, setVision] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleVisible = () => {
    setVision((prev) => !prev);
    console.log(visible);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setVision(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-haspopup="listbox"
      aria-expanded={visible}
      onClick={handleVisible}
      aria-controls="dropdown-options"
      className={styles.dropdownWrapper}
    >
      <button
        role="button"
        aria-haspopup="true"
        aria-expanded={visible}
        className={buttonStyles.dropdownButton}
      >
        {trigger}
      </button>
      <div
        tabIndex={visible ? 1 : -1}
        role="menu"
        className={clsx(
          !visible && menuStyles.hidden,
          menuStyles.dropdownMenu,
          align === 'left' && menuStyles.alignLeft,
          align === 'right' && menuStyles.alignRight,
          align === 'center' && menuStyles.alignCenter,
        )}
      >
        {children}
      </div>
      {visible && <></>}
    </div>
  );
};
export default Dropdown;
