'use client';

import { getTranslatedText } from '@/shared/lib';
import { Slider, Table } from '@/shared/ui';
import Image from 'next/image';
import renderValue from '../../utils/plain-data-details';
import Card from '../anime-card/anime-card';
import styles from './description-section.module.css';

function DescriptionSection({
  data,
}: {
  data: AnimeDataInterface & { characters: AnimeCharacters[] };
}) {
  const plain: Partial<AnimeDataInterface> = {
    title_ua: data.title_ua,
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
    <article className={styles.anime_desc_container}>
      <div className={styles.anime_desc_left}>
        <Image
          src={data.poster}
          alt={data.slug}
          width={144}
          height={144}
          loading="eager"
          quality={50}
        />
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

      <div className={styles.anime_desc_right}>
        <h2>{data.title_ua}</h2>
        <p className={styles.anime_desc_summary}>
          <strong>{getTranslatedText('info.Description')}: </strong>
          {data.description_main}
        </p>
        {data.characters && data.characters.length > 1 ? (
          <>
            <h2>{getTranslatedText('info.Characters')}</h2>
            <Slider>
              {data.characters.map((el: AnimeCharacters, index: number) => (
                <Card key={index} image={el.poster} title={el.title_ua} />
              ))}
            </Slider>
          </>
        ) : null}
      </div>
    </article>
  );
}

export default DescriptionSection;
