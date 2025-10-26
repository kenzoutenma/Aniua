'use client';

import { Section } from '@/components/UI/UIComponents';
import Image from 'next/image';
import Player from '../../Player/player';
import AddToCollectionButton from '../../addToCollectionButton';
import styles from './PlayerSection.module.css';

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
