'use client';

import FetchServiceInstance from '@/app/api';
import { Card, Section, Slider } from '@/components/UI/UIComponents';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { usePlayerStore } from '@/stores/playerHistory';
import { getTranslatedText } from '@/utils';
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
      const res = await FetchServiceInstance.fetchHelper(animeAPIConstant['filter'], {
        to: 'self',
        params: {
          slug: `${slugs.slice(-10).reverse().join(',')},`,
        },
        cache: 'no-store',
      });

      const data = res.titles;

      const mergedData = data.map((anime: AnimeDataInterface) => {
        const slug = anime.slug;
        const userSession = session[slug];

        return {
          ...anime,
          last_users_episode: userSession ? userSession.episodeNumber : null,
        };
      });

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
              title={el.title}
              slug={el.slug}
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
