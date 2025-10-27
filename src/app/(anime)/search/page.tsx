'use client';

import Search from '@/features/search/components/search';
import Section from '@/shared/layout/section/section';

export default function LoginModal() {
  return (
    <Section typeOfSection={'OneColSection'}>
      <Search />
    </Section>
  );
}
