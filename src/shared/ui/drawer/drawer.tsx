'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './drawer.module.scss';

interface Props {
  title?: string;
  placement?: 'right' | 'left';
  trigger?: (props: { open: () => void }) => React.ReactNode;
  headerExtra?: React.ReactNode;
  footer?: (props: { close: () => void }) => React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface DrawerRef {
  open: () => void;
  close: () => void;
}

const Drawer = forwardRef<DrawerRef, Props>(
  (
    { title = '', placement = 'right', trigger, headerExtra, footer, onOpen, onClose, children },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    useImperativeHandle(ref, () => ({
      open: openDrawer,
      close: closeDrawer,
    }));

    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => {
          headingRef.current?.focus();
        }, 0);

        onOpen?.();
        return () => clearTimeout(timer);
      } else {
        onClose?.();
      }
    }, [isOpen, onOpen, onClose]);

    return (
      <>
        {trigger && (
          <div className={styles['drawer-trigger-wrapper']} style={{ display: 'inline-block' }}>
            {trigger({ open: openDrawer })}
          </div>
        )}

        <div className={styles['drawer-root']}>
          <div
            className={`${styles['drawer-backdrop']} ${isOpen ? styles['is-open'] : ''}`}
            onClick={closeDrawer}
          />

          <aside
            className={`${styles['drawer-panel']} ${styles[placement]} ${isOpen ? styles['is-open'] : ''}`}
            role="dialog"
            aria-label={title || 'Бічна панель'}
            aria-hidden={!isOpen}
          >
            <div className={styles['drawer-header']}>
              {title && (
                <h2 ref={headingRef} tabIndex={-1}>
                  {title}
                </h2>
              )}
              {headerExtra}

              <button
                className={styles['close-btn']}
                aria-label="Закрити панель"
                onClick={closeDrawer}
              >
                &times;
              </button>
            </div>

            <div className={styles['drawer-content']}>{children}</div>

            {footer && (
              <div className={styles['drawer-footer']}>{footer({ close: closeDrawer })}</div>
            )}
          </aside>
        </div>
      </>
    );
  },
);

Drawer.displayName = 'Drawer';

export default Drawer;
