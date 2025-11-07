'use client';

import { getTranslatedText } from '@/shared/lib';
import { Slider, Table, Typography } from '@/shared/ui';
import Image from 'next/image';
import renderValue from '../../utils/plain-data-details';
import AddToCollectionButton from '../addToCollectionButton';
import Card from '../anime-card/anime-card';
import styles from './description-section.module.css';

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
    <section className={styles.anime_description_section}>
      <div>
        <Image src={data.poster} alt={data.title} height={350} width={250} style={{}} />
        <AddToCollectionButton slug={data.slug} />
      </div>
      <div>
        <h2>{getTranslatedText('info.Description')}</h2>
        <p>{data?.description && data.description}</p>
        {data.characters && data.characters.length > 1 ? (
          <>
            <h2>{getTranslatedText('info.Characters')}</h2>
            <Slider>
              {data.characters.map((el: AnimeCharacters, index: number) => (
                <Card
                  key={index}
                  image={el.poster}
                  title={el.name_surname_ua}
                  slug={el.id.toString()}
                />
              ))}
            </Slider>
          </>
        ) : null}
      </div>

      <div>
        <Typography variant="h2">{getTranslatedText('info.Details')}</Typography>
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
    </section>
  );
}

export default DescriptionSection;
