import { Section } from '@/components/UI/UIComponents';
import { Suspense } from 'react';
import Filters from './Components/Filters';
import Loading from './loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Section
        typeOfSection="TwoColSection"
        classname="justify-evenly"
        style={{ gridTemplateColumns: '10fr 3fr', padding: '2rem 6rem' }}
      >
        <Section.Col>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Section.Col>
        <Section.Col>
          <Filters />
        </Section.Col>
      </Section>
    </>
  );
}
