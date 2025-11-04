'use client';

import Registration from '@/features/auth/components/registration';
import Modal from '@/shared/layout/modal/modal';

export default function RegistrationModal() {
  return (
    <>
      <Modal>
        <Registration />
      </Modal>
    </>
  );
}
