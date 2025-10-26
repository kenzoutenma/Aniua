import { paths } from '@/constants/headersconst';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../UI/Button/Button';
import { CreepingText } from '../UI/UIComponents';
import styles from './hero.module.css';

function HeroBanner({ data }: { data: AnimeDataInterface }) {
  const Filler = () =>
    data.trailer ? (
      <Trailer src={data.trailer} />
    ) : (
      <Poster src={data.poster || data.background_image_url || 'pfp.png'} />
    );

  const description = data?.description && data.description.split(' ').slice(0, 40).join(' ');
  const genres =
    data.genres && data.genres.length > 0
      ? data.genres.map((e) => <GenreButton key={e.slug} e={e} />)
      : '';
  const titles = {
    bg: data.title_jp || data.title,
    jp: data.title_jp || null,
    ua: data.title || '',
  };
  const year = data.year || null;

  return (
    <div className={styles.heroWrap}>
      <CreepingText text={titles.bg} speed={20} />
      <div className={styles.heroInfo}>
        <h1>{titles.ua}</h1>
        <div>
          <span> {year}</span>
          {genres}
        </div>
        <p>{description}...</p>
      </div>
      <Filler />
    </div>
  );
}

function GenreButton({ e }: { e: AnimeGenre }) {
  return (
    <Button as="a" variant="link" target="_blank" href={paths['list'] + '?genre=' + e.id}>
      {e.title}
    </Button>
  );
}

function Trailer({ src }: { src?: string }) {
  return (
    src && (
      <>
        <div className={styles.heroTrailerContainer}>
          <iframe
            className={styles.heroTrailer}
            width="560"
            height="315"
            src={src + '?autoplay=1&mute=1&controls=0&loop=1'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; web-share"
          ></iframe>
        </div>
        <Link href={src.replace('embed/', 'watch?v=')} target="_blank">
          <Image
            src={'/yt_icon_white_digital.png'}
            className={styles.heroTrailerSource}
            alt="Youtube Logo"
            width={250}
            height={350}
          />
        </Link>
      </>
    )
  );
}

function Poster({ src }: { src: string }) {
  return (
    <Image
      src={src}
      className={clsx(styles.heroPoster)}
      alt="Anime Poster"
      width={250}
      height={350}
    />
  );
}

export default HeroBanner;
