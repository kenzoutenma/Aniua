export const backendAPIRoutes = {
  filter: `filter/`,
  genres_data: 'genres',
  animeByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}`,
  charsByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}/characters/`,
};
