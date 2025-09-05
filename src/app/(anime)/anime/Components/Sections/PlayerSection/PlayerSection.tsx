"use client"

import Image from 'next/image';
import Player from '../../Player/player';
import AddToCollectionButton from '../../addToCollectionButton';
import styles from './PlayerSection.module.css';

function PlayerSection({ data }: { data: AnimeDataInterface }) {
  return (
    <section className={styles.playerSection}>
      <div className={styles.playerSectionColumn}>
        <Image
          src={data.poster}
          alt={data.title}
          height={350}
          width={250}
          style={{ width: '100%', borderRadius: 'var(--borderRad)' }}
        />
        <AddToCollectionButton slug={data.slug} />
      </div>
      <div className={styles.playerSectionColumn}>
        <Player slug={data.slug} />
      </div>
    </section>
  );
}

export default PlayerSection;
