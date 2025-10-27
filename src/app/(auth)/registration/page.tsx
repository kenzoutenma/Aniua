import Registration from '@/features/auth/components/registration';
import Section from '@/shared/layout/section/section';

export default function RegistrationPage() {
  return (
    <>
      <Section typeOfSection={'OneColSection'}>
        <Registration />
      </Section>
    </>
  );
}
