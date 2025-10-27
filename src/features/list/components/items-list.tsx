'use client';

import Card from '@/features/anime/components/anime-card/anime-card';
import CardStyles from '@/features/anime/components/anime-card/anime-card.module.css';
import Section from '@/shared/layout/section/section';
import { Button, Popover, Tooltip } from '@/shared/ui';

interface AnimeListProps {
  anime: AnimeDataInterface[] | null;
}

function AnimeList({ anime }: AnimeListProps) {
  return (
    <>
      {anime == null ? null : (
        <Section typeOfSection={'grid'}>
          {anime.map((el: AnimeDataInterface) => (
            <Tooltip
              className={CardStyles.cardcontainer}
              role="tooltip"
              id={`anime_${el.slug}_tooltip`}
              key={el.slug}
              tooltipContent={<PopoverFilled animeData={el} />}
            >
              {' '}
              <Card
                aria-describedby={`anime_${el.slug}_tooltip`}
                key={el.slug}
                image={el.poster}
                title={el.title}
                slug={el.slug}
                additional={{ rate: el.mal_score.toString() }}
              />
            </Tooltip>
          ))}
        </Section>
      )}
    </>
  );
}

const PopoverFilled = ({ animeData }: { animeData: AnimeDataInterface }) => {
  return (
    <Popover>
      <Popover.Row variant="title">
        <h4>{animeData.title}</h4>
        <Button variant="secondary">{animeData.mal_score} ⭐️</Button>
      </Popover.Row>
      <Popover.Row variant="row">
        <span>{animeData.year}</span>
        <span>•</span>
        {animeData.genres && Object.entries(animeData.genres).length > 0 ? (
          animeData.genres.map((el, _) => (
            <Button key={`genres_${el.id}_${_}`} variant="secondary">
              {el.title || el.slug}
            </Button>
          ))
        ) : (
          <p>unknown genres (?)</p>
        )}
      </Popover.Row>
      <p>{animeData?.description && animeData.description.slice(0, 75)}...</p>
    </Popover>
  );
};

export default AnimeList;
