'use client';

import Card from '@/features/anime/components/anime-card/anime-card';
import CardSkeletonBlock from '@/features/anime/components/anime-card/anime-card-skeleton';
import CardStyles from '@/features/anime/components/anime-card/anime-card.module.css';
import AnimePopover from '@/features/anime/components/popover/card-popover';
import Section from '@/shared/layout/section/section';
import { Tooltip } from '@/shared/ui';

interface AnimeListProps {
  anime: AnimeDataInterface[] | null;
}

function AnimeList({ anime }: AnimeListProps) {
  return (
    <Section typeOfSection={'grid'}>
      {anime == null ? (
        <CardSkeletonBlock countOfCards={15} />
      ) : (
        anime.map((el: AnimeDataInterface) => (
          <Tooltip
            className={CardStyles.card}
            role="tooltip"
            id={`anime_${el.slug}_tooltip`}
            key={el.slug}
            tooltipContent={<AnimePopover animeData={el} />}
          >
            <Card
              aria-describedby={`anime_${el.slug}_tooltip`}
              key={el.slug}
              image={el.poster}
              title={el.title}
              slug={el.slug}
              additional={{ rate: el.mal_score.toString() }}
            />
          </Tooltip>
        ))
      )}
    </Section>
  );
}

export default AnimeList;
