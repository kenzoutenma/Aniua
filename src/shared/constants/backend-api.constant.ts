export const backendAPIRoutes = {
  filter: `filter/`,
  genres_data: 'genres',
  animeByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}`,
  charsByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}/characters/`,

  // Episodes
  episodeByID: (ID: string) => `episode/get/${encodeURIComponent(ID)}`,
  episodeListBySlug: (slug: string) => `anime/${encodeURIComponent(slug)}/episodes`,
};
