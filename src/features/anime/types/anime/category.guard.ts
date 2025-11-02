function isAnimeGenre(obj: unknown): obj is AnimeGenre {
  if (typeof obj !== 'object' || obj === null) return false;

  const o = obj as Partial<AnimeGenre>;

  return (
    typeof o.title === 'string' &&
    (typeof o.id === 'string' || typeof o.id === 'number') &&
    typeof o.slug === 'string'
  );
}

export default isAnimeGenre;
