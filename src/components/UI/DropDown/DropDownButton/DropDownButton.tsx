import { ArrowDownIcon } from '@/utils/icons';
import React, { HTMLAttributes } from 'react';
import styles from './dropdownButton.module.css';

interface dropdown_button extends HTMLAttributes<HTMLDivElement> {
  state: string | React.ReactNode;
  handle: () => void;
}

function DropDownButton({ state, handle }: dropdown_button) {
  return (
    <>
      <button
        role="button"
        aria-haspopup="listbox"
        className={styles.dropdownButton}
        onClick={() => handle}
      >
        {typeof state == 'string' ? (
          <>
            {state}
            <ArrowDownIcon />
          </>
        ) : (
          state
        )}
      </button>
    </>
  );
}

export default DropDownButton;
