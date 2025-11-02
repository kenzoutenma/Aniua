'use client';

import Image from 'next/image';
import AddToCollectionButton from '../addToCollectionButton';
import Player from '../player/player';
import styles from './player-section.module.css';
import Section from '@/shared/layout/section/section';

function PlayerSection({ data }: { data: AnimeDataInterface }) {
  return (
    <Section typeOfSection="TwoColSection" style={{ gridTemplateColumns: '3fr 7fr' }}>
      <div className={styles.playerSectionColumn}>
        <Image src={data.poster} alt={data.title} height={350} width={250} style={{}} />
        <AddToCollectionButton slug={data.slug} />
      </div>
      <div className={styles.playerSectionColumn}>
        <Player slug={data.slug} />
      </div>
    </Section>
  );
}

export default PlayerSection;
