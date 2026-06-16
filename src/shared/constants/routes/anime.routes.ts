const animeApiRoutes = {
  animeByTitle: (slug: string) => `api/4.0/anime/${encodeURIComponent(slug)}`,
  charsByTitle: (slug: string) => `api/4.0/anime/${encodeURIComponent(slug)}/characters`,
};

export default animeApiRoutes;
