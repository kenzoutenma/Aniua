'use client';

import { useNewPlayer } from '@/hooks/useNewPlayer';
import { getTranslatedText } from '@/utils';
import styles from './player.module.css';
import Pagination from '@/components/Pagination/Pagination';
import { Button, Dropdown } from '@/components/UI/UIComponents';

function Player({ slug }: { slug: string }) {
  const { playerState, episodesList, handleEpisode, handleStudio } = useNewPlayer(slug);

  const Frame = () => {
    if (!episodesList) return <h2>Loading episodes…</h2>;
    if (playerState.is_loading) return <h2 className={styles.frame}>Waiting for player…</h2>;
    if (playerState.current_episode_url)
      return (
        <PlayerFrame
          src={playerState.current_episode_url}
          studios={playerState.studios_list}
          studio={playerState.current_studio}
          handleStudio={handleStudio}
        />
      );
    return <h2>{getTranslatedText('info.EpisodesNotFound')}</h2>;
  };

  return (
    <>
      <Frame />
      <div style={{ width: '100%' }}>
        {episodesList ? (
          <Pagination scrollToActive>
            {episodesList.map((element, index) => {
              const isCurrent = element.id === playerState.current_episode_id;
              const variant = isCurrent ? 'primary' : element.is_filler ? 'outline' : 'secondary';
              return (
                <Button
                  key={index}
                  variant={variant}
                  onClick={() => handleEpisode(element.id)}
                  data-active={isCurrent || undefined}
                >
                  {element.episode_number}
                </Button>
              );
            })}
          </Pagination>
        ) : null}
      </div>
    </>
  );
}

const PlayerFrame = ({
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
        <Dropdown currentState={studios[studio]}>
          {studios.map((studio, index) => (
            <Button key={index} onClick={() => handleStudio(index)} variant='button'>
              {studio}
            </Button>
          ))}
        </Dropdown>
      ) : null}
      <iframe className={styles.frame} allow="fullscreen" src={src} />
    </div>
  );
};

export default Player;
