import Card from '@/features/anime/components/anime-card/anime-card';
import Section from '@/shared/layout/section/section';
import { getTranslatedText } from '@/shared/lib';
import { Slider } from '@/shared/ui';
import LastWatchedSection from './last-watched';

function HomeScreen({ groups }: { groups: { name: string; data: AnimeDataInterface[] }[] }) {
  const slides = groups.map((group) => Slides(group.name, group.data));

  return (
    <>
      <Section>
        <LastWatchedSection />
        {slides}
      </Section>
    </>
  );
}

const Slides = (name: string, group: AnimeDataInterface[]) => {
  return (
    <Section.Row key={'anime-slide-' + name}>
      <Section.Col title={getTranslatedText(name)} widthState="1">
        <Slider>
          {group.map((el, index) => (
            <Card
              key={index}
              image={el.poster}
              title={el.title_ua}
              href={`anime/${el.slug}`}
            ></Card>
          ))}
        </Slider>
      </Section.Col>
    </Section.Row>
  );
};

export default HomeScreen;
