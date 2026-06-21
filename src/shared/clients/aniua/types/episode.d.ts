interface Studio {
  id: string;
  title: string;
  poster: string;
}

interface Video {
  slug: string;
  episode: number;
  studio: string;
  title: string;
  file: string;
  poster: string;
  subtitle: string;
  thumbnails: string;
}

interface PlayersInEpisode {
  studio: Studio;
  videos: Video[];
}

interface EpisodeListInterface {
  id: number;
  episode_number: number;
  title: {
    ua: string | null;
    en: string | null;
    jp: string | null;
  };
  poster: string;
  is_filler: boolean;
  recap: boolean;
  duration: number;
  rating: {
    likes: number;
    dislikes: number;
  };
  description: string;
  players: (Studio & {
    video:
      | {
          type: string;
          url: string;
          quality: string;
        }[]
      | null;
  })[];
}

interface IEpisodeListResponse {
  episodes: EpisodeListInterface[];
  count: number;
  page: number;
  page_size: number;
  page_count: number;
  is_pagenated: boolean;
  next_page: number;
  previous_page: number;
}
