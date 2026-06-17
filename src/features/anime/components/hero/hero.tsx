import { Button } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './hero.module.scss';
import CreepingText from './LineTextAnimation/creeping-text';

export interface BannerProps {
  title?: string;
  year?: string | number;
  description?: string;
  genres?: AnimeGenre[] | null;
  trailer?: string;
  poster?: string;
  cover?: string | null;
  anime?: AnimeDataInterface;
}

export const Banner: React.FC<BannerProps> = ({
  title = '',
  year,
  description = '',
  genres,
  trailer,
  poster,
  cover,
  anime,
}) => {
  return (
    <div className={styles['hero-banner-wrap']}>
      <div className={styles['hero-text-info']}>
        <h1>{title}</h1>

        <div className={styles['hero-banner-data']}>
          {anime?.year && (
            <div>
              <span>Рік</span>
              <span> {year}</span>
            </div>
          )}

          {anime?.episode?.last && (
            <div>
              <span>Епізодів</span>
              <span> {anime.episode.last} </span>
            </div>
          )}

          {anime?.status && (
            <div>
              <span>Статус</span>
              <span> {anime.status}</span>
            </div>
          )}

          {anime?.status && genres && genres.length > 0 && (
            <div>
              <span>Жанри</span>
              <span>
                {genres.map((genre) => (
                  <Button as={Link} href={`/explore?genre=${genre.id}`} key={genre.id}>
                    {genre.title}
                  </Button>
                ))}
              </span>
            </div>
          )}
        </div>

        <p className={styles['hero-text-description']}>{description}</p>
      </div>

      {poster && (
        <Image
          src={poster}
          className={styles['hero-poster']}
          alt={title}
          width={250}
          height={350}
        />
      )}

      {trailer ? (
        <div className={styles['hero-background']}>
          <CreepingText text={title} />
          <iframe
            className={styles['heroTrailer']}
            width="560"
            height="315"
            src={`${trailer}?autoplay=1&mute=1&controls=0&loop=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; web-share"
            title={`${title} Trailer`}
          />
          <a href={trailer.replace('embed/', 'watch?v=')} target="_blank" rel="noopener noreferrer">
            Youtube
          </a>
        </div>
      ) : cover ? (
        <div className={styles['hero-background']}>
          <img
            src={cover}
            className={styles['hero-background']}
            alt={title}
            width={250}
            height={350}
          />
          <CreepingText text={anime?.title_jp || title} color="rgba(255, 255, 255, .1)" />
        </div>
      ) : null}
    </div>
  );
};

export default Banner;
