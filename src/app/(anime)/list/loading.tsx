import CardSkeleton from '@/features/anime/components/anime-card/anime-card-skeleton';
import Section from '@/shared/layout/section/section';

export default function Loading() {
  return (
    <Section typeOfSection={'grid'}>
      <CardSkeleton countOfCards={10} />
    </Section>
  );
}
