'use client';

import Select from '@/shared/ui/select/select';
import styles from './player-frame.module.css';
import { getTranslatedText } from '@/shared/lib';
import { PlayerV2 } from '@/features/anime/hooks/useNewPlayer';

const PlayerWrapper = ({
  src,
  studios,
  studio,
  handleStudio,
}: {
  src: string;
  studios: string[];
  studio: number;
  handleStudio: (index: number) => void;
}) => {
  return (
    <div className={styles.frameWrapper}>
      {studios.length > 1 ? (
        <Select value={studio} onChange={(e) => handleStudio(Number(e.target.value))}>
          {studios.map((studio_name, index) => (
            <option key={index} value={index}>
              {studio_name}
            </option>
          ))}
        </Select>
      ) : null}
      <iframe className={styles.frame} allow="fullscreen" src={src} />
    </div>
  );
};

interface IPlayerFrame {
  episodesList: EpisodeListInterface[] | null;
  playerState: PlayerV2;
  handleStudio: (index: number) => void;
}

const PlayerFrame = ({ episodesList, playerState, handleStudio }: IPlayerFrame) => {
  if (!episodesList) return <h2>Loading episodes…</h2>;
  if (playerState.is_error) return <h2>PlayerNotFound</h2>;
  if (playerState.is_loading) return <h2 className={styles.frame}>Waiting for player…</h2>;
  if (playerState.current_episode_url)
    return (
      <PlayerWrapper
        src={playerState.current_episode_url}
        studios={playerState.studios_list}
        studio={playerState.current_studio}
        handleStudio={handleStudio}
      />
    );
  return <h2>{getTranslatedText('info.EpisodesNotFound')}</h2>;
};

export default PlayerFrame;
