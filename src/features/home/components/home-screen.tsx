import Card from '@/features/anime/components/anime-card/anime-card';
import { getTranslatedText } from '@/shared/lib';
import { Slider } from '@/shared/ui';
import LastWatchedSection from './last-watched';

function HomeScreen({ groups }: { groups: { name: string; data: AnimeDataInterface[] }[] }) {
  const slides = groups.map((group) => Slides(group.name, group.data));

  return (
    <>
      <section>
        <LastWatchedSection />
        {slides}
      </section>
    </>
  );
}

const Slides = (name: string, group: AnimeDataInterface[]) => {
  return (
    <div key={'anime-slide-' + name}>
      <h2>{getTranslatedText(name)}</h2>
      <Slider>
        {group.map((el, index) => (
          <Card key={index} image={el.poster} title={el.title_ua} href={`anime/${el.slug}`}></Card>
        ))}
      </Slider>
    </div>
  );
};

export default HomeScreen;
