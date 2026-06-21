interface AnimeCharacters {
  id: number;
  title_ua: string;
  title_en: string;
  title_jp: null;
  description_ua: string;
  description_en: string;
  poster: string;
  role_en: 'Main' | 'Supporting';
  role_ua: string;
}

interface title {
  title_ua: string;
  title_en: string;
  title_jp: string;
  title_synonyms?: {
    title: string;
    type: string;
  }[];
}

interface AnimeGenre {
  title: string;
  id: string;
  slug: string;
  title_ua?: string;
  title_en?: string;
  description?: string;
}

interface descriptionInterface {
  type: {
    title: string;
    slug: string;
  };
  year: number;
  status: string;
  season?: string;
  airing: boolean;
  age_rating: string;
  genres?: AnimeGenre[] | null;
}

interface AnimeEpisodes {
  present: number | null;
  last: number;
}

interface AnimeDataInterface extends descriptionInterface, title {
  mal_id: number;
  slug: string;

  description: string;
  description_main: string;
  poster: string;
  cover_image_url?: string | null;
  trailer?: string;
  companies: AnimeGenre[] | null;

  episode: AnimeEpisodes;
  duration: string;

  score: number;
  scored_by: number;
  likes: number;
  dislikes: number;

  mal_score: number;
  mal_scored_by: number;

  created_at?: Date;
  updated_at?: Date;
}

interface AnimeDataListInterface {
  titles: AnimeDataInterface[];
  results?: AnimeDataInterface[];
  page: number;
  page_count: number;
  next_page: boolean;
  previous_page: boolean;
}
