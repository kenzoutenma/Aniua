import { Button } from '@/shared/ui';
import React, { HTMLAttributes } from 'react';
import styles from './dropdown-button.module.css';

interface dropdown_button extends HTMLAttributes<HTMLDivElement> {
  state: string | React.ReactNode;
  handle: () => void;
}

function DropDownButton({ state, handle }: dropdown_button) {
  return (
    <>
      <Button
        variant='outline'
        role="button"
        aria-haspopup="listbox"
        className={styles.dropdownButton}
        onClick={() => handle}
        style={{ padding: "0" }}
      >
        {typeof state == 'string' ? (
          <>
            {state}
          </>
        ) : (
          <>{state}</>
        )}
      </Button>
    </>
  );
}

export default DropDownButton;
