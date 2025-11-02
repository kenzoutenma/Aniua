'use client';

import { SearchIcon } from '@/shared/icons';
import { getTranslatedText } from '@/shared/lib';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  variant?: 'input' | 'icon';
  handle?: () => void;
}

function SearchBar({ variant = 'input', handle }: SearchBarProps) {
  const router = useRouter();

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     router.push('/search');
  //   }
  // };

  return variant == 'input' ? (
    <input type='text' onClick={() => {router.push('/search')}} value={getTranslatedText("header.search")} />
  ) : (
    <SearchIcon
      onClick={() => {
        router.push('/search');
        handle?.();
      }}
    />
  );
}

export default SearchBar;
