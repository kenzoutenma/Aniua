"use client"

import { Card, Slider, Table, Typography } from '@/components/UI/UIComponents';
import { paths } from '@/constants/headersconst';
import { getTranslatedText } from '@/utils';
import styles from './DescriptionSection.module.css';

function DescriptionSection({ data }: { data: AnimeDataInterface }) {
  const episodesInfo = (present: string | null, last: number | null): string => {
    return `${present ? present : '? / '} ${last ? last : '?'}`;
  };

  return (
    <section className={styles.descSection}>
      <div className={styles.descLeftColumn}>
        <Typography variant='h2'>{getTranslatedText('info.Details')}</Typography>
        <Table>
          <Table.row
            title={getTranslatedText('info.Rate')}
            data={data?.mal_score?.toString()}
            url={`${paths.list}/?mal_score=${data?.mal_score}`}
          />
          <Table.row
            title={getTranslatedText('info.Episodes')}
            data={episodesInfo(data?.episode?.present, data?.episode?.last)}
          />
          <Table.row
            title={getTranslatedText('info.Status')}
            data={data?.status}
            url={`${paths.list}/?status=${data?.status}`}
          />
          <Table.row
            title={getTranslatedText('info.Type')}
            data={data?.type?.title}
            url={`${paths.list}/?type=${data?.type?.slug}`}
          />
          <Table.row
            title={getTranslatedText('info.Year')}
            data={data?.year?.toString()}
            url={`${paths.list}/?year=${data?.year}`}
          />
          <Table.row title={getTranslatedText('info.Genres')} data={data.genres} />
        </Table>
      </div>
      <div className={styles.descRightColumn}>
        <div>
          <h2>{getTranslatedText('info.Description')}</h2>
          <p>{data.description}</p>
        </div>
        {data.characters?.length > 1 ? (
          <div>
            <h2>{getTranslatedText('info.Characters')}</h2>
            <Slider>
              {data.characters.map((el: Characters, index: number) => (
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
    </section>
  );
}

export default DescriptionSection;
