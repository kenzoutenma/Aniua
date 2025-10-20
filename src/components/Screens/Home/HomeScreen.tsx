import { Card, Section, Slider } from '@/components/UI/UIComponents';
import { getTranslatedText } from '@/utils';
import LastWatchedSection from './LastWatchedRow/LastWatched';

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
    <Section.Row>
      <Section.Col title={getTranslatedText(name)} widthState="1">
        <Slider>
          {group.map((el, index) => (
            <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
          ))}
        </Slider>
      </Section.Col>
    </Section.Row>
  );
};

export default HomeScreen;
