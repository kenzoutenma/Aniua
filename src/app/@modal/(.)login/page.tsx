'use client';

import Login from '@/features/auth/components/login';
import Modal from '@/shared/layout/modal';

export default function LoginModal() {
  return (
    <>
      <Modal>
        <Login />
      </Modal>
    </>
  );
}
