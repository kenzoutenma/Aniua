const animeApiRoutes = {
  animeByTitle: (slug: string) => `4.0/anime/${encodeURIComponent(slug)}`,
  charsByTitle: (slug: string) => `4.0/anime/${encodeURIComponent(slug)}/characters`,
};

export default animeApiRoutes;
