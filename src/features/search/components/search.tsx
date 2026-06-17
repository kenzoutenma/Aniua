import Card from '@/features/anime/components/anime-card/anime-card';
import useSearchHook from '@/features/search/hooks/useSearch';
import { getTranslatedText } from '@/shared/lib';
import Input from '@/shared/ui/input/input';
import React from 'react';

function Search() {
  const { onSearchSubmit, onQueryChange, results, isLoading, query } = useSearchHook();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Enter':
        await onSearchSubmit();
        break;
    }
  };

  return (
    <>
      <Input
        value={query}
        type="text"
        placeholder={getTranslatedText('header.search')}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchResults results={results} isLoading={isLoading} />
    </>
  );
}

type SearchResultsProps = {
  results: AnimeDataInterface[] | string;
  isLoading: boolean;
};

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) return <p>Loading...</p>;
  if (typeof results === 'string') return <p>{results}</p>;
  if (!results || results.length === 0) return <p>No results found.</p>;

  return (
    <div>
      {results.map((item, i) => (
        <Card
          key={i}
          variant="horizontal"
          image={item.poster}
          title={item.title_ua}
          href={'/anime/' + item.slug}
          additional={{ year: item.year, genres: item.genres }}
        />
      ))}
    </div>
  );
}

export default Search;
