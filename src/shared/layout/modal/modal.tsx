'use client';

import { sleep } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import styles from './modal.module.css';
import Section from '../section/section';

function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = async () => {
    if (modalRef.current) {
      modalRef.current.style.opacity = '0';
    }
    await sleep(200);
    router.back();
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.opacity = '1';
    }
  }, [modalRef]);

  return (
    <div
      ref={modalRef}
      className={styles.modal_wrap}
      data-dialog-backdrop="modal"
      data-dialog-backdrop-close="true"
      style={{ opacity: 0 }}
    >
      <Button variant="outline" className={styles.close_button} onClick={closeModal}>
        <span>Close</span>
        <kbd>ESC</kbd>
      </Button>
      <Section
        typeOfSection={'OneColSection'}
        data-dialog="modal"
      >
        {children}
      </Section>
    </div>
  );
}

export default Modal;
