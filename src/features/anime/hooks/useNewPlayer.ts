'use client';

import { usePlayerStore } from '@/shared/state/player-history';
import { useEffect, useState } from 'react';
import getEpisodeService from '../service/getEpisode';
import getEpisodesListService from '../service/getEpisodesList';

export interface PlayerV2 {
  anime_slug: string;
  current_episode_title: string;
  current_episode_id: number | string;
  current_episode_url: string | null;
  current_episode_poster?: string;
  current_studio: string;
  studios_list: Studio[];
  is_loading: boolean;
  is_error: boolean;
}

const default_player = (slug: string) => {
  return {
    anime_slug: slug,
    current_episode_title: '',
    current_episode_id: 0,
    current_episode_url: null,
    current_studio: '',
    studios_list: [],
    is_loading: true,
    is_error: false,
  };
};

export const useNewPlayer = (slug: string) => {
  // Player States
  const [episodesList, setEpisodesList] = useState<EpisodeListInterface[] | null>(null);
  const [playerState, setPlayerState] = useState<PlayerV2>(default_player(slug));
  // Player Store
  const { getEpisode } = usePlayerStore.getState();
  const { setEpisode } = usePlayerStore.getState();
  const stored = {
    lastEpisode: Number(getEpisode(slug || '')?.episodeID),
    lastStudio: getEpisode(slug || '')?.studio,
  };

  const fetch_episodes_list = async () => {
    if (!slug) throw new Error(`No slug: ${slug}`);
    const list = await getEpisodesListService(slug);
    setEpisodesList(list.episodes);
  };

  const handleEpisode = async (episodeID: number | string) => {
    setPlayerState((prev) => ({ ...prev, is_loading: true }));

    const newEpisode = await getEpisodeService(episodeID.toString());

    if (newEpisode instanceof Error) {
      throw new Error((newEpisode as Error).message);
    }

    if (!newEpisode.players) {
      setPlayerState((prev) => ({ ...prev, is_loading: false }));
      setPlayerState((prev) => ({ ...prev, is_error: true }));
      return null;
    }

    const isNewEpisodeHasArrayOfPlayers = Array.isArray(newEpisode.players);

    const studios: Studio[] = isNewEpisodeHasArrayOfPlayers
      ? newEpisode.players.map(({ id, title, poster }) => ({ id, title, poster }))
      : [];

    let episodeUrl: string | null = null;

    if (Array.isArray(newEpisode.players) && newEpisode.players.length > 0) {
      const matchedPlayer = newEpisode.players.find(
        (p) => String(p.title) === String(playerState.current_studio),
      );

      if (matchedPlayer) {
        episodeUrl = matchedPlayer.video?.[0]?.url || null;
      } else {
        episodeUrl = newEpisode.players[0].video?.[0]?.url || null;
      }

      console.log(matchedPlayer);
    }

    setPlayerState((prevState) => ({
      ...prevState,
      current_episode_url: episodeUrl,
      current_episode_id: episodeID,
      episode_title: newEpisode.title?.ua,
      studios_list: studios,
      current_episode_poster: newEpisode.poster,
    }));
    setPlayerState((prev) => ({ ...prev, is_loading: false }));

    // setting new episode to store
    setEpisode(slug, {
      episodeID: episodeID,
      studio: String(playerState.current_studio),
      episodeNumber: Number(newEpisode.episode_number),
    });
  };

  const handleStudio = (index: string) => {
    console.log(index);
    setPlayerState((prevState) => ({ ...prevState, current_studio: index }));
  };

  useEffect(() => {
    // select episode (1 if don't watch before)
    if (!episodesList) return;
    if (episodesList.length < 1) {
      setPlayerState((prev) => ({ ...prev, is_error: true }));
      return;
    }
    if (stored.lastEpisode) {
      setPlayerState((prev) => ({
        ...prev,
        current_episode_id: stored.lastEpisode,
        current_studio: stored.lastStudio || '',
      }));
      handleEpisode(stored.lastEpisode);
    } else {
      handleEpisode(episodesList[0].id);
    }
  }, [episodesList]);

  useEffect(() => {
    if (!episodesList || !playerState.current_episode_id) return;

    handleEpisode(playerState.current_episode_id);
  }, [playerState.current_studio]);

  useEffect(() => {
    // fetch list on page start
    fetch_episodes_list();
  }, []);

  return { playerState, episodesList, handleEpisode, handleStudio };
};
