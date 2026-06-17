import { getTranslatedText } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { useState } from 'react';
import styles from './synopsis.module.css';

function Synopsis({ description }: { description: string }) {
  const [expanded, setExpand] = useState(false);
  return (
    description && (
      <>
        <section className={styles.synopsis_wrapper}>
          <span className={styles.synopsis_block} data-expanded={expanded}>
            <span style={{ color: 'var(--cnt-base)' }}>
              {getTranslatedText('info.Description')}:{' '}
            </span>
            {description}
          </span>
          <Button
            variant="default"
            className={styles.synopsis_button}
            onClick={() => setExpand((prev) => !prev)}
          >
            {expanded ? 'close' : 'open'}
          </Button>
        </section>
      </>
    )
  );
}

export default Synopsis;
