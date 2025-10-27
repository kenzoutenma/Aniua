import Login from '@/features/auth/components/login';
import Section from '@/shared/layout/section/section';

export default function LoginPage() {
  return (
    <>
      <Section typeOfSection={'OneColSection'}>
        <Login />
      </Section>
    </>
  );
}
