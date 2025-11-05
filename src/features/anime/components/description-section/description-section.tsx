'use client';

import Section from '@/shared/layout/section/section';
import { getTranslatedText } from '@/shared/lib';
import { Slider, Table, Typography } from '@/shared/ui';
import Card from '../anime-card/anime-card';
import renderValue from '../../utils/plain-data-details';

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
    <Section typeOfSection="TwoColSection" style={{ gridTemplateColumns: '70% 30%' }}>
      <Section.Col>
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
      </Section.Col>

      <Section.Col>
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
      </Section.Col>
    </Section>
  );
}

export default DescriptionSection;
