interface title {
  title: string;
  title_en: string;
  title_jp: string;
  title_synonyms?: {
    title: string;
    type: string;
  }[];
}

interface AnimeDataInterface extends descriptionInterface, title {
  mal_id: number;
  slug: string;

  description: string;
  poster: string;
  background_image_url?: string | null;
  trailer?: string;

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
  page: number;
  page_count: number;
  next_page: boolean;
  previous_page: boolean;
}
