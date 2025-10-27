export const backendAPIRoutes = {
  filter: `filter/`,
  animeByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}`,
  charsByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}/characters/`,
};
