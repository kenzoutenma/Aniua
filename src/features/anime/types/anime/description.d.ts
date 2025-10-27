interface descriptionInterface {
  type: string;
  year: number;
  status: string;
  season?: string;
  airing: boolean;
  rating: string;
  genres?: AnimeGenre[] | null;
  themes?: AnimeThemes[] | null;
  producers?: AnimeProducer[] | null;
}
