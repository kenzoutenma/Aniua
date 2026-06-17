'use client';

import Card from '@/features/anime/components/anime-card/anime-card';
import { getList } from '@/features/list/service/get-list';
import Section from '@/shared/layout/section/section';
import { getTranslatedText } from '@/shared/lib';
import { usePlayerStore } from '@/shared/state/player-history';
import { Slider } from '@/shared/ui';
import { useEffect, useState } from 'react';

interface AnimeWithSession extends AnimeDataInterface {
  last_users_episode: number;
}

export default function LastWatchedSection() {
  const session = usePlayerStore((state) => state.session);
  const [animeList, setAnimeList] = useState<AnimeWithSession[]>([]);

  useEffect(() => {
    const slugs = Object.keys(session);
    if (slugs.length === 0) return;

    const fetchAnime = async () => {
      const res = await getList({
        params: {
          slug: `${slugs.slice(-10).reverse().join(',')},`,
        },
        cache: 'no-store',
      });
      if (!res.ok) return null;
      console.log(res);
      const data = res.titles;

      const mergedData = data.map((anime: AnimeDataInterface) => {
        const slug = anime.slug;
        const userSession = session[slug];

        return {
          ...anime,
          last_users_episode: userSession ? userSession.episodeNumber : null,
        };
      }) as AnimeWithSession[];

      setAnimeList(mergedData);
      if (res.ok) {
      } else {
        console.warn('fetch failed');
      }
    };

    console.log(session, slugs);
    fetchAnime();
  }, [session]);

  if (animeList.length === 0) return null;

  return (
    <Section.Row>
      <Section.Col title={getTranslatedText('home.Last watched')} widthState="1">
        <Slider>
          {animeList.map((el, idx) => (
            <Card
              key={idx}
              image={el.poster}
              title={el.title_ua}
              href={'/anime/' + el.slug}
              additional={{
                history: { episode: `${el.last_users_episode} | ${el.episode.present}` },
              }}
              variant="horizontal"
            />
          ))}
        </Slider>
      </Section.Col>
    </Section.Row>
  );
}
