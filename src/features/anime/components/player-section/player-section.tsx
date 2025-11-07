'use client';

import Section from '@/shared/layout/section/section';
import { useNewPlayer } from '../../hooks/useNewPlayer';
import Episodes from './player-episodes/player-episodes';
import PlayerFrame from './player-frame/player-frame';
import styles from './player-section.module.css';

function PlayerSection({ data }: { data: AnimeDataInterface }) {
  const { playerState, episodesList, handleEpisode, handleStudio } = useNewPlayer(data.slug);

  return (
    <Section typeOfSection="TwoColSection" style={{ gridTemplateColumns: '3fr 7fr' }}>
      <div className={styles.playerSectionColumn}>
        {episodesList && !playerState.is_error ? (
          <Episodes
            episodesList={episodesList}
            handleEpisode={handleEpisode}
            episode_now={playerState.current_episode_id}
          />
        ) : null}
      </div>
      <div>
        <PlayerFrame
          playerState={playerState}
          episodesList={episodesList}
          handleStudio={handleStudio}
        />
      </div>
    </Section>
  );
}

export default PlayerSection;
