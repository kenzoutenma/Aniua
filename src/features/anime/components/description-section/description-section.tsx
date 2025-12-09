'use client';

import { getTranslatedText } from '@/shared/lib';
import { Slider, Table } from '@/shared/ui';
import Image from 'next/image';
import renderValue from '../../utils/plain-data-details';
import AddToCollectionButton from '../addToCollectionButton';
import Card from '../anime-card/anime-card';
import styles from './description-section.module.css';
import Synopsis from './synopsis/synopsis';
import clsx from 'clsx';

function DescriptionSection({
  data,
}: {
  data: AnimeDataInterface & { characters: AnimeCharacters[] };
}) {
  const plain: Partial<AnimeDataInterface> = {
    title: data.title,
    title_jp: data.title_jp,
    duration: data.duration,
    airing: data.airing,
    score: data.score,
    scored_by: data.scored_by,
    likes: data.likes,
    dislikes: data.dislikes,
  };

  const linked: Partial<AnimeDataInterface> = {
    type: data.type,
    year: data.year,
    status: data.status,
    season: data.season,

    rating: data.rating,

    genres: data.genres,
  };

  return (
    <article className={clsx(styles.anime_description_section, 'four_col_section')}>
      <div className={styles.anime_details}>
        <Image src={data.poster} alt={data.title} height={350} width={250} style={{}} />
        <AddToCollectionButton slug={data.slug} />
        <Table>
          {Object.entries(plain).map(([key, value]) => {
            if (!value) return;
            return (
              <Table.row key={key}>
                <Table.col>
                  <p>{key}</p>
                </Table.col>
                <Table.col>{renderValue(value)}</Table.col>
              </Table.row>
            );
          })}
          {Object.entries(linked).map(([key, value]) => {
            if (!value) return;
            return (
              <Table.row key={key}>
                <Table.col>
                  <p>{key}</p>
                </Table.col>
                <Table.col>{renderValue(value, key)}</Table.col>
              </Table.row>
            );
          })}
        </Table>
      </div>
      <div className={styles.anime_about}>
        <span className={styles.description_title}>
          <h2>{data.title}</h2>
          <h2 style={{ color: 'var(--text-muted)' }}>{data.score}✨</h2>
        </span>
        <Synopsis description={data.description} />
        {data.characters && data.characters.length > 1 ? (
          <section>
            <h2>{getTranslatedText('info.Characters')}</h2>
            <Slider>
              {data.characters.map(
                (el: AnimeCharacters, index: number) =>
                  el?.character?.poster && (
                    <Card key={index} image={el.character.poster} title={el.character.name} />
                  ),
              )}
            </Slider>
          </section>
        ) : null}
      </div>
    </article>
  );
}

export default DescriptionSection;
