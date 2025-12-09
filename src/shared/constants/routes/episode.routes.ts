const episodesApiRoutes = {
  episodeByID: (ID: string) => `4.0/episode/get/${encodeURIComponent(ID)}`,
  videoByEpisodeID: (ID: string) => `4.0/episode/get/${encodeURIComponent(ID)}/videos`,
  episodeListBySlug: (slug: string) => `5.0/anime/${encodeURIComponent(slug)}/episodes`,
};

export default episodesApiRoutes;
