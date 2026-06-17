import renderValue from '../../utils/plain-data-details';
import styles from './card-popover.module.scss';

const AnimePopover = ({ animeData }: { animeData: AnimeDataInterface }) => {
  const linked: Partial<AnimeDataInterface> = {
    year: animeData.year,
    status: animeData.status,
    genres: animeData.genres,
  };

  return (
    <div className={styles.anime_card_popover_container}>
      <h4>{animeData.title_ua}</h4>
      <div className={styles.anime_card_popover_tags}>
        {Object.entries(linked).map(([key, value]) => {
          if (!value) return;
          return renderValue(value, key);
        })}
      </div>
      {animeData?.description_main && <p>{animeData?.description_main.slice(0, 125)}...</p>}
    </div>
  );
};

export default AnimePopover;
