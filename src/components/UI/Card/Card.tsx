'use client';

import Image from 'next/image';
import { Button, TypographyType } from '../UIComponents';
import styles from './Card.module.css';
import Link from 'next/link';

interface cardProps {
  image: string | '/next.svg';
  title: string;
  slug: string;
  variant?: 'horizontal' | 'default';
  additional?: {
    year?: number;
    genres?: AnimeGenres[];
    rate?: string;
    onClick?: () => void;
  };
}

const genres = (year: number, genres: AnimeGenres[] | []) => {
  if (!genres) return null;
  return (
    <>
      <span>{year}</span>
      <span>•</span>
      {Object.entries(genres).length > 0 ? (
        genres.map((el) => <span key={el.id}>{el.title}</span>)
      ) : (
        <p>unknown genres (?)</p>
      )}
    </>
  );
};

const Card: React.FC<cardProps> = ({ image, title, slug, variant = 'default', additional }) => {
  const rate = additional?.rate ? <span>{additional?.rate}✨</span> : null
  return variant == 'default' ? (
    <Button as={Link} prefetch={false} title={title} href={`/anime/${slug}`} className={styles.cardcontainer}>
      <Image
        src={image}
        alt={title}
        width={500}
        height={750}
        className={styles.cardImage}
        loading="eager"
        quality={50}
      />
      <div className={styles.cardData}><p className={styles.cardText}>{title}</p>{rate}</div>
    </Button>
  ) : (
    <Button as={Link} href={`/anime/${slug}`} className={styles.cardHorizontal}>
      <div
        className={styles.cardImageHorizontal}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div>
        <p className={TypographyType['h2'].className}>{title}</p>
        <div
          className={TypographyType['muted'].className}
          style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}
        >
          {genres(additional?.year || 0, additional?.genres || [])}
        </div>
      </div>
    </Button>
  );
};

export default Card;
