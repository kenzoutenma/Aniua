'use client';

import { Card, Section, Slider, Table, Typography } from '@/components/UI/UIComponents';
import { paths } from '@/constants/headersconst';
import { getTranslatedText } from '@/utils';
import styles from './DescriptionSection.module.css';

function DescriptionSection({
  data,
}: {
  data: AnimeDataInterface & { characters: AnimeCharacters[] };
}) {
  // const episodesInfo = (present: number | null, last: number | null): string => {
  //   return `${present ? present : '? / '} ${last ? last : '?'}`;
  // };

  type TodoPreview = Pick<
    AnimeDataInterface,
    'duration' | 'score' | 'scored_by' | 'likes' | 'dislikes' | 'title' | 'title_jp'
  >;

  const todo: TodoPreview = {
    title: data.title,
    title_jp: data.title_jp,
    duration: data.duration,
    score: data.score,
    scored_by: data.scored_by,
    likes: data.likes,
    dislikes: data.dislikes,
  };

  return (
    <Section typeOfSection="TwoColSection" style={{ gridTemplateColumns: '7fr 3fr' }}>
      <div className={styles.descRightColumn}>
        <div>
          <h2>{getTranslatedText('info.Description')}</h2>
          <p>{data?.description && data.description}</p>
        </div>
        {data.characters && data.characters.length > 1 ? (
          <div>
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
          </div>
        ) : null}
      </div>
      <div className={styles.descLeftColumn}>
        <Typography variant="h2">{getTranslatedText('info.Details')}</Typography>
        <Table>
          {Object.entries(todo).map(([key, value]) => {
            return (
              <Table.row
                key={key}
                title={getTranslatedText(`info.${key}`)}
                data={value}
                url={`${paths.list}/?${key}=${data?.mal_score}`}
              />
            );
          })}
        </Table>
      </div>
    </Section>
  );
}

export default DescriptionSection;
