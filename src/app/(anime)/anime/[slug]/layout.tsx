import Loading from './loading';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}><div className='flex flex-col gap-6 md:gap-24 px-2 md:px-3 lg:px-16 py-6'>{children}</div></Suspense>
    </>
  );
}
