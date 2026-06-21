'use client';

import { PlayerV2 } from '@/features/anime/hooks/useNewPlayer';
import { getTranslatedText } from '@/shared/lib';
import Select from '@/shared/ui/select/select';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import styles from './player-frame.module.css';

const PlayerWrapper = ({
  src,
  studios,
  studio,
  handleStudio,
  poster,
}: {
  src: string;
  studios: Studio[];
  studio: number | string;
  handleStudio: (index: string) => void;
  poster?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log(src);
    if (!src.includes('.m3u8')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [src]);
  console.log(studios);
  return (
    <div className={styles.frameWrapper}>
      {studios.length > 1 ? (
        <Select value={studio} onChange={(e) => handleStudio(e.target.value)}>
          {studios.map((e) => {
            return (
              <option key={e.id} value={typeof e == 'string' ? e : e.id}>
                {typeof e == 'string' ? e : e.title}
              </option>
            );
          })}
        </Select>
      ) : null}
      <video poster={poster} className={styles.frame} ref={videoRef} controls />
    </div>
  );
};

interface IPlayerFrame {
  episodesList: EpisodeListInterface[] | null;
  playerState: PlayerV2;
  handleStudio: (index: string) => void;
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
        poster={playerState.current_episode_poster}
      />
    );
  return <h2>{getTranslatedText('info.EpisodesNotFound')}</h2>;
};

export default PlayerFrame;
