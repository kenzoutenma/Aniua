'use client';

import { getTranslatedText } from '@/shared/lib';
import { Button } from '@/shared/ui';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './anime-card.module.css';
import horizontal from './horizontal-anime-card.module.css';

interface cardProps {
  image: string | '/next.svg';
  title: string;
  href?: string;
  variant?: 'horizontal' | 'default';
  additional?: {
    year?: number;
    genres?: AnimeGenre[] | null;
    rate?: string;
    onClick?: () => void;
    history?: { episode?: number | string };
  };
}

const genres = (genres: AnimeGenre[] | []) => {
  if (!genres) return null;
  const genresStr = genres.map((el) => el.title || el.slug).join(', ');
  return <span key={genresStr}>{genresStr}</span>;
};

const Card: React.FC<cardProps> = ({
  image,
  title,
  href = '#',
  variant = 'default',
  additional,
}) => {
  const rate = additional?.rate ? <span>{additional?.rate}✨</span> : null;
  const History = () => {
    console.log(additional);
    return additional?.history?.episode ? (
      <span>
        {getTranslatedText('home.Continue watching episode')} {additional?.history?.episode}
      </span>
    ) : (
      <></>
    );
  };
  return variant == 'default' ? (
    <a title={title} href={href} className={styles.card_container}>
      <Image
        className={styles.card_image}
        src={image}
        alt={title}
        width={144}
        height={144}
        loading="eager"
        quality={50}
      />
      <p className={styles.card_title}>{title}</p>
      <span className={styles.card_rating}>{rate}</span>
    </a>
  ) : (
    <Button as={Link} href={href} className={horizontal.h_card}>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className={horizontal.h_card_image}
      ></Image>
      <div>
        <div className={horizontal.h_card_title_container}>
          <h2
            className={clsx(
              horizontal.h_card_title,
              title.length > 20 && horizontal['marquee-text'],
            )}
          >
            {title}
          </h2>
        </div>
        <div className={horizontal.h_card_description}>
          {genres(additional?.genres || [])}
          <History />
        </div>
      </div>
    </Button>
  );
};

export default Card;
