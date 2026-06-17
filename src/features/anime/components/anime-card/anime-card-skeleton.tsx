import clsx from 'clsx';
import styles from './anime-card.module.css';

const CardSkeletonBlock = ({ countOfCards = 1 }: { countOfCards?: number }) => {
  return (
    <>
      {Array.from({ length: countOfCards }).map((_, i) => (
        <div className={clsx(styles.card_container, 'loader')} key={i}>
          <div className={clsx('w-[400px] h-[750px]', styles.card_image, styles.load)} />
          <p className={clsx(styles.card_title)}>Load</p>
          <span className={styles.card_rating}>10</span>
        </div>
      ))}
    </>
  );
};

export default CardSkeletonBlock;
