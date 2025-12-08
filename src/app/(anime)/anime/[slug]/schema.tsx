const getAnimeSchema = (data: AnimeDataInterface) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const pageUrl = `${baseUrl}/anime/${data.slug}`;
  const genres = data.genres?.map((e) => e.title) ?? [];

  const tvSeries = {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    '@id': `${pageUrl}#series`,
    url: pageUrl,
    name: data.title,
    alternateName: data.title_jp,
    image: data.poster,
    description: data.description,
    inLanguage: 'uk',
    isFamilyFriendly: false,
    datePublished: String(data.year),
    numberOfEpisodes: data.episode.present,
    contentRating: data.rating,
    productionCompany: undefined,
    keywords: ['Anime', 'Українською', ...genres],
    potentialAction: {
      '@type': 'WatchAction',
      target: pageUrl,
    },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ANIUA',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Список',
        item: `${baseUrl}/list`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title,
        item: pageUrl,
      },
    ],
  };

  return [tvSeries, breadcrumbs];
};

export default getAnimeSchema;
