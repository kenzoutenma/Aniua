'use client';

import { SearchIcon } from '@/shared/assets/icons';
import { getTranslatedText } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import styles from './search-bar.module.css';
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

  const Wrap = () => (
    <div className={styles.search_bar}>
      <label htmlFor="search_bar">{getTranslatedText('header.search')}</label>
      <input
        readOnly
        id="search_bar"
        type="text"
        onClick={() => {
          router.push('/search');
        }}
        value={getTranslatedText('header.search')}
      />
      <SearchIcon
        onClick={() => {
          router.push('/search');
          handle?.();
        }}
      />
    </div>
  );

  return variant == 'input' ? (
    <Wrap />
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
