import { Suspense } from 'react';
import Filters from '../../../features/list/components/filters/filters';
import Loading from './loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.25rem',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div>
          <Filters />
        </div>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </section>
    </>
  );
}
