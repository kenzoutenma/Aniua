const episodesApiRoutes = {
  episodeByID: (ID: string) => `episode/get/${encodeURIComponent(ID)}`,
  videoByEpisodeID: (ID: string) => `api/4.0/rest/episode/get/${encodeURIComponent(ID)}/videos`,
  episodeListBySlug: (slug: string) => `api/rest/5.0/anime/${encodeURIComponent(slug)}/episodes`,
};

export default episodesApiRoutes;
