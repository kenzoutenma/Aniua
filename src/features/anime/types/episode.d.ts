type Video = {
  episode: number;
  file: string | null;
  poster: string | null;
  slug: string | null;
  studio: string | null;
  subtitle: string | null;
  thumbnails: string | null;
  title: string | null;
};

type studio = {
  id: number;
  poster: string | null;
  title: string | null;
};

interface PlayersInEpisode {
  studio: studio;
  videos: Video[];
}

interface EpisodeListInterface {
  id: number | string;
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
  players?: PlayersInEpisode[] | [];
}

interface IEpisodeListResponse {
  episodes: EpisodeListInterface[];
}
