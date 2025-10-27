export const userAPIConstant = {
  login: 'login/',
  registration: 'registration/',
  profile: `profile/`,
  chart: `chart/`,
};

export const animeAPIConstant = {
  genres_data: 'data/genres',
  list: `list/`,
  filter: `list/`,
  episode: `anime/episode/`,
  search: `search/`,
  episodeByTitle: (title: string) => `episode/get/${encodeURIComponent(title)}`,
  episodeList: (slug: string) => `anime/${encodeURIComponent(slug)}/episodes`,
  animeByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}`,
  charsByTitle: (slug: string) => `anime/${encodeURIComponent(slug)}/characters/`,
};
