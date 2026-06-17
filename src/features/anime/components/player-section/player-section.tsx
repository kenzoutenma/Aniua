'use client';

import clsx from 'clsx';
import { useNewPlayer } from '../../hooks/useNewPlayer';
import Episodes from './player-episodes/player-episodes';
import PlayerFrame from './player-frame/player-frame';
import styles from './player-section.module.scss';

function PlayerSection({ data }: { data: AnimeDataInterface }) {
  const { playerState, episodesList, handleEpisode, handleStudio } = useNewPlayer(data.slug);

  return (
    <section className={clsx(styles.anime_player_section, 'four_col_section')}>
      <div>
        <PlayerFrame
          playerState={playerState}
          episodesList={episodesList}
          handleStudio={handleStudio}
        />
      </div>
      <div>
        {episodesList && !playerState.is_error ? (
          <Episodes
            episodesList={episodesList}
            handleEpisode={handleEpisode}
            episode_now={playerState.current_episode_id}
          />
        ) : null}
      </div>
    </section>
  );
}

export default PlayerSection;
