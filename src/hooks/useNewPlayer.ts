'use client';

import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { usePlayerStore } from '@/stores/playerHistory';
import { useEffect, useState } from 'react';

export interface PlayerV2 {
  anime_slug: string;
  current_episode_title: string;
  current_episode_id: number;
  current_episode_url: string | null;
  current_studio: number;
  studios_list: string[];
  is_loading: boolean;
  is_error: boolean;
}

const default_player = (slug: string) => {
  return {
    anime_slug: slug,
    current_episode_title: '',
    current_episode_id: 0,
    current_episode_url: null,
    current_studio: 0,
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
    lastStudio: Number(getEpisode(slug || '')?.studio),
  };

  const fetch_episodes_list = async () => {
    if (!slug) throw new Error(`No slug: ${slug}`);
    const list = await FetchServiceInstance.fetchHelper(
      `api/${animeAPIConstant.episodeList(slug)}`,
      {
        to: 'self',
      },
    );
    setEpisodesList(list.episodes || list);
  };

  const handleEpisode = async (episodeID: number) => {
    setPlayerState((prev) => ({ ...prev, is_loading: true }));

    const newEpisode: EpisodeListInterface = await FetchServiceInstance.fetchHelper(
      animeAPIConstant['episode'],
      { to: 'self', params: { title: episodeID.toString() } },
    );

    const isNewEpisodeHasArrayOfPlayers = Array.isArray(newEpisode.players);
    const studios: string[] = isNewEpisodeHasArrayOfPlayers
      ? newEpisode.players.map((player: PlayersInEpisode) => player.studio)
      : [];

    let episodeUrl: string | null = null;

    console.log(episodeID, playerState.current_studio);

    if (isNewEpisodeHasArrayOfPlayers && newEpisode.players[playerState.current_studio]) {
      // check if selected studio exists in current episode
      episodeUrl = newEpisode.players[playerState.current_studio].videos[0]?.video_url || null;
    } else if (isNewEpisodeHasArrayOfPlayers && newEpisode.players[0]) {
      episodeUrl = newEpisode.players[0].videos[0]?.video_url || null;
    }

    setPlayerState((prevState) => ({
      ...prevState,
      current_episode_url: episodeUrl,
      current_episode_id: episodeID,
      episode_title: newEpisode.title?.ua,
      studios_list: studios,
    }));
    setPlayerState((prev) => ({ ...prev, is_loading: false }));

    // setting new episode to store
    setEpisode(slug, {
      episodeID: episodeID,
      studio: String(playerState.current_studio),
      episodeNumber: Number(newEpisode.episode_number),
    });
  };

  const handleStudio = (index: number) => {
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
        current_studio: stored.lastStudio,
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
