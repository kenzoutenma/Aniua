'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../UIComponents';
import styles from './Card.module.css';

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

const genres = (genres: AnimeGenres[] | []) => {
  if (!genres) return null;
  const genresStr = genres.map((el) => el.title || el.slug).join(', ');
  return <span key={genresStr}>{genresStr}</span>;
};

const Card: React.FC<cardProps> = ({ image, title, slug, variant = 'default', additional }) => {
  const rate = additional?.rate ? <span>{additional?.rate}✨</span> : null;
  return variant == 'default' ? (
    <Button
      as={Link}
      prefetch={false}
      title={title}
      href={`/anime/${slug}`}
      className={styles.cardcontainer}
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={750}
        className={styles.cardImage}
        loading="eager"
        quality={50}
      />
      <div className={styles.cardData}>
        <p className={styles.cardText}>{title}</p>
        {rate}
      </div>
    </Button>
  ) : (
    <Button as={Link} href={`/anime/${slug}`} className={styles.h_card}>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className={styles.h_card_image}
      ></Image>
      <div>
        <div className={styles.h_card_title_container}>
          <h2 className={clsx(styles.h_card_title, title.length > 20 && styles['marquee-text'])}>
            {title}
          </h2>
        </div>
        <div className={styles.h_card_description}>
          {genres(additional?.genres || [])}
        </div>
      </div>
    </Button>
  );
};

export default Card;
