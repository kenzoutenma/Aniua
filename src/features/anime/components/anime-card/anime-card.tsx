'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui';
import styles from './anime-card.module.css';
import horizontal from './horizontal-anime-card.module.css';
import { getTranslatedText } from '@/shared/lib';

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
    <Button as={Link} prefetch={false} title={title} href={href} className={styles.card}>
      <div className={styles.card_image}>
        <Image src={image} alt={title} width={500} height={750} loading="eager" quality={50} />
      </div>
      <div className={styles.card_name}>
        <p className={styles.card_title}>{title}</p>
        {rate}
      </div>
    </Button>
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
