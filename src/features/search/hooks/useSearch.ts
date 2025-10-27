import FI from '@/app/api';
import { animeAPIConstant } from '@/shared/constants/api-endpoints.constant';
import { getTranslatedText } from '@/shared/lib';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

function useSearchHook() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AnimeDataInterface[] | string>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDBSearch(query: string) {
    if (!query.trim()) return getTranslatedText('search.TypeSmt');

    const response = await FI.fetch<AnimeDataListInterface>(animeAPIConstant['search'], {
      to: 'self',
      params: { q: query },
    });

    if (!response.ok) return getTranslatedText('search.NoResults');

    const titles = response.data.titles;

    if (!Array.isArray(titles) || titles.length < 1) {
      return getTranslatedText('search.NoResults');
    }

    return titles;
  }

  const search = async (q: string) => {
    setIsLoading(true);

    try {
      const res = await fetchDBSearch(q);
      setResults(res);
    } catch (e) {
      setResults(getTranslatedText('toast.ServerError'));
      console.error(e);
    }

    setIsLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce((q: string) => {
      if (!q.startsWith('/')) search(q);
    }, 500),
    [],
  );

  const onQueryChange = (val: string) => {
    setQuery(val);
    if (val.startsWith('/')) {
      setResults(getTranslatedText('search.SearchWithCommand'));
    } else {
      debouncedSearch(val);
    }
  };

  const onSearchSubmit = () => {
    search(query);
  };

  return { onSearchSubmit, onQueryChange, search, setQuery, query, results, isLoading };
}

export default useSearchHook;
