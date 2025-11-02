import { TypographyType } from '@/shared/ui';
import clsx from 'clsx';
import styles from './anime-card.module.css';

const CardSkeletonBlock = ({ countOfCards = 1 }: { countOfCards?: number }) => {
  return (
    <>
      {Array.from({ length: countOfCards }).map((_, i) => (
        <div className={clsx(styles.card)} key={i}>
          <div className={clsx('w-[400px] h-[750px]', styles.card_image, styles.load)} />
          <p className={clsx(styles.card_text, TypographyType['button'].className)}>Load</p>
        </div>
      ))}
    </>
  );
};

export default CardSkeletonBlock;
