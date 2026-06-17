const episodesApiRoutes = {
  episodeByID: (ID: string) => `api/4.0/episode/get/${encodeURIComponent(ID)}`,
  videoByEpisodeID: (ID: string) => `api/5.0/episode/get/${encodeURIComponent(ID)}/videos`,
  episodeListBySlug: (slug: string) => `api/5.0/anime/${encodeURIComponent(slug)}/episodes`,
};

export default episodesApiRoutes;
