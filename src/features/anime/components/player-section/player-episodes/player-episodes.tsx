import Image from 'next/image';
import styles from './episode-card.module.css';
import { Pagination } from '@/shared/ui';

const Episodes = ({
  episodesList,
  handleEpisode,
  episode_now,
}: {
  episodesList: EpisodeListInterface[];
  handleEpisode: (x: number | string) => void;
  episode_now: number | string;
}) => {
  return (
    <Pagination variant="vertical">
      {episodesList.map((element, index) => {
        const isCurrent = element.id === episode_now;
        return (
          <div
            key={index}
            className={styles.episode_wrap}
            data-selected={isCurrent}
            onClick={() => handleEpisode(element.id)}
          >
            <div>
              <h3>Episode #{element.episode_number}</h3>
            </div>
            {element.poster && (
              <Image
                width={500}
                height={500}
                src={element.poster}
                alt={`episode_${element.episode_number}_poster`}
              />
            )}
          </div>
        );
      })}
    </Pagination>
  );
};

export default Episodes;
